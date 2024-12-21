import { Link } from 'react-router-dom';
import { BookOpen, Users, ChevronRight } from 'lucide-react';
import { Course } from '../../types';

interface CourseListProps {
  courses: Course[];
}

export function CourseList({ courses }: CourseListProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-primary-100">
        {courses.map((course) => (
          <li key={course.id}>
            <Link to={`/course/${course.id}`} className="block hover:bg-sand-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-primary-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-primary-600 truncate">{course.title}</p>
                      <p className="mt-1 text-xs text-gray-500">{course.tasks.length} tasks available</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 flex items-center text-sm text-gray-500">
                      <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-primary-400" />
                      {course.enrolledStudents.length} students
                    </div>
                    <ChevronRight className="h-5 w-5 text-primary-400" />
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}