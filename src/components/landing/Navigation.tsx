import { Link } from 'react-router-dom';
import { Pyramid } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Pyramid className="h-8 w-8 text-white" />
          <span className="ml-2 text-xl font-display font-bold text-white">Nubia Bench</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-sand-100">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-sand-100">
            About
          </Link>
          <Link to="/team" className="text-white hover:text-sand-100">
            Our Team
          </Link>
          <Link to="/contact" className="text-white hover:text-sand-100">
            Contact Us
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-white hover:text-sand-100">
            Sign in
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-600 bg-white hover:bg-sand-50"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}