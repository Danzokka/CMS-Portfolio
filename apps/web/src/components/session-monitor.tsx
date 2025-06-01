"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useTokenValidator } from "@/hooks/use-token-validator";

interface SessionMonitorProps {
  children: React.ReactNode;
}

export function SessionMonitor({ children }: SessionMonitorProps) {
  const { data: session, status } = useSession();
  const { validateAndRefreshToken } = useTokenValidator();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken && !isInitialized) {
      console.log("[SessionMonitor] Session initialized, validating token...");
      
      validateAndRefreshToken()
        .then((result) => {
          if (result.isValid) {
            console.log("[SessionMonitor] Token validation successful");
          } else {
            console.warn("[SessionMonitor] Token validation failed:", result.error);
          }
        })
        .catch(console.error)
        .finally(() => setIsInitialized(true));
    } else if (status !== "loading") {
      setIsInitialized(true);
    }
  }, [session, status, validateAndRefreshToken, isInitialized]);

  // Show loading while initializing session
  if (!isInitialized && status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
