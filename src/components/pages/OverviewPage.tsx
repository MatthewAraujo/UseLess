import { StatsCards } from "../overview/StatsCards";
import { UsageOverview } from "../overview/UsageOverview";
import { AppData } from "../../types/app";

interface OverviewPageProps {
  apps: AppData[];
  stats: {
    totalUsage: number;
    totalLimit: number;
    blockedApps: number;
    totalApps: number;
  };
}

export const OverviewPage = ({ apps, stats }: OverviewPageProps) => {
  return (
    <div className="space-y-6">
      <StatsCards {...stats} />
      <UsageOverview apps={apps} />
    </div>
  );
}; 