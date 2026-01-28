"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Smartphone, Trophy, Users, Zap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else if (result?.ok) {
        router.push("/");
        router.refresh();
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
          <h2 className="text-4xl font-bold mb-6">Book Your Perfect Court</h2>
          <p className="text-cyan-100 text-lg mb-12">
            Connect with your community and reserve sports courts at ease. Play, compete, and have fun!
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <Smartphone className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Easy Booking</h3>
              <p className="text-cyan-100">Reserve courts in just a few taps</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <Users className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Community</h3>
              <p className="text-cyan-100">Connect with sports enthusiasts</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Zap className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Instant Confirmation</h3>
              <p className="text-cyan-100">Get real-time booking updates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Container - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
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
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-cyan-500 hover:text-cyan-600 font-semibold transition">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
