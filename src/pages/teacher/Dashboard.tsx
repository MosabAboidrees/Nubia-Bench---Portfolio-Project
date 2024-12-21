import { CourseListHeader } from '../../components/courses/CourseListHeader';
import { StatCards } from '../../components/dashboard/StatCards';
import { CourseListItem } from '../../components/courses/CourseListItem';
import { useTeacherStats } from '../../hooks/useTeacherStats';
import { useCourseStore } from '../../store/courseStore';
import { useAuthStore } from '../../store/authStore';

export default function TeacherDashboard() {
  const { user } = useAuthStore();
  const courses = useCourseStore((state) => 
    state.courses.filter(course => course.teacherId === user?.id)
  );
  const stats = useTeacherStats(courses);

  return (
    <div className="space-y-6">
      <CourseListHeader title="Teacher Dashboard" showCreateButton />
      <StatCards {...stats} />

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {courses.map((course) => (
            <CourseListItem key={course.id} course={course} />
          ))}
        </ul>
      </div>
    </div>
  );
}