export interface AppData {
  id: string;
  name: string;
  icon: string;
  usageHours: number;
  maxHours: number;
  isBlocked: boolean;
  category: string;
}

export interface NewAppData {
  name: string;
  icon: string;
  category: string;
  maxHours: number;
}

export type AppCategory = 'Productivity' | 'Social' | 'Entertainment' | 'Development' | 'Gaming';

export type ActiveTab = 'overview' | 'apps' | 'time' | 'blocking'; 