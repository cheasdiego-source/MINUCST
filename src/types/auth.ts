export interface User {
  id: string;
  code: string;
  role: 'training' | 'superadmin';
  isActive: boolean;
  isBlocked: boolean;
  blockedUntil?: Date;
  lastActivity?: Date;
  createdAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  sessionExpiry?: Date;
  jwtToken?: string;
}

export interface LoginAttempt {
  ip: string;
  code?: string;
  timestamp: Date;
  success: boolean;
}

export interface SessionData {
  userId: string;
  role: 'training' | 'superadmin';
  createdAt: Date;
  lastActivity: Date;
  jwtToken: string;
}

export interface TrainingProgress {
  userId: string;
  moduleId: string;
  progress: number;
  completed: boolean;
  lastAccessed: Date;
}

export interface DashboardData {
  users: Array<{
    id: string;
    code: string;
    status: 'online' | 'offline';
    progress: number;
    lastAction: string;
    lastActionTime: Date;
    isActive: boolean;
  }>;
  totalUsers: number;
  activeUsers: number;
  completionRate: number;
}

export interface JWTPayload {
  userId: string;
  role: 'training' | 'superadmin';
  code: string;
  iat: number;
  exp: number;
}