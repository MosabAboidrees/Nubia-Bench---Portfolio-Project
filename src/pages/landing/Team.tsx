import { Navigation } from '../../components/landing/Navigation';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Team() {
  const team = [
    {
      name: 'Mosab Aboidrees Altraifi Yousif',
      role: 'Founder, Curriculum Designer & Lead Instructor',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQHIHDQX2NuNDA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1690380896661?e=1742428800&v=beta&t=3C07dcvahUgbiRADYeyQyGh6KMrXrJobJIVRGniel10',
      bio: 'Ph.D. in Computer Science with 15 years of teaching experience.',
      linkedin: 'https://www.linkedin.com/in/mosab-aboidrees-altraifi-yousif-041aaa83/',
      mail: 'mailto:mosab_mahala@yahoo.com',
      github: 'https://github.com/MosabAboidrees',

    },
    {
      name: 'Mohamedalfateh T. M. SAEED',
      role: 'Co-Founder, Curriculum Designer & Instructor',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQFylxwVTu6HCQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1688766191008?e=1742428800&v=beta&t=M5HRgHWkN2k3IwIUhHH4WozIIQHNEchIixLmRVJBVwA',
      bio: 'Electrical & Electronics Engineering Student at Ondokus Mayis University.',
      linkedin: 'https://www.linkedin.com/in/mohamedalfateh-t-m-saeed-6721a819b/',
      mail: 'mailto:mohamedalfateh83@gmail.com',
      github: 'https://github.com/FatihSir'
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

      <main className="max-w-5xl mx-auto px-40 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-32">
          {team.map((member) => (
            <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden border border-primary-100">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-128 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-primary-600 mb-2">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex space-x-4">
                  <a href={member.github} className="text-gray-400 hover:text-primary-500">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href={member.linkedin} className="text-gray-400 hover:text-primary-500">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.mail} className="text-gray-400 hover:text-primary-500">
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
