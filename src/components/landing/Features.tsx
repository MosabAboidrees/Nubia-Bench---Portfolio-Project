import { BookOpen, Users, Shield, Code, Target, Zap } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Expert-Led Courses',
    description: 'Learn from experienced instructors who are passionate about teaching and coding.'
  },
  {
    icon: Users,
    title: 'Collaborative Learning',
    description: 'Join a community of learners and share knowledge with peers worldwide.'
  },
  {
    icon: Shield,
    title: 'Verified Teachers',
    description: 'All instructors are carefully vetted to ensure quality education.'
  },
  {
    icon: Code,
    title: 'Hands-on Projects',
    description: 'Build real-world projects that enhance your portfolio.'
  },
  {
    icon: Target,
    title: 'Structured Learning',
    description: 'Follow a clear path from basics to advanced concepts.'
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Get immediate feedback on your code and progress.'
  }
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900">
            Why Choose Nubia Bench?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our platform combines ancient Nubian principles with modern educational technology
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="relative p-6 bg-white border border-primary-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute top-6 left-6 bg-primary-100 rounded-lg p-3">
                <feature.icon className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-16">
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}