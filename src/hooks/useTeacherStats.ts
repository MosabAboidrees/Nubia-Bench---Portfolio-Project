import { useMemo } from 'react';
import { Course } from '../types';

interface TeacherStats {
  totalCourses: number;   // Total number of courses taught by the teacher
  totalStudents: number;  // Total number of students across all courses
  averageCompletion: number;  // Average completion rate (%) across all courses
}

export function useTeacherStats(courses: Course[]): TeacherStats {
  return useMemo(() => {
    // Return default values if no courses exist
    if (!courses.length) {
      return {
        totalCourses: 0,
        totalStudents: 0,
        averageCompletion: 0,
      };
    }

    const totalCourses = courses.length;
    // Calculate total number of students by summing enrolled students across all courses
    const totalStudents = courses.reduce(
      (total, course) => total + course.enrolledStudents.length,
      0
    );

    // Calculate completion rate for each course
    const completionRates = courses.map(course => {
      const totalTasks = course.tasks.length;
      // Skip calculation if course has no tasks or students
      if (!totalTasks || !course.enrolledStudents.length) return 0;
      
      // Count total completed submissions across all tasks
      const completedTasks = course.tasks.reduce((total, task) => {
        const submissions = task.submissions || [];
        return total + submissions.filter(sub => sub.status === 'completed').length;
      }, 0);
      
      // Calculate completion rate as:
      // (completed tasks / (total tasks * number of students)) * 100
      return (completedTasks / (totalTasks * course.enrolledStudents.length)) * 100;
    });

    // Calculate average completion rate across all courses
    const averageCompletion = completionRates.length 
      ? Math.round(completionRates.reduce((a, b) => a + b, 0) / completionRates.length)
      : 0;

    return {
      totalCourses,
      totalStudents,
      averageCompletion,
    };
  }, [courses]); // Memoize results based on courses array
}