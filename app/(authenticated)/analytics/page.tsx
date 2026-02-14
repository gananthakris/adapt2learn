import { LearnerAnalytics } from "@/components/analytics/learner-analytics";
import { getSeedAnalyticsState } from "@/lib/seed-data";

export default function AnalyticsPage() {
  return <LearnerAnalytics state={getSeedAnalyticsState()} />;
}
