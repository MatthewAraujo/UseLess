import { useState } from 'react';
import { AppData, NewAppData } from '../types/app';
import { initialApps } from '../data/mockData';

export const useApps = () => {
  const [apps, setApps] = useState<AppData[]>(initialApps);

  const toggleAppBlock = (appId: string) => {
    setApps(apps.map(app =>
      app.id === appId ? { ...app, isBlocked: !app.isBlocked } : app
    ));
  };

  const updateAppHours = (appId: string, hours: number) => {
    setApps(apps.map(app =>
      app.id === appId ? { ...app, maxHours: hours } : app
    ));
  };

  const removeApp = (appId: string) => {
    setApps(apps.filter(app => app.id !== appId));
  };

  const addNewApp = (newAppData: NewAppData) => {
    const app: AppData = {
      id: Date.now().toString(),
      name: newAppData.name,
      icon: newAppData.icon,
      usageHours: 0,
      maxHours: newAppData.maxHours,
      isBlocked: false,
      category: newAppData.category
    };
    setApps([...apps, app]);
  };

  const getStats = () => {
    const totalUsage = apps.reduce((sum, app) => sum + app.usageHours, 0);
    const totalLimit = apps.reduce((sum, app) => sum + app.maxHours, 0);
    const blockedApps = apps.filter(app => app.isBlocked).length;

    return {
      totalUsage,
      totalLimit,
      blockedApps,
      totalApps: apps.length
    };
  };

  const filterApps = (searchQuery: string) => {
    return apps.filter(app =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return {
    apps,
    toggleAppBlock,
    updateAppHours,
    removeApp,
    addNewApp,
    getStats,
    filterApps
  };
}; 