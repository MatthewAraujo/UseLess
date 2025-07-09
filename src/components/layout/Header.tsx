import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus } from "lucide-react";
import { ActiveTab } from "../../types/app";

interface HeaderProps {
  activeTab: ActiveTab;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddApp: () => void;
}

export const Header = ({ activeTab, searchQuery, onSearchChange, onAddApp }: HeaderProps) => {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
        {activeTab === "apps" && (
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        )}
      </div>

      {activeTab === "apps" && (
        <Button onClick={onAddApp}>
          <Plus className="w-4 h-4 mr-2" />
          Add App
        </Button>
      )}
    </header>
  );
}; 