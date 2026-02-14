import { InstructorAnalytics } from "@/components/analytics/instructor-analytics";
import { getSeedInstructorState } from "@/lib/seed-data";

export default function ClassAnalyticsPage() {
  return <InstructorAnalytics state={getSeedInstructorState()} />;
}
