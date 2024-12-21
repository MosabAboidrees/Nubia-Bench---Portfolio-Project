import { BookOpen, Users, BarChart } from 'lucide-react';
import { StatCard } from '../ui/StatCard';

interface StatCardsProps {
  totalCourses: number;
  totalStudents: number;
  averageCompletion: number;
}

export function StatCards({ totalCourses, totalStudents, averageCompletion }: StatCardsProps) {
  const stats = [
    {
      icon: BookOpen,
      title: 'Total Courses',
      value: totalCourses,
    },
    {
      icon: Users,
      title: 'Total Students',
      value: totalStudents,
    },
    {
      icon: BarChart,
      title: 'Average Completion',
      value: `${averageCompletion}%`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
        />
      ))}
    </div>
  );
}