import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { BookOpen, Users, Pencil } from 'lucide-react';
import { TaskManager } from '../components/tasks/TaskManager';
import { StudentAnalytics } from '../components/analysis/StudentAnalytics';
import { CourseEditForm } from '../components/courses/CourseEditForm';
import { useAuthStore } from '../store/authStore';
import { useCourseStore } from '../store/courseStore';
import { Task } from '../types';

export default function CourseView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getCourse, updateCourse, deleteCourse, addTask } = useCourseStore();
  const course = getCourse(id!);
  const isTeacher = user?.role === 'teacher';
  const [isEditing, setIsEditing] = useState(false);

  if (!course) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Course Not Found</h1>
        <p className="text-gray-600">The course you're looking for doesn't exist.</p>
        <Link
          to={isTeacher ? '/teacher' : '/student'}
          className="text-primary-600 hover:text-primary-800"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const handleTaskCreate = (taskData: Omit<Task, 'id'>) => {
    addTask(id!, taskData);
  };

  const handleTaskUpdate = (taskId: string, taskData: Partial<Task>) => {
    const updatedTasks = course.tasks.map(task =>
      task.id === taskId ? { ...task, ...taskData } : task
    );
    updateCourse(id!, { tasks: updatedTasks });
  };

  const handleCourseUpdate = (courseData: Partial<typeof course>) => {
    updateCourse(id!, courseData);
    setIsEditing(false);
  };

  const handleCourseDelete = () => {
    deleteCourse(id!);
    navigate('/teacher');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <Link to={isTeacher ? '/teacher' : '/student'}>Dashboard</Link>
            <span>›</span>
            <span>Course</span>
          </div>
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
            {isTeacher && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600">
            {course.enrolledStudents.length} Students
          </span>
        </div>
      </div>

      {isEditing && isTeacher ? (
        <CourseEditForm
          course={course}
          onUpdate={handleCourseUpdate}
          onDelete={handleCourseDelete}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <Card>
          <CardContent>
            <div className="prose max-w-none">
              <h2 className="text-lg font-medium text-gray-900">Course Description</h2>
              <p className="mt-2 text-gray-600">{course.description}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TaskManager
            courseId={id!}
            tasks={course.tasks}
            onTaskCreate={handleTaskCreate}
            onTaskUpdate={handleTaskUpdate}
          />
        </div>

        {isTeacher ? (
          <div className="lg:col-span-3">
            <StudentAnalytics course={course} />
          </div>
        ) : (
          <Card>
            <CardContent>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Your Progress</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-primary-400 mr-2" />
                    <span className="text-gray-700">Tasks Completed</span>
                  </div>
                  <span className="font-medium">
                    {course.tasks.filter(task => 
                      task.submissions?.some(sub => 
                        sub.studentId === user?.id && sub.status === 'completed'
                      )
                    ).length} / {course.tasks.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary-500 h-2.5 rounded-full"
                    style={{ 
                      width: `${course.tasks.length ? 
                        (course.tasks.filter(task => 
                          task.submissions?.some(sub => 
                            sub.studentId === user?.id && sub.status === 'completed'
                          )
                        ).length / course.tasks.length) * 100 : 0}%` 
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}