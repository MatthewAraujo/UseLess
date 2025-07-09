import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Play, Pause, Trash2, MoreVertical, Edit, Eye, EyeOff } from "lucide-react";
import { AppData } from "../../types/app";

interface AppCardProps {
  app: AppData;
  onToggleBlock: (appId: string) => void;
  onUpdateHours: (appId: string, hours: number) => void;
  onRemove: (appId: string) => void;
}

export const AppCard = ({ app, onToggleBlock, onUpdateHours, onRemove }: AppCardProps) => {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{app.icon}</span>
            <div>
              <CardTitle className="text-lg">{app.name}</CardTitle>
              <CardDescription>{app.category}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleBlock(app.id)}>
                {app.isBlocked ? (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Unblock
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Block
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onRemove(app.id)}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Usage</span>
            <span>{app.usageHours.toFixed(1)}h / {app.maxHours}h</span>
          </div>
          <Progress
            value={(app.usageHours / app.maxHours) * 100}
            className="h-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              checked={app.isBlocked}
              onCheckedChange={() => onToggleBlock(app.id)}
            />
            <span className="text-sm">Blocked</span>
          </div>
          <Badge variant={app.isBlocked ? "destructive" : "secondary"}>
            {app.isBlocked ? "Blocked" : "Active"}
          </Badge>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Daily Limit</label>
          <Slider
            value={[app.maxHours]}
            onValueChange={(value) => onUpdateHours(app.id, value[0])}
            max={12}
            min={0.5}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0.5h</span>
            <span>12h</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Play className="w-4 h-4 mr-2" />
            Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 