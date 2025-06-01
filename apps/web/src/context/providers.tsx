import React from "react";
import QueryProvider from "./query";
import { ThemeProvider } from "./theme";
import { AuthProvider } from "@/context/session";

const Providers = (
  { children }: { children: React.ReactNode } = { children: null }
) => {
  return (
    <AuthProvider>
      <QueryProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </QueryProvider>
    </AuthProvider>
  );
};

export default Providers;
