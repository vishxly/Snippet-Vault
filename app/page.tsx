"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import {
  Lock,
  Unlock,
  Sun,
  Moon,
  Check,
  ArrowRight,
  Code,
  Database,
  Shield,
  Zap,
} from "lucide-react";
interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

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
  const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
    const { userId } = useAuth();

    return (
      <nav className="bg-white dark:bg-smoky shadow-md">
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
                    <button className="text-purple2 dark:text-vault hover:text-emerald-700 dark:hover:text-emerald-300 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
                      Unlock
                    </button>
                  </Link>
                  <Link href="/sign-up">
                    <button className="bg-yellow1 dark:text-white dark:bg-purple1 px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
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
          <div className="w-12 h-12 bg-greyish rounded-lg transform rotate-45 flex items-center justify-center">
            <Lock className="h-6 w-6 text-white transform -rotate-45" />
          </div>
          <div className="absolute top-0 left-0 w-12 h-12 bg-greyish dark:bg-vault rounded-lg transform rotate-45 flex items-center justify-center animate-pulse">
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
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-300">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-20  bg-white dark:bg-smoky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
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
                <button className="w-full flex items-center justify-center text-[17px] py-3 px-8 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                  Start Your Vault
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link href="#how-it-works">
                <button className="w-full flex items-center justify-center text-[17px] py-3 px-8 rounded-lg border border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                  Learn More
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
      description: "Keep your snippets safe with end-to-end encryption",
      icon: Shield,
    },
    {
      name: "Easy Organization",
      description: "Tag, categorize, and search your code effortlessly",
      icon: Database,
    },
    {
      name: "Quick Access",
      description: "Find and use your snippets in seconds with powerful search",
      icon: Zap,
    },
    {
      name: "Cross-Platform",
      description: "Access your vault from any device, anytime, anywhere",
      icon: Code,
    },
  ];

  return (
    <div className="py-24 bg-white dark:bg-smoky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Your Code, Your Way
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            SnippetVault provides all the tools you need to manage your code
            snippets efficiently and securely.
          </p>
        </div>
        <div className="mt-20">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
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

const HowItWorks: React.FC = () => {
  const steps = [
    { title: "Sign Up", description: "Create your account in seconds" },
    {
      title: "Create Snippets",
      description: "Add your code snippets to your personal vault",
    },
    {
      title: "Organize",
      description: "Tag and categorize your snippets for easy retrieval",
    },
    {
      title: "Access Anywhere",
      description: "Use your snippets on any device, anytime",
    },
  ];

  return (
    <div id="how-it-works" className="py-24 bg-white dark:bg-smoky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            How It Works
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Simple Steps to Secure Your Snippets
          </p>
        </div>
        <div className="mt-20">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-between">
              {steps.map((step, index) => (
                <div key={step.title} className="text-center">
                  <span className="relative w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full text-white">
                    {index + 1}
                  </span>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Hobby",
      price: "Free",
      features: ["100 snippets", "Basic organization", "Web access"],
      cta: "Start for Free",
    },
    {
      name: "Pro",
      price: "$9.99/mo",
      features: [
        "Unlimited snippets",
        "Advanced organization",
        "Web & mobile access",
        "API access",
      ],
      cta: "Go Pro",
    },
    {
      name: "Team",
      price: "$29.99/mo",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Advanced permissions",
        "Priority support",
      ],
      cta: "Start Team Plan",
    },
  ];

  return (
    <div className="py-24 bg-white dark:bg-smoky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Pricing
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Choose the Perfect Plan for You
          </p>
        </div>
        <div className="mt-20 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative p-8 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-sm flex flex-col"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-4 flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-5xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  {plan.price !== "Free" && (
                    <span className="ml-1 text-xl font-semibold">/month</span>
                  )}
                </p>
                <ul className="mt-6 space-y-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check
                        className="flex-shrink-0 w-6 h-6 text-green-500"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-gray-500 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#"
                className="mt-8 block w-full bg-indigo-600 border border-transparent rounded-md py-3 px-6 text-center font-medium text-white hover:bg-indigo-700"
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      content:
        "SnippetVault has revolutionized how I manage my code snippets. It's a game-changer for productivity!",
    },
    {
      name: "Alex Chen",
      role: "Software Engineer",
      content:
        "I love how easy it is to organize and find my snippets. The search functionality is incredibly powerful.",
    },
    {
      name: "Emily Rodriguez",
      role: "Frontend Developer",
      content:
        "The cross-platform access is fantastic. I can grab my snippets wherever I am, on any device.",
    },
  ];

  return (
    <div className="py-24 bg-white dark:bg-smoky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            What Our Users Say
          </p>
        </div>
        <div className="mt-20 space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white dark:bg-smoky p-6 rounded-lg shadow-md"
            >
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {testimonial.content}
              </p>
              <div className="font-medium text-gray-900 dark:text-white">
                {testimonial.name}
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {testimonial.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ... (previous code remains the same)

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Is my data secure?",
      answer:
        "Yes, we use end-to-end encryption to ensure your snippets are secure and private.",
    },
    {
      question: "Can I access my snippets offline?",
      answer:
        "Yes, you can access your snippets offline on our mobile apps once they've been synced.",
    },
    {
      question: "Do you offer a free trial?",
      answer:
        "Yes, our Hobby plan is free forever. You can upgrade to Pro or Team plans anytime.",
    },
    {
      question: "How does team collaboration work?",
      answer:
        "Team members can share snippets, collaborate on collections, and manage permissions easily.",
    },
  ];

  return (
    <div className="py-24 bg-white dark:bg-smoky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            FAQ
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </p>
        </div>
        <div className="mt-20">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

const CTASection: React.FC = () => {
  return (
    <div className="bg-white dark:bg-smoky dark:text-white">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold  sm:text-4xl">
          <span className="block">Ready to secure your code snippets?</span>
          <span className="block">Start using SnippetVault today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 ">
          Join thousands of developers who trust SnippetVault for their code
          snippet management needs.
        </p>
        <Link href="/sign-up">
          <button className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto">
            Get started for free
          </button>
        </Link>
      </div>
    </div>
  );
};

// ... (previous code remains the same)

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-smoky">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          <div>
            <p className="text-center text-base text-gray-400">
              &copy; 2024 SnippetVault, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Home;
