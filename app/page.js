import Image from "next/image";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <div className=" min-h-screen bg-zinc-50 font-sans">
      <Navbar />
      
      {/* Hero Section */}
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

      <section className="p-16 flex gap-50 items-center h-full w-full">
        <Image
          src="/groundimage1.jpg"
          alt="Khel-Khud Logo"
          width={500}
          height={500}
          className="h-96 object-contain"
          priority
        />
        <div>
          <h2 className="text-blue-900 text-5xl mb-10 font-medium">
            Robert Downey
          </h2>
          <p className="text-blue-950">
            "QuickCourt is an absolute game-changer for local sports
            enthusiasts!
          </p>
          <p className="text-blue-950">
            It’s refreshing to finally have a platform that guarantees zero
            double-bookings; my court was ready and waiting exactly as promised.
            Highly recommended for a hassle-free game night!"
          </p>
        </div>
      </section>

      <footer className="bg-[#232333] flex justify-center items-center w-full h-24">
       <div className="flex gap-50  px-3.5 py-5 ">
         <div>Copyright © 2026. Website bY team Rocks pirate</div>
        <div>Terms and Condition | Privacy Policy | Cookies Policy </div>
       </div> 
      </footer>
    </div>
  );
}
