"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DashboardHeader() {
  const { session, logout, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse">Loading...</div>
      </Card>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Card className="p-4 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">
          Welcome, {session?.user?.username || session?.user?.email}!
        </h2>
        <p className="text-sm text-muted-foreground">
          User ID: {session?.user?.id}
        </p>
      </div>
      <Button
        onClick={logout}
        variant="outline"
        className="text-destructive hover:text-destructive"
      >
        Logout
      </Button>
    </Card>
  );
}
