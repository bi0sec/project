export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  groups: string[];
  completedTraining: boolean;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingProgress {
  userId: string;
  trainingId: string;
  completed: boolean;
  score?: number;
  lastAccessed: Date;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  members: string[]; // User IDs
  trainings: string[]; // Training IDs
}