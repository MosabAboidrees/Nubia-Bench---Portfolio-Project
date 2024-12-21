import { CourseListHeader } from '../../components/courses/CourseListHeader';
import { StatCards } from '../../components/dashboard/StatCards';
import { CourseList } from '../../components/courses/CourseList';
import { AvailableCourses } from '../../components/courses/AvailableCourses';
import { useCourseStore } from '../../store/courseStore';
import { useAuthStore } from '../../store/authStore';
import { useStudentStats } from '../../hooks/useStudentStats';

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const { courses, getAvailableCourses, enrollStudent } = useCourseStore();
  
  const enrolledCourses = courses.filter(course => 
    course.enrolledStudents.includes(user?.id || '')
  );
  
  const availableCourses = getAvailableCourses(user?.id || '');
  const stats = useStudentStats(enrolledCourses, user?.id);

  const handleEnroll = (courseId: string) => {
    if (user) {
      enrollStudent(courseId, user.id);
    }
  };

  return (
    <div className="space-y-8">
      <CourseListHeader title="Student Dashboard" />
      <StatCards {...stats} />
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">My Courses</h2>
          {enrolledCourses.length > 0 ? (
            <CourseList courses={enrolledCourses} />
          ) : (
            <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
          )}
        </div>

        <AvailableCourses 
          courses={availableCourses}
          onEnroll={handleEnroll}
        />
      </div>
    </div>
  );
}