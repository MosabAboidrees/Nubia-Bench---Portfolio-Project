import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, RegistrationData, LoginData } from '../types/auth';

interface AuthState {
  user: User | null;
  users: User[];
  login: (data: LoginData) => Promise<User>;
  register: (data: RegistrationData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  approveUser: (userId: string) => void;
  rejectUser: (userId: string) => void;
  getPendingUsers: () => User[];
}

// Default admin account
const defaultAdmin: User = {
  id: 'admin-1',
  name: 'Admin',
  email: 'admin@nubiabench.com',
  password: 'admin123',
  role: 'admin',
  status: 'approved',
  createdAt: new Date(),
};

// Default teacher account
const defaultTeacher: User = {
  id: 'teacher-1',
  name: 'Demo Teacher',
  email: 'teacher@nubiabench.com',
  password: 'teacher123',
  role: 'teacher',
  status: 'approved',
  createdAt: new Date(),
};

// Default student account
const defaultStudent: User = {
  id: 'student-1',
  name: 'Demo Student',
  email: 'student@nubiabench.com',
  password: 'student123',
  role: 'student',
  status: 'approved',
  createdAt: new Date(),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [defaultAdmin, defaultTeacher, defaultStudent],
      
      login: async (data: LoginData) => {
        const user = get().users.find(
          u => u.email === data.email && u.password === data.password
        );
        
        if (!user) {
          throw new Error('Invalid credentials');
        }
        
        if (user.status === 'pending') {
          throw new Error('Your account is pending approval');
        }
        
        if (user.status === 'rejected') {
          throw new Error('Your registration has been rejected');
        }
        
        set({ user });
        return user;
      },
      
      register: async (data: RegistrationData) => {
        const exists = get().users.some(u => u.email === data.email);
        if (exists) {
          throw new Error('Email already registered');
        }
        
        const newUser: User = {
          id: crypto.randomUUID(),
          ...data,
          status: 'pending',
          createdAt: new Date(),
        };
        
        set(state => ({
          users: [...state.users, newUser],
        }));
      },
      
      logout: () => set({ user: null }),
      
      updateUser: (userData) => set(state => ({
        user: state.user ? { ...state.user, ...userData } : null,
        users: state.users.map(u => 
          u.id === state.user?.id ? { ...u, ...userData } : u
        ),
      })),
      
      approveUser: (userId) => set(state => ({
        users: state.users.map(u =>
          u.id === userId ? { ...u, status: 'approved' } : u
        ),
      })),
      
      rejectUser: (userId) => set(state => ({
        users: state.users.map(u =>
          u.id === userId ? { ...u, status: 'rejected' } : u
        ),
      })),
      
      getPendingUsers: () => get().users.filter(u => u.status === 'pending'),
    }),
    {
      name: 'auth-storage',
    }
  )
);