import { Navigation } from '../components/landing/Navigation';
import { Features } from '../components/landing/Features';
import { PopularCourses } from '../components/landing/PopularCourses';
import { Testimonials } from '../components/landing/Testimonials';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-sand-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-b from-primary-500 to-primary-600">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-display font-bold text-white sm:text-5xl md:text-6xl">
              Modern Coding Education
              <span className="block text-sand-200">Inspired by Ancient Wisdom</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-sand-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Join our platform where traditional teaching methods meet modern technology. Learn coding from expert instructors in an engaging environment.
            </p>
            <div className="mt-10 flex justify-center space-x-6">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-sand-50 md:text-lg"
              >
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/register?role=teacher"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-700 hover:bg-primary-800 md:text-lg"
              >
                Become a Teacher
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Features />
        <PopularCourses />
        <Testimonials />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-primary-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-display font-bold text-gray-900">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/courses" className="text-gray-600 hover:text-primary-500">Browse Courses</Link></li>
                <li><Link to="/blog" className="text-gray-600 hover:text-primary-500">Blog</Link></li>
                <li><Link to="/faq" className="text-gray-600 hover:text-primary-500">FAQ</Link></li>
                <li><Link to="/support" className="text-gray-600 hover:text-primary-500">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-gray-900">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/about" className="text-gray-600 hover:text-primary-500">About Us</Link></li>
                <li><Link to="/team" className="text-gray-600 hover:text-primary-500">Our Team</Link></li>
                <li><Link to="/careers" className="text-gray-600 hover:text-primary-500">Careers</Link></li>
                <li><Link to="/press" className="text-gray-600 hover:text-primary-500">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-gray-900">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/privacy" className="text-gray-600 hover:text-primary-500">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-primary-500">Terms of Service</Link></li>
                <li><Link to="/cookies" className="text-gray-600 hover:text-primary-500">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-gray-900">Contact</h3>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 text-primary-400 mr-2" />
                  contact@nubiabench.com
                </li>
                <li className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 text-primary-400 mr-2" />
                  +9 (551) 123-4567
                </li>
                <li className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 text-primary-400 mr-2" />
                  Avcılar Province<br />Istanbul 34310, Türkiye.
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} Nubia Bench. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}