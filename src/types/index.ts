export interface User {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'student';
  bio?: string;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  tasks: Task[];
  enrolledStudents: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  courseId: string;
  type: 'coding' | 'quiz';
  content: string;
  solution?: string;
  submissions?: Submission[];
}

export interface Submission {
  id: string;
  studentId: string;
  status: 'pending' | 'completed';
  content?: string;
  feedback?: string;
  score?: number;
  submittedAt: Date;
}