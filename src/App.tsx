import { useState } from "react";
import "./App.css";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { OverviewPage } from "./components/pages/OverviewPage";
import { AppsPage } from "./components/pages/AppsPage";
import { ComingSoonPage } from "./components/pages/ComingSoonPage";
import { AddAppDialog } from "./components/apps/AddAppDialog";
import { useApps } from "./hooks/useApps";
import { ActiveTab, NewAppData } from "./types/app";

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const {
    apps,
    toggleAppBlock,
    updateAppHours,
    removeApp,
    addNewApp,
    getStats,
    filterApps,
    refreshApps
  } = useApps();

  const stats = getStats();
  const filteredApps = filterApps(searchQuery);

  const handleAddApp = (appData: NewAppData) => {
    addNewApp(appData);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPage apps={apps} stats={stats} />;
      case "apps":
        return (
          <AppsPage
            apps={filteredApps}
            searchQuery={searchQuery}
            onToggleBlock={toggleAppBlock}
            onUpdateHours={updateAppHours}
            onRemove={removeApp}
            onAddApp={() => setIsAddDialogOpen(true)}
          />
        );
      case "time":
        return (
          <ComingSoonPage
            title="Time Management"
            description="Set daily time limits for your applications"
          />
        );
      case "blocking":
        return (
          <ComingSoonPage
            title="Application Blocking"
            description="Control which applications are blocked and when"
          />
        );
      default:
        return <OverviewPage apps={apps} stats={stats} />;
    }
  };

  return (
    <div className="h-screen bg-background flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col">
        <Header
          activeTab={activeTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddApp={() => setIsAddDialogOpen(true)}
          onRefresh={refreshApps}
        />

        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>

      <AddAppDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddApp={handleAddApp}
      />
    </div>
  );
}

export default App;
