import { create } from 'zustand';
import { User } from '../types';

interface AdminState {
  isAdmin: boolean;
  adminUsers: User[];
  setAdmin: (status: boolean) => void;
  addAdmin: (user: User) => void;
  checkAdmin: (userId: string) => boolean;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  isAdmin: false,
  adminUsers: [
    {
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@test.com',
      role: 'admin',
      groups: [],
      completedTraining: true,
    }
  ],
  setAdmin: (status) => set({ isAdmin: status }),
  addAdmin: (user) => set((state) => ({
    adminUsers: [...state.adminUsers, { ...user, role: 'admin' }]
  })),
  checkAdmin: (userId) => get().adminUsers.some(admin => admin.id === userId)
}));