import { BookOpen, Users, Plus } from 'lucide-react';
import { Course } from '../../types';
import { Card, CardContent } from '../ui/Card';

interface AvailableCoursesProps {
  courses: Course[];
  onEnroll: (courseId: string) => void;
}

export function AvailableCourses({ courses, onEnroll }: AvailableCoursesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Available Courses</h2>
      {courses.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{course.description}</p>
                  </div>
                  <button
                    onClick={() => onEnroll(course.id)}
                    className="ml-4 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Enroll
                  </button>
                </div>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1 text-primary-400" />
                  <span>{course.enrolledStudents.length} students enrolled</span>
                  <BookOpen className="h-4 w-4 ml-4 mr-1 text-primary-400" />
                  <span>{course.tasks.length} tasks</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent>
            <div className="text-center py-6">
              <BookOpen className="mx-auto h-12 w-12 text-primary-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No Courses Available</h3>
              <p className="mt-1 text-sm text-gray-500">
                There are no new courses available for enrollment at the moment.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}