"use client"
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { Code, Search, Tag, Cloud, ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
};

const Navbar = () => {
  const { userId } = useAuth();

  return (
    <nav className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Code className="h-8 w-8 text-purple-400" />
            <span className="ml-2 text-xl font-bold text-purple-400">SnippetMaster</span>
          </div>
          <div className="flex items-center">
            {userId ? (
              <Link href="/my-notes">
                <button className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
                  Go to App
                </button>
              </Link>
            ) : (
              <div className="flex space-x-4">
                <Link href="/sign-in">
                  <button className="text-purple-400 hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
                    Sign In
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Organize Your Code</span>
                <span className="block text-purple-400">Like Never Before</span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Elevate your coding workflow with SnippetMaster. Organize, find, and use your code snippets efficiently.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/sign-up">
                    <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                      Get started
                      <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-75 skew-y-6 transform -rotate-6 translate-x-20 translate-y-20"></div>
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    { name: 'Advanced Tagging', description: 'Organize snippets with custom tags', icon: Tag },
    { name: 'Powerful Search', description: 'Find any snippet in seconds', icon: Search },
    { name: 'Code Highlighting', description: 'Syntax highlighting for all languages', icon: Code },
    { name: 'Cloud Sync', description: 'Access from anywhere, any device', icon: Cloud },
  ];

  return (
    <div className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-purple-400 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Everything you need to master your code
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Home;
