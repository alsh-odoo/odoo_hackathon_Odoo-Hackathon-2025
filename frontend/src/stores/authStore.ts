
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,

      login: async (email: string, password: string) => {
        // Simulate API call
        console.log('Login attempt:', { email, password });
        
        // Mock user data - in real app this would come from API
        const mockUser: User = {
          id: '1',
          name: email === 'admin@stackit.com' ? 'Admin User' : 'John Doe',
          email,
          role: email === 'admin@stackit.com' ? 'admin' : 'user',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email === 'admin@stackit.com' ? 'Admin User' : 'John Doe')}&background=6366f1&color=fff`
        };

        set({
          user: mockUser,
          isAuthenticated: true,
          isAdmin: mockUser.role === 'admin'
        });
      },

      register: async (name: string, email: string, password: string) => {
        // Simulate API call
        console.log('Register attempt:', { name, email, password });
        
        const mockUser: User = {
          id: Date.now().toString(),
          name,
          email,
          role: 'user',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`
        };

        set({
          user: mockUser,
          isAuthenticated: true,
          isAdmin: false
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false
        });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
