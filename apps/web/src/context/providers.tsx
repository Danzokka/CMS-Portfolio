import React from "react";
import QueryProvider from "./query";
import { ThemeProvider } from "./theme";

const Providers = (
  { children }: { children: React.ReactNode } = { children: null }
) => {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
};

export default Providers;
