import { useState } from 'react';
import { Course } from '../../types';
import { StudentProgressTable } from './StudentProgressTable';
import { TaskSubmissionModal } from './TaskSubmissionModal';
import { useAuthStore } from '../../store/authStore';

// Component for displaying and managing student analytics for a specific course
interface StudentAnalyticsProps {
  course: Course;
}

export function StudentAnalytics({ course }: StudentAnalyticsProps) {
  // Track the currently selected task and student for modal display
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { users } = useAuthStore();
  
  // Filter users to only show students enrolled in this course
  const enrolledStudents = users.filter(
    user => course.enrolledStudents.includes(user.id)
  );

  // Handler for opening the submission modal with selected task and student
  const handleViewSubmission = (task, student) => {
    setSelectedTask(task);
    setSelectedStudent(student);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Student Progress</h2>
      
      <StudentProgressTable 
        students={enrolledStudents}
        tasks={course.tasks}
        onViewSubmission={handleViewSubmission}
      />

      {selectedTask && selectedStudent && (
        <TaskSubmissionModal
          task={selectedTask}
          student={selectedStudent}
          onClose={() => {
            setSelectedTask(null);
            setSelectedStudent(null);
          }}
        />
      )}
    </div>
  );
}