import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

interface CourseListHeaderProps {
  title: string;
  showCreateButton?: boolean;
}

export function CourseListHeader({ title, showCreateButton }: CourseListHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {showCreateButton && (
        <Link
          to="/teacher/course/create"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Create New Course
        </Link>
      )}
    </div>
  );
}