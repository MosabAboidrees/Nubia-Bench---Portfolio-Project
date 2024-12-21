import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Task } from '../../types';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { Card, CardContent } from '../ui/Card';
import { useAuthStore } from '../../store/authStore';

interface TaskManagerProps {
  courseId: string;
  tasks: Task[];
  onTaskCreate: (task: Partial<Task>) => void;
  onTaskUpdate: (taskId: string, task: Partial<Task>) => void;
}

export function TaskManager({ courseId, tasks, onTaskCreate, onTaskUpdate }: TaskManagerProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { user } = useAuthStore();
  const isTeacher = user?.role === 'teacher';

  const handleTaskSubmit = (taskData: Partial<Task>) => {
    if (editingTask) {
      onTaskUpdate(editingTask.id, taskData);
      setEditingTask(null);
    } else {
      onTaskCreate({ ...taskData, courseId });
    }
    setIsAddingTask(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsAddingTask(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Course Tasks</h2>
        {isTeacher && !isAddingTask && (
          <button
            onClick={() => setIsAddingTask(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Task
          </button>
        )}
      </div>

      {isAddingTask && isTeacher ? (
        <TaskForm
          task={editingTask || undefined}
          onSubmit={handleTaskSubmit}
          onCancel={() => {
            setIsAddingTask(false);
            setEditingTask(null);
          }}
        />
      ) : tasks.length > 0 ? (
        <TaskList 
          tasks={tasks} 
          onEditTask={isTeacher ? handleEditTask : undefined} 
          courseId={courseId}
        />
      ) : (
        <Card>
          <CardContent>
            <div className="text-center py-6">
              <p className="text-gray-500">
                {isTeacher 
                  ? "No tasks have been created yet. Click 'Add Task' to create your first task."
                  : "No tasks are available for this course yet."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}