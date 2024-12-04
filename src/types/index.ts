export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  groups: string[];
  completedTraining: boolean;
  lastTrainingDate?: Date;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  slides: Slide[];
  assignedTo: {
    users: string[];
    groups: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Slide {
  id: string;
  title: string;
  content: string;
  image?: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface TrainingProgress {
  userId: string;
  trainingId: string;
  currentSlide: number;
  completed: boolean;
  quizCompleted: boolean;
  quizScore?: number;
  certificateGenerated: boolean;
  completedAt?: Date;
}

export interface UserGroup {
  id: string;
  name: string;
  description: string;
  members: string[];
}