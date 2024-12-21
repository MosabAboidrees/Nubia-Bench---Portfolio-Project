import { Link } from 'react-router-dom';
import { BookOpen, Users } from 'lucide-react';
import { Course } from '../../types';

interface CourseListItemProps {
  course: Course;
}

export function CourseListItem({ course }: CourseListItemProps) {
  const hasStudents = course.enrolledStudents.length > 0;
  const completionRate = hasStudents && course.tasks.length > 0
    ? Math.round(
        (course.tasks.reduce((total, task) => {
          const completedSubmissions = (task.submissions || [])
            .filter(sub => sub.status === 'completed').length;
          return total + completedSubmissions;
        }, 0) / (course.tasks.length * course.enrolledStudents.length)) * 100
      )
    : 0;

  return (
    <li>
      <Link to={`/course/${course.id}`} className="block hover:bg-sand-50">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-primary-400 mr-3" />
              <p className="text-sm font-medium text-primary-600 truncate">{course.title}</p>
            </div>
            <div className="ml-2 flex-shrink-0 flex">
              {hasStudents ? (
                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                  {completionRate}% completed
                </p>
              ) : (
                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sand-100 text-sand-800">
                  No students enrolled
                </p>
              )}
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="flex items-center text-sm text-gray-500">
                <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-primary-400" />
                {course.enrolledStudents.length} students enrolled
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}