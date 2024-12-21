import { Navigation } from '../../components/landing/Navigation';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Team() {
  const team = [
    {
      name: 'Mosab Aboidrees Altraifi Yousif',
      role: 'Founder, Curriculum Designer & Lead Instructor',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      bio: 'Ph.D. in Computer Science with 15 years of teaching experience.',
    },
    {
      name: 'Mohamedalfateh T. M. SAEED',
      role: 'Co-Founder, Curriculum Designer & Instructor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      bio: 'Former senior engineer at major tech companies with a passion for education.',
    },
    {
      name: 'Azza Omer Mohamed',
      role: 'Co-Founder, Curriculum Designer & Instructor',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      bio: 'Specializes in creating engaging and effective learning experiences.',
    },
  ];

  return (
    <div className="min-h-screen bg-sand-50">
      <header className="bg-gradient-to-b from-primary-500 to-primary-600">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-display font-bold text-white text-center">Our Team</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden border border-primary-100">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-primary-600 mb-2">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-primary-500">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-500">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-500">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
