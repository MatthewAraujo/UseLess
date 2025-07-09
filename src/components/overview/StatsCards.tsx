import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Shield, Monitor } from "lucide-react";

interface StatsCardsProps {
  totalUsage: number;
  totalLimit: number;
  blockedApps: number;
  totalApps: number;
}

export const StatsCards = ({ totalUsage, totalLimit, blockedApps, totalApps }: StatsCardsProps) => {
  const stats = [
    {
      title: "Total Usage",
      value: `${totalUsage.toFixed(1)}h`,
      subtitle: `of ${totalLimit.toFixed(1)}h limit`,
      icon: Clock
    },
    {
      title: "Blocked Apps",
      value: blockedApps.toString(),
      subtitle: "applications blocked",
      icon: Shield
    },
    {
      title: "Active Apps",
      value: totalApps.toString(),
      subtitle: "applications tracked",
      icon: Monitor
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}; 