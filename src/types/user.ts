export interface User {
  id: string;
  name: string;
  email: string;
  role: 'secretary-general' | 'assistant-secretary' | 'committee-chair' | 'logistics' | 'protocol' | 'press' | 'tech-support';
  progress: {
    [courseId: string]: {
      completed: boolean;
      watchTime: number;
      totalTime: number;
      completedAt?: string;
    };
  };
  totalProgress: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}