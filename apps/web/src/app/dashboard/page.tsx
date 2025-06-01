import { DashboardHeader } from "@/components/dashboard-header";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <DashboardHeader />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Welcome to Dashboard</h3>
          <p className="text-muted-foreground">
            This is a protected page that requires authentication.
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Auto Token Refresh</h3>
          <p className="text-muted-foreground">
            Your session will automatically refresh tokens when needed.
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Infinite Session</h3>
          <p className="text-muted-foreground">
            Your session will stay active as long as you&apos;re using the app.
          </p>
        </div>
      </div>
    </div>
  );
}
