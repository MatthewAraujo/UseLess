import { useState, useEffect, useRef } from 'react';
import { AppData, NewAppData } from '../types/app';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

interface AppInfo {
  Id: number;
  ProcessName: string;
  MainWindowTitle: string;
  Path?: string;
  StartTime?: string
}

// Helper function to get an appropriate icon based on process name
const getAppIcon = (processName: string): string => {
  const name = processName.toLowerCase();
  if (name.includes('chrome') || name.includes('firefox') || name.includes('edge')) return '🌐';
  if (name.includes('discord')) return '🎮';
  if (name.includes('spotify')) return '🎵';
  if (name.includes('code') || name.includes('vscode')) return '💻';
  if (name.includes('steam')) return '🎮';
  if (name.includes('word') || name.includes('excel') || name.includes('powerpoint')) return '📄';
  if (name.includes('photoshop') || name.includes('illustrator')) return '🎨';
  if (name.includes('terminal') || name.includes('cmd') || name.includes('powershell')) return '💻';
  if (name.includes('explorer')) return '📁';
  if (name.includes('notepad')) return '📝';
  return '🖥️'; // default icon
};

// Helper function to get category based on process name
const getAppCategory = (processName: string): string => {
  const name = processName.toLowerCase();
  if (name.includes('chrome') || name.includes('firefox') || name.includes('edge')) return 'Productivity';
  if (name.includes('discord') || name.includes('teams') || name.includes('slack')) return 'Social';
  if (name.includes('spotify') || name.includes('youtube') || name.includes('netflix')) return 'Entertainment';
  if (name.includes('code') || name.includes('vscode') || name.includes('terminal')) return 'Development';
  if (name.includes('steam') || name.includes('game')) return 'Gaming';
  if (name.includes('word') || name.includes('excel') || name.includes('powerpoint')) return 'Productivity';
  if (name.includes('photoshop') || name.includes('illustrator')) return 'Design';
  return 'Other';
};

// Convert Windows app info to AppData format
const convertToAppData = (appInfo: AppInfo): AppData => {
  // Calculate usage hours based on StartTime
  let usageHours = 0;
  if (appInfo.StartTime) {
    try {
      // StartTime format: "/Date(1752095389001)/"
      const match = appInfo.StartTime.match(/\/Date\((\d+)\)\//);
      if (match && match[1]) {
        const startTimeMs = parseInt(match[1]);
        const nowMs = Date.now();
        const diffInMs = nowMs - startTimeMs;
        usageHours = diffInMs / (1000 * 60 * 60); // Convert milliseconds to hours
      } else {
        console.warn(`Could not extract timestamp from StartTime format: ${appInfo.StartTime}`);
        usageHours = Math.random() * 2; // Fallback to small random value
      }
    } catch (error) {
      console.warn(`Could not parse start time for ${appInfo.ProcessName}:`, error);
      usageHours = Math.random() * 2; // Fallback to small random value
    }
  } else {
    usageHours = Math.random() * 2; // Fallback for apps without start time
  }

  return {
    id: appInfo.Id.toString(),
    name: appInfo.MainWindowTitle || appInfo.ProcessName,
    icon: getAppIcon(appInfo.ProcessName),
    usageHours: Math.max(0, usageHours), // Ensure non-negative
    maxHours: 4, // Default max hours
    isBlocked: false, // Default not blocked
    category: getAppCategory(appInfo.ProcessName)
  };
};

export const useApps = () => {
  const [apps, setApps] = useState<AppData[]>([]);

  // Listen for Windows apps updates from Rust backend
  useEffect(() => {
    const fetchInitialApps = async () => {
      try {
        const windowsApps = await invoke<AppInfo[]>("get_windows_apps_visible");
        const convertedApps = windowsApps.map(convertToAppData);
        setApps(convertedApps);
      } catch (error) {
        console.error("Error fetching initial Windows apps:", error);
        setApps([]);
      }
    };

    // Fetch initial data
    fetchInitialApps();

    // Listen for real-time updates from Rust
    const unlisten = listen<AppInfo[]>('windows_apps_update', (event) => {
      const convertedApps = event.payload.map(convertToAppData);
      setApps(convertedApps);
    });

    // Cleanup listener on unmount
    return () => {
      unlisten.then((f) => f());
    };
  }, []);

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

  const refreshApps = async () => {
    try {
      const windowsApps = await invoke<AppInfo[]>("get_windows_apps_visible");
      const convertedApps = windowsApps.map(convertToAppData);
      setApps(convertedApps);
    } catch (error) {
      console.error("Error refreshing apps:", error);
    }
  };

  return {
    apps,
    toggleAppBlock,
    updateAppHours,
    removeApp,
    addNewApp,
    getStats,
    filterApps,
    refreshApps
  };
}; 