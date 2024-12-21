export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  status: 'pending' | 'approved' | 'rejected';
  password: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
}

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  role: 'teacher' | 'student';
}

export interface LoginData {
  email: string;
  password: string;
}