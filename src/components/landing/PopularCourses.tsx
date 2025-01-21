import { BookOpen, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const popularCourses = [
  {
    title: 'Web Development Fundamentals',
    description: 'Learn HTML, CSS, and JavaScript from scratch',
    students: 1234,
    level: 'Beginner'
  },
  {
    title: 'Python Programming',
    description: 'Master Python programming with practical projects',
    students: 987,
    level: 'Intermediate'
  },
  {
    title: 'React & Modern JavaScript',
    description: 'Build modern web applications with React',
    students: 756,
    level: 'Advanced'
  }
];

export function PopularCourses() {
  return (
    <section className="py-20 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900">
            Popular Learning Paths
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Start your journey with our most popular courses
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {popularCourses.map((course) => (
            <div 
              key={course.title}
              className="bg-white rounded-lg shadow-lg border border-primary-100 overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                <p className="mt-2 text-gray-600">{course.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-5 w-5 text-primary-400 mr-2" />
                    {course.students.toLocaleString()} students
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {course.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/register"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 transition-all"
          >
            Explore All Courses
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}