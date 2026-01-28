"use client";

import { signupAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Trophy, Users, Zap, Mail, Lock, User, Phone } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await signupAction(formData);

      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        router.push("/login");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Container - Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white flex-col justify-between p-12">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <Trophy className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Khel Khuud</h1>
          </div>
          <h2 className="text-4xl font-bold mb-6">Start Your Sports Journey</h2>
          <p className="text-cyan-100 text-lg mb-12">
            Join thousands of sports enthusiasts and discover the best courts in your area. Book now!
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <Zap className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Quick Setup</h3>
              <p className="text-cyan-100">Create an account in under a minute</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <Users className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Join Community</h3>
              <p className="text-cyan-100">Connect with local sports enthusiasts</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Trophy className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Book & Play</h3>
              <p className="text-cyan-100">Reserve courts and start playing today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Container - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join the sports community today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-500" />
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-gray-900 placeholder-gray-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-500" />
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-gray-900 placeholder-gray-500"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-500" />
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-gray-900 placeholder-gray-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-500" />
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-gray-900 placeholder-gray-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-500" />
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-gray-900 placeholder-gray-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-500 hover:text-cyan-600 font-semibold transition">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
