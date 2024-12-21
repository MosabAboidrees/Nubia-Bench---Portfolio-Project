import { FileCode, FileQuestion, ChevronRight } from 'lucide-react';
import { Task } from '../../types';
import { Link } from 'react-router-dom';

interface TaskListProps {
  tasks: Task[];
  onEditTask?: (task: Task) => void;
  courseId: string;
}

export function TaskList({ tasks, onEditTask, courseId }: TaskListProps) {
  const getTaskIcon = (type: Task['type']) => {
    return type === 'coding' ? (
      <FileCode className="h-5 w-5 text-primary-500" />
    ) : (
      <FileQuestion className="h-5 w-5 text-secondary-500" />
    );
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Link
          key={task.id}
          to={`/course/${courseId}/task/${task.id}`}
          className="block"
        >
          <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow hover:bg-sand-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getTaskIcon(task.type)}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {onEditTask && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onEditTask(task);
                    }}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Edit
                  </button>
                )}
                <ChevronRight className="h-5 w-5 text-primary-400" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}