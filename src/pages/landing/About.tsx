import React from 'react';
import { Navigation } from '../../components/landing/Navigation';
import { Pyramid, History, Globe, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-sand-50">
      <header className="bg-gradient-to-b from-primary-500 to-primary-600">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-display font-bold text-white text-center">About Nubia Bench</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          <section className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-display font-bold text-gray-900">Our Story</h2>
            <p className="text-gray-600">
              Nubia Bench was founded with a vision to bridge ancient wisdom with modern technology. 
              Inspired by the rich educational heritage of ancient Nubia, we've created a platform 
              that combines traditional teaching methodologies with cutting-edge coding education.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-primary-100">
              <History className="h-8 w-8 text-primary-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Heritage</h3>
              <p className="text-gray-600">
                Drawing inspiration from the ancient Nubian civilization's commitment to knowledge and innovation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-primary-100">
              <Globe className="h-8 w-8 text-primary-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Global Community</h3>
              <p className="text-gray-600">
                Building a worldwide community of learners and educators passionate about coding.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-primary-100">
              <Sparkles className="h-8 w-8 text-primary-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Continuously evolving our platform to provide the best learning experience.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}