import React from 'react';
import { Navigation } from '../../components/landing/Navigation';
import { Pyramid, History, Globe, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-sand-50">
      <header className="bg-gradient-to-b from-primary-600 to-primary-500">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-5xl font-extrabold text-white text-center leading-tight">
            About Nubia Bench
          </h1>
          <p className="text-lg text-white text-center mt-4 max-w-2xl mx-auto">
            A platform where the ancient wisdom of Nubia meets the power of modern coding education.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          <section className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Story</h2>
            <p className="text-gray-700">
              Nubia Bench was founded with a vision to bridge ancient wisdom with modern technology.
              Inspired by the rich educational heritage of ancient Nubia, we've created a platform
              that combines traditional teaching methodologies with cutting-edge coding education.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 border border-primary-100">
              <History className="h-12 w-12 text-primary-600 mb-6 mx-auto" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Our Heritage</h3>
              <p className="text-gray-600 text-center">
                Drawing inspiration from the ancient Nubian civilization's commitment to knowledge and innovation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 border border-primary-100">
              <Globe className="h-12 w-12 text-primary-600 mb-6 mx-auto" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Global Community</h3>
              <p className="text-gray-600 text-center">
                Building a worldwide community of learners and educators passionate about coding.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 border border-primary-100">
              <Sparkles className="h-12 w-12 text-primary-600 mb-6 mx-auto" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Innovation</h3>
              <p className="text-gray-600 text-center">
                Continuously evolving our platform to provide the best learning experience.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}