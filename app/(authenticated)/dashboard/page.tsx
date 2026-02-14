import { DashboardOverview } from "@/components/analytics/dashboard-overview";
import { getSeedDashboardState } from "@/lib/seed-data";

export default function DashboardPage() {
  const state = getSeedDashboardState();
  return <DashboardOverview state={state} />;
}
