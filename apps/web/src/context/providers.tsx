import React from "react";
import QueryProvider from "./query";
import { ThemeProvider } from "./theme";
import { AuthProvider } from "@/app/providers";
import { SessionMonitor } from "@/components/session-monitor";

const Providers = (
  { children }: { children: React.ReactNode } = { children: null }
) => {
  return (
    <AuthProvider>
      <QueryProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionMonitor>
            {children}
          </SessionMonitor>
        </ThemeProvider>
      </QueryProvider>
    </AuthProvider>
  );
};

export default Providers;
