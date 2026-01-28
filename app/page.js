import Hero from "./components/Hero";
import Image from "next/image";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <div className=" min-h-screen bg-zinc-50 font-sans">
      <Navbar />
      <div>
        <Hero />
      </div>

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
