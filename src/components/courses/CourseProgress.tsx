import { Course, Task } from '../../types';

interface CourseProgressProps {
  course: Course;
}

export function CourseProgress({ course }: CourseProgressProps) {
  const calculateTaskCompletion = (task: Task) => {
    const submissions = task.submissions || [];
    return submissions.filter(sub => sub.status === 'completed').length;
  };

  const totalTasks = course.tasks.length;
  const completedTasks = course.tasks.reduce(
    (total, task) => total + calculateTaskCompletion(task),
    0
  );

  const completionPercentage = totalTasks > 0
    ? Math.round((completedTasks / (totalTasks * course.enrolledStudents.length)) * 100)
    : 0;

  return (
    <div className="ml-2 flex-shrink-0 flex">
      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        completionPercentage >= 75 ? 'bg-primary-100 text-primary-800' :
        completionPercentage >= 50 ? 'bg-sand-100 text-sand-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {completionPercentage}% completed
      </p>
    </div>
  );
}