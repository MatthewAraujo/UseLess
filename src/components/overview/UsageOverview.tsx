import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AppData } from "../../types/app";

interface UsageOverviewProps {
  apps: AppData[];
}

export const UsageOverview = ({ apps }: UsageOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Usage Overview</CardTitle>
        <CardDescription>
          Track your application usage and limits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {apps.slice(0, 5).map((app) => (
          <div key={app.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{app.icon}</span>
                <div>
                  <p className="font-medium">{app.name}</p>
                  <p className="text-sm text-muted-foreground">{app.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{app.usageHours.toFixed(1)}h</p>
                <p className="text-sm text-muted-foreground">of {app.maxHours}h</p>
              </div>
            </div>
            <Progress
              value={(app.usageHours / app.maxHours) * 100}
              className="h-2"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}; 