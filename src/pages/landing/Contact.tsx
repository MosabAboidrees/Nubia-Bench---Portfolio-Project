import React, { useState } from 'react';
import { Navigation } from '../../components/landing/Navigation';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormStatus('sent');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-b from-primary-600 to-primary-500">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-display font-extrabold text-white text-center">
            Get in Touch
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Information Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Reach Us Anytime</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-primary-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-800">Email</h3>
                  <p className="text-gray-600">contact@nubiabench.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-primary-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-800">Phone</h3>
                  <p className="text-gray-600">+9 (551) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-primary-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-800">Location</h3>
                  <p className="text-gray-600">Avcılar Province<br />Istanbul 34310, Türkiye</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <button
                type="submit"
                disabled={formStatus !== 'idle'}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {formStatus === 'sending' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : formStatus === 'sent' ? (
                  'Message Sent!'
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}