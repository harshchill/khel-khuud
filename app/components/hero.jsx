import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full">
      {/* Background Image */}
      <Image
        src="/hero2.jpg"
        alt="Team Champions"
        fill
        priority
        className="object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1b4d]/40 via-[#0b1b4d]/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Play your Sports
            </h1>

            <p className="mt-4 text-2xl italic">
              Empowering Local Sports,
              <span className="text-yellow-400 font-semibold">One Booking</span>
              at a Time.
            </p>

            <p className="mt-6 text-gray-200 leading-relaxed">
              Khel-Khud is a local sports booking system designed for players,
              facility owners, and administrators — built to replace manual
              processes.
            </p>

            <p className="mt-4 text-gray-200 leading-relaxed">
              "Don't Let the Game Wait. Discover local courts with Khelkhud."
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-md font-semibold transition">
                FIND VENUE
              </button>

              <button className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition">
                REGISTER
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
