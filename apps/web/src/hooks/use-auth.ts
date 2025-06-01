"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import type { Session } from "next-auth";

interface UseAuthReturn {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      console.log("[useAuth] Logging out...");

      await signOut({
        redirect: false,
      });

      console.log("[useAuth] Logout successful, redirecting to login...");
      router.push("/login");
    } catch (error: unknown) {
      console.error("[useAuth] Logout error:", error);
      // Force redirect even if logout fails
      router.push("/login");
    }
  }, [router]);

  return {
    session,
    status,
    logout,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
}
