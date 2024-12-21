import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pyramid, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { RegistrationData } from '../../types/auth';

export default function Register() {
  const navigate = useNavigate();
  const register = useAuthStore(state => state.register);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/register-success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 bg-nubian-pattern flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Pyramid className="h-16 w-16 text-primary-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-display font-bold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-primary-100">
          {error && (
            <div className="mb-4 p-2 text-sm text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.password}
                onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative flex items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-sand-50">
                  <input
                    type="radio"
                    className="absolute h-0 w-0 opacity-0"
                    name="role"
                    value="student"
                    checked={formData.role === 'student'}
                    onChange={e => setFormData(prev => ({ ...prev, role: e.target.value as 'student' | 'teacher' }))}
                  />
                  <div className={`text-center ${formData.role === 'student' ? 'text-primary-600' : 'text-gray-500'}`}>
                    <span className="block font-medium">Student</span>
                  </div>
                  {formData.role === 'student' && (
                    <div className="absolute inset-0 border-2 border-primary-500 rounded-lg pointer-events-none" />
                  )}
                </label>
                <label className="relative flex items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-sand-50">
                  <input
                    type="radio"
                    className="absolute h-0 w-0 opacity-0"
                    name="role"
                    value="teacher"
                    checked={formData.role === 'teacher'}
                    onChange={e => setFormData(prev => ({ ...prev, role: e.target.value as 'student' | 'teacher' }))}
                  />
                  <div className={`text-center ${formData.role === 'teacher' ? 'text-primary-600' : 'text-gray-500'}`}>
                    <span className="block font-medium">Teacher</span>
                  </div>
                  {formData.role === 'teacher' && (
                    <div className="absolute inset-0 border-2 border-primary-500 rounded-lg pointer-events-none" />
                  )}
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex items-center justify-center px-4 py-2 border border-primary-300 shadow-sm text-sm font-medium rounded-md text-primary-700 bg-white hover:bg-sand-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}