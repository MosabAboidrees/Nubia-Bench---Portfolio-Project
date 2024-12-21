import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function RegisterSuccess() {
  return (
    <div className="min-h-screen bg-sand-50 bg-nubian-pattern flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-primary-100 text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-primary-500" />
          <h2 className="mt-4 text-2xl font-display font-bold text-gray-900">
            Registration Successful
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your account is pending approval. You will be notified once an administrator reviews your registration.
          </p>
          <div className="mt-6">
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}