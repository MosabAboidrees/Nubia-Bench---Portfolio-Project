import { Task } from '../../types';
import { User } from '../../types/auth';
import { X } from 'lucide-react';

interface TaskSubmissionModalProps {
  task: Task; // The task object containing details about the task
  student: User; // The user object representing the student
  onClose: () => void; // Function to close the modal
}

export function TaskSubmissionModal({ task, student, onClose }: TaskSubmissionModalProps) {
  // Find the submission made by the student for the given task
  const submission = task.submissions?.find(s => s.studentId === student.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
              <p className="text-sm text-gray-500">Submission by {student.name}</p>
            </div>
            <button
              onClick={onClose} // Close button to trigger the onClose function
              className="rounded-md text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Task Description</h4>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Student's Solution</h4>
              {submission?.content ? (
                <pre className="mt-2 p-4 bg-sand-50 rounded-md overflow-x-auto font-mono text-sm">
                  <code>{submission.content}</code>
                </pre>
              ) : (
                <p className="text-sm text-gray-500 italic">No solution submitted yet</p>
              )}
            </div>

            {task.solution && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Expected Solution</h4>
                <pre className="mt-2 p-4 bg-sand-50 rounded-md overflow-x-auto font-mono text-sm">
                  <code>{task.solution}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}