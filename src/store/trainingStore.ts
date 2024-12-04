import { create } from 'zustand';
import { Training, TrainingProgress, UserGroup } from '../types';

interface TrainingState {
  trainings: Training[];
  progress: TrainingProgress[];
  groups: UserGroup[];
  addTraining: (training: Training) => void;
  updateProgress: (progress: TrainingProgress) => void;
  addGroup: (group: UserGroup) => void;
  updateGroup: (group: UserGroup) => void;
}

export const useTrainingStore = create<TrainingState>((set) => ({
  trainings: [],
  progress: [],
  groups: [],
  addTraining: (training) =>
    set((state) => ({
      trainings: [...state.trainings, training],
    })),
  updateProgress: (progress) =>
    set((state) => ({
      progress: [
        ...state.progress.filter((p) => p.userId !== progress.userId || p.trainingId !== progress.trainingId),
        progress,
      ],
    })),
  addGroup: (group) =>
    set((state) => ({
      groups: [...state.groups, group],
    })),
  updateGroup: (group) =>
    set((state) => ({
      groups: [...state.groups.filter((g) => g.id !== group.id), group],
    })),
}));