import Image from "next/image";

export default function Navbar() {
  return (
    <div>
      <header className="flex justify-center items-center">
        <nav
          className="fixed top-0 mt-5 font-bold z-50 bg-white/60 backdrop-blur-[15px] border-b border-white/20 
                     flex items-center p-8 justify-between text-black w-11/12 h-14 rounded-full"
        >
          {/* Logo */}
          <span className="text-4xl flex items-center font-bold text-black">
            <Image
              src="/logo.png"
              alt="Khel-Khud Logo"
              width={100}
              height={100}
              className="h-100 object-contain"
              priority
            />
            KHEL-KHUD
          </span>

          {/* Nav Links */}
          <div className="hidden md:flex px-10 space-x-10">
            <a href="#home" className="nav-link">
              Home
            </a>
            <a href="#my-bookings" className="nav-link">
              My Bookings
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
}
