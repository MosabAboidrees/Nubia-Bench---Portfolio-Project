import { User } from '../../types/auth';
import { Task } from '../../types';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

// Interface defining the required props for the StudentProgressTable component
interface StudentProgressTableProps {
  students: User[];
  tasks: Task[];
}

export function StudentProgressTable({ students, tasks }: StudentProgressTableProps) {
  // Determines the submission status for a specific task and student
  // Returns an object with status, icon, and color for visual representation
  const getSubmissionStatus = (task: Task, studentId: string) => {
    const submission = task.submissions?.find(s => s.studentId === studentId);
    if (!submission) {
      return { status: 'pending', icon: Clock, color: 'text-gray-400' };
    }
    return submission.status === 'completed'
      ? { status: 'completed', icon: CheckCircle, color: 'text-primary-500' }
      : { status: 'pending', icon: XCircle, color: 'text-red-500' };
  };

  // Calculates the overall progress percentage for a student
  // Returns a number between 0-100 representing completion percentage
  const calculateStudentProgress = (studentId: string) => {
    const completedTasks = tasks.filter(task => 
      task.submissions?.some(s => s.studentId === studentId && s.status === 'completed')
    ).length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  return (
    <Card>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-primary-200">
            {/* Table header with task titles and progress column */}
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                {tasks.map(task => (
                  <th key={task.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {task.title}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            {/* Table body showing student details and their progress for each task */}
            <tbody className="bg-white divide-y divide-primary-200">
              {students.map(student => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  {tasks.map(task => {
                    const { status, icon: Icon, color } = getSubmissionStatus(task, student.id);
                    return (
                      <td key={task.id} className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Icon className={`h-5 w-5 ${color}`} />
                          <span className="ml-2 text-sm text-gray-500 capitalize">{status}</span>
                        </div>
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-primary-500 rounded-full"
                          style={{ width: `${calculateStudentProgress(student.id)}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {calculateStudentProgress(student.id)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}