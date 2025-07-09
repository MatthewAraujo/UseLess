import { Button } from "@/components/ui/button";
import { Monitor, Clock, Shield, Settings, BarChart3 } from "lucide-react";
import { ActiveTab } from "../../types/app";

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const navItems = [
    { id: 'overview' as ActiveTab, label: 'Overview', icon: BarChart3 },
    { id: 'apps' as ActiveTab, label: 'Applications', icon: Monitor },
    { id: 'time' as ActiveTab, label: 'Time Limits', icon: Clock },
    { id: 'blocking' as ActiveTab, label: 'Blocking', icon: Shield },
  ];

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Monitor className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold">App Manager</h1>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </Button>
      </div>
    </div>
  );
}; 