export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'user';
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Soldier {
  _id: string;
  nrp: string;
  name: string;
  rank: string;
  corps: string;
  unit: string;
  education: string;
  specialization?: string;
  serviceDuration: number;
  healthStatus: string;
  lastCheckup?: string;
  bloodType?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  _id: string;
  name: string;
  code: string;
  type: string;
  base: string;
  location: {
    latitude: number;
    longitude: number;
  };
  personnelCount: number;
  commander?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  _id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  ipAddress?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface SoldierStats {
  total: number;
  noEducation: number;
  specialists: number;
  avgServiceDuration: number;
  byRank: Array<{ _id: string; count: number }>;
  byUnit: Array<{ _id: string; count: number }>;
  healthStats: Array<{ _id: string; count: number }>;
}

export interface UnitLocation extends Unit {
  doctors: Array<{
    name: string;
    rank: string;
    specialization?: string;
  }>;
}
