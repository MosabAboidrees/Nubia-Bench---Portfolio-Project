import { useMemo } from 'react';
import { Course } from '../types';

interface StudentStats {
  totalCourses: number;
  totalStudents: number;  // Actually represents total tasks, might need renaming
  averageCompletion: number;
}

export function useStudentStats(courses: Course[], studentId?: string): StudentStats {
  return useMemo(() => {
    // Return default values if no courses or student ID is provided
    if (!courses.length || !studentId) {
      return {
        totalCourses: 0,
        totalStudents: 0,
        averageCompletion: 0,
      };
    }

    // Count total number of courses
    const totalCourses = courses.length;
    
    // Calculate total number of tasks across all courses
    const totalTasks = courses.reduce((total, course) => total + course.tasks.length, 0);
    
    // Calculate number of completed tasks for the specific student
    const completedTasks = courses.reduce((total, course) => 
      total + course.tasks.reduce((taskTotal, task) => {
        // Find submission for current student
        const submission = (task.submissions || [])
          .find(sub => sub.studentId === studentId);
        // Increment total if submission exists and is completed
        return taskTotal + (submission?.status === 'completed' ? 1 : 0);
      }, 0), 0
    );

    return {
      totalCourses,
      totalStudents: totalTasks, // NOTE: Misleading property name, actually represents total tasks
      averageCompletion: totalTasks > 0 
        ? Math.round((completedTasks / totalTasks) * 100) // Calculate completion percentage
        : 0,
    };
  }, [courses, studentId]); // Recalculate only when courses or studentId changes
}