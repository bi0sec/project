import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Training, TrainingProgress } from '../types';

interface TrainingState {
  trainings: Training[];
  progress: TrainingProgress[];
  addTraining: (training: Training) => void;
  updateProgress: (progress: TrainingProgress) => void;
  getTrainingProgress: (userId: string, trainingId: string) => TrainingProgress | undefined;
}

export const useTrainingStore = create<TrainingState>()(
  persist(
    (set, get) => ({
      trainings: [],
      progress: [],
      addTraining: (training) =>
        set((state) => ({
          trainings: [...state.trainings, training],
        })),
      updateProgress: (progress) =>
        set((state) => ({
          progress: [
            ...state.progress.filter(
              (p) => p.userId !== progress.userId || p.trainingId !== progress.trainingId
            ),
            progress,
          ],
        })),
      getTrainingProgress: (userId, trainingId) =>
        get().progress.find(
          (p) => p.userId === userId && p.trainingId === trainingId
        ),
    }),
    {
      name: 'training-storage',
    }
  )
);