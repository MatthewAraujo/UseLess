import { AppCard } from "../apps/AppCard";
import { EmptyState } from "../apps/EmptyState";
import { AppData } from "../../types/app";

interface AppsPageProps {
  apps: AppData[];
  searchQuery: string;
  onToggleBlock: (appId: string) => void;
  onUpdateHours: (appId: string, hours: number) => void;
  onRemove: (appId: string) => void;
  onAddApp: () => void;
}

export const AppsPage = ({
  apps,
  searchQuery,
  onToggleBlock,
  onUpdateHours,
  onRemove,
  onAddApp
}: AppsPageProps) => {
  if (apps.length === 0) {
    return <EmptyState searchQuery={searchQuery} onAddApp={onAddApp} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            onToggleBlock={onToggleBlock}
            onUpdateHours={onUpdateHours}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}; 