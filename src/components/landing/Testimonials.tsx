import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex Thompson',
    role: 'Web Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: 'Nubia Bench transformed my coding journey. The structured learning path and supportive community made all the difference.',
    rating: 5
  },
  {
    name: 'Sarah Chen',
    role: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: 'The quality of instruction and immediate feedback system helped me land my dream job in tech.',
    rating: 5
  },
  {
    name: 'Marcus Johnson',
    role: 'Student',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: 'As a beginner, I found the platform incredibly welcoming. The community support is outstanding.',
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900">
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of satisfied learners who have transformed their careers
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-lg shadow-lg border border-primary-100 overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-primary-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-primary-400" fill="currentColor" />
                  ))}
                </div>
                <p className="mt-4 text-gray-600 italic font-medium">"{testimonial.content}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}