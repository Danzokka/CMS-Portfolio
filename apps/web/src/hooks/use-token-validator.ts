"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { api } from "@/lib/axios";

interface TokenStatus {
  isValid: boolean;
  needsRefresh: boolean;
  error?: string;
}

export function useTokenValidator() {
  const { data: session, status, update } = useSession();

  const validateAndRefreshToken = useCallback(async (): Promise<TokenStatus> => {
    if (!session?.accessToken) {
      return { isValid: false, needsRefresh: false, error: "No token available" };
    }

    try {
      // Check if token is valid by calling profile endpoint
      await api.get("/auth/profile");
      
      return { isValid: true, needsRefresh: false };
    } catch {
      console.log("[TokenValidator] Token validation failed, attempting refresh...");
      
      try {
        // Try to refresh the token
        const refreshResponse = await api.post("/auth/refresh");
        
        if (refreshResponse.data.accessToken) {
          // Update the session with new token
          await update({
            ...session,
            accessToken: refreshResponse.data.accessToken,
          });
          
          console.log("[TokenValidator] Token refreshed successfully");
          return { isValid: true, needsRefresh: true };
        }
      } catch (refreshError) {
        console.error("[TokenValidator] Token refresh failed:", refreshError);
        return { 
          isValid: false, 
          needsRefresh: false, 
          error: "Token refresh failed" 
        };
      }
    }

    return { isValid: false, needsRefresh: false, error: "Unknown error" };
  }, [session, update]);

  // Auto-validate token every 10 minutes for authenticated users
  useEffect(() => {
    if (status === "authenticated" && session?.accessToken) {
      const interval = setInterval(() => {
        validateAndRefreshToken().catch(console.error);
      }, 10 * 60 * 1000); // 10 minutes

      return () => clearInterval(interval);
    }
  }, [status, session?.accessToken, validateAndRefreshToken]);

  return {
    validateAndRefreshToken,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
}
