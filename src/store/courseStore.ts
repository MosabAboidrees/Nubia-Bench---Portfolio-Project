import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course, Task } from '../types';

interface CourseState {
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (courseId: string, courseData: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
  getCourse: (courseId: string) => Course | undefined;
  addTask: (courseId: string, task: Omit<Task, 'id'>) => void;
  enrollStudent: (courseId: string, studentId: string) => void;
  unenrollStudent: (courseId: string, studentId: string) => void;
  getAvailableCourses: (studentId: string) => Course[];
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      courses: [],
      
      addCourse: (course) => set((state) => ({ 
        courses: [...state.courses, course] 
      })),
      
      updateCourse: (courseId, courseData) => set((state) => ({
        courses: state.courses.map((course) =>
          course.id === courseId ? { ...course, ...courseData } : course
        ),
      })),

      deleteCourse: (courseId) => set((state) => ({
        courses: state.courses.filter((course) => course.id !== courseId),
      })),
      
      getCourse: (courseId) => get().courses.find((course) => course.id === courseId),
      
      addTask: (courseId, taskData) => set((state) => ({
        courses: state.courses.map((course) =>
          course.id === courseId
            ? {
                ...course,
                tasks: [
                  ...course.tasks,
                  {
                    id: crypto.randomUUID(),
                    ...taskData,
                    courseId,
                    submissions: [],
                  },
                ],
              }
            : course
        ),
      })),
      
      enrollStudent: (courseId, studentId) => set((state) => ({
        courses: state.courses.map((course) =>
          course.id === courseId
            ? {
                ...course,
                enrolledStudents: [...new Set([...course.enrolledStudents, studentId])],
              }
            : course
        ),
      })),
      
      unenrollStudent: (courseId, studentId) => set((state) => ({
        courses: state.courses.map((course) =>
          course.id === courseId
            ? {
                ...course,
                enrolledStudents: course.enrolledStudents.filter((id) => id !== studentId),
              }
            : course
        ),
      })),
      
      getAvailableCourses: (studentId) => get().courses.filter(
        course => !course.enrolledStudents.includes(studentId)
      ),
    }),
    {
      name: 'course-storage',
    }
  )
);