import { AppData } from '../types/app';

export const initialApps: AppData[] = [
  {
    id: "1",
    name: "Discord",
    icon: "🎮",
    usageHours: 3.5,
    maxHours: 4,
    isBlocked: false,
    category: "Social"
  },
  {
    id: "2",
    name: "Chrome",
    icon: "🌐",
    usageHours: 6.2,
    maxHours: 5,
    isBlocked: true,
    category: "Productivity"
  },
  {
    id: "3",
    name: "Spotify",
    icon: "🎵",
    usageHours: 2.1,
    maxHours: 3,
    isBlocked: false,
    category: "Entertainment"
  },
  {
    id: "4",
    name: "VS Code",
    icon: "💻",
    usageHours: 4.8,
    maxHours: 8,
    isBlocked: false,
    category: "Development"
  },
  {
    id: "5",
    name: "Steam",
    icon: "🎮",
    usageHours: 1.5,
    maxHours: 2,
    isBlocked: false,
    category: "Gaming"
  }
];

export const appCategories = [
  'Productivity',
  'Social',
  'Entertainment',
  'Development',
  'Gaming'
] as const; 