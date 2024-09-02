"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Lock, Unlock, Sun, Moon } from "lucide-react";

const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  const toggleDarkMode = (): void => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-300">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <Features />
    </div>
  );
};

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const { userId } = useAuth();

  return (
    <nav className="bg-white dark:bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <SnippetVaultLogo />
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-black text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            {userId ? (
              <Link href="/my-notes">
                <button className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
                  Open Vault
                </button>
              </Link>
            ) : (
              <div className="flex space-x-4">
                <Link href="/sign-in">
                  <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
                    Unlock
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
                    Create Vault
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

const SnippetVaultLogo: React.FC = () => {
  return (
    <div className="flex-shrink-0 flex items-center space-x-2">
      <div className="relative">
        <div className="w-12 h-12 bg-yellowish rounded-lg transform rotate-45 flex items-center justify-center">
          <Lock className="h-6 w-6 text-white transform -rotate-45" />
        </div>
        <div className="absolute top-0 left-0 w-12 h-12 bg-yellowish rounded-lg transform rotate-45 flex items-center justify-center animate-pulse">
          <Unlock className="h-6 w-6 text-white transform -rotate-45 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tighter">
          Snippet
        </span>
        <span className="text-2xl font-extrabold text-yellowish dark:text-vault tracking-wider">
          Vault
        </span>
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-16 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Secure Your Code Snippets</span>
            <span className="block text-greyish dark:text-vault">
              In Your Personal Vault
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Organize, protect, and access your valuable code snippets with ease.
            Your digital vault for all your programming treasures.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/sign-up">
                <button className="w-full text-[17px] py-3 dark:text-gray-100 px-8 rounded-lg bg-gradient-to-b from-[#D6CAFE] to-[#9E81FE] border-2 border-gray-700 border-b-[5px] shadow-[0_1px_6px_0_#9E81FE] transform transition-transform duration-200 ease-linear focus:outline-none active:translate-y-0 active:border-b-[2px] hover:-translate-y-[3px]">
                  Start Your Vault
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      name: "Secure Storage",
      description: "Keep your snippets safe and encrypted",
    },
    {
      name: "Easy Organization",
      description: "Tag and categorize your code effortlessly",
    },
    {
      name: "Quick Access",
      description: "Find and use your snippets in seconds",
    },
    {
      name: "Cross-Platform",
      description: "Access your vault from any device",
    },
  ];

  return (
    <div className="py-12 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-emerald-600 dark:text-vault font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Your Code, Your Way
          </p>
        </div>
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-greyish dark:bg-vault text-white">
                    <Lock className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Home;
