// // "use client"; // Next.js App Router के लिए ज़रूरी है

// import { useState , useEffect } from "react";
// import Image from "next/image";

// export default function Navbar() {
//   const [isVisible, setIsVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const controlNavbar = () => {
//     if (typeof window !== "undefined") {
//       if (window.scrollY > lastScrollY && window.scrollY > 100) {
//         // अगर नीचे स्क्रॉल कर रहे हैं तो छुपा दो
//         setIsVisible(false);
//       } else {
//         // अगर ऊपर स्क्रॉल कर रहे हैं तो दिखा दो
//         setIsVisible(true);
//       }
//       setLastScrollY(window.scrollY);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", controlNavbar);
//     return () => {
//       window.removeEventListener("scroll", controlNavbar);
//     };
//   }, [lastScrollY]);

//   return (
//     <header className="flex justify-center items-center">
//       <nav
//         className={`fixed top-0 mt-5 font-bold z-50 bg-white/60 backdrop-blur-[15px] border-b border-white/20 
//           flex items-center p-8 justify-between text-black w-11/12 h-14 rounded-full transition-transform duration-300 ease-in-out
//           ${isVisible ? "translate-y-0" : "-translate-y-[150%]"}`} 
//       >
//         {/* Logo */}
//         <span className="text-2xl md:text-4xl flex items-center font-bold text-black">
//           <Image
//             src="/logo.png"
//             alt="Khel-Khud Logo"
//             width={100}
//             height={100}
//             className="h-10 object-contain"
//             priority
//           />
//           KHEL-KHUD
//         </span>

//         {/* Nav Links */}
//         <div className="hidden md:flex px-10 space-x-10">
//           <a href="#home" className="hover:text-blue-600 transition">Home</a>
//           <a href="#my-bookings" className="hover:text-blue-600 transition">My Bookings</a>
//           <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
//           <a href="#about" className="hover:text-blue-600 transition">About</a>
//         </div>
//       </nav>
//     </header>
//   );
// }


"use client"; // यह लाइन सबसे ऊपर होनी चाहिए, बिना किसी कमेंट के

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      // अगर नीचे स्क्रॉल कर रहे हैं (scrollY > lastScrollY) तो छुपाओ
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header className="flex justify-center items-center">
      <nav
        className={`fixed top-0 mt-5 font-bold z-50 bg-white/60 backdrop-blur-[25px] border-b border-white/20 
          flex items-center p-8 justify-between text-black w-11/12 h-14 rounded-full transition-all duration-500
          ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-28 opacity-0"}`}
      >
        {/* Logo */}
        <span className="text-2xl flex items-center font-bold text-black">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          KHEL-KHUD
        </span>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-10">
          <a href="#home">Home</a>
          <a href="#bookings">My Bookings</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </div>
      </nav>
    </header>
  );
}