import { create } from 'zustand';

import {
  getCurrentUser,
  logout as logoutAction,
} from '@/lib/actions/auth.actions';

type AuthStore = {
  user: 'seeker' | 'employer' | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getCurrentUser();
      if (response) {
        set({ user: response.role, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      set({
        error: 'Failed to fetch user',
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await logoutAction();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      set({ error: 'Failed to logout' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
