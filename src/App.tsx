import { useEffect, useState } from "react";
import "./App.css";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { OverviewPage } from "./components/pages/OverviewPage";
import { AppsPage } from "./components/pages/AppsPage";
import { ComingSoonPage } from "./components/pages/ComingSoonPage";
import { AddAppDialog } from "./components/apps/AddAppDialog";
import { useApps } from "./hooks/useApps";
import { ActiveTab, NewAppData } from "./types/app";
import { invoke } from '@tauri-apps/api/core'
import path from "path";
import { pid, title } from "process";

interface AppInfo {
  Id: number;
  ProcessName: string;
  MainWindowTitle: string;
  Path?: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [appsP, setApps] = useState<AppInfo[]>([]);

  useEffect(() => {
    invoke<AppInfo[]>("get_windows_apps_visible").then(setApps);
  }, []);


  const {
    apps,
    toggleAppBlock,
    updateAppHours,
    removeApp,
    addNewApp,
    getStats,
    filterApps
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
      <ul className="px-12">
        {appsP.map(({ Id, MainWindowTitle, ProcessName, Path }) => (
          <li key={Id}>
            <ul>MainWindowTitle: {MainWindowTitle} </ul>
            <ul>Processname: {ProcessName} </ul>
            <small>{Path || "Caminho não disponível"}</small>
          </li>
        ))}
      </ul>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />


      <div className="flex-1 flex flex-col">
        <Header
          activeTab={activeTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddApp={() => setIsAddDialogOpen(true)}
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
