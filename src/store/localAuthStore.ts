import { create } from 'zustand';

interface LocalUser {
  username: string;
  isAuthenticated: boolean;
}

interface LocalAuthState {
  user: LocalUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useLocalAuthStore = create<LocalAuthState>((set) => ({
  user: null,
  login: (username: string, password: string) => {
    // Simple test credentials check
    if ((username === 'test' && password === 'test') || (username === 'admin' && password === 'admin')) {
      set({ user: { username, isAuthenticated: true } });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null }),
}));