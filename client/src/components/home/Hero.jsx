import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../assets/job_logo.webp";
import { useSelector } from "react-redux";

import img1 from "../../assets/users/u1.webp"
import img2 from "../../assets/users/u2.jpg"

export const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const {user} = useSelector((state) => state.auth);

  const logos = [
    "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg",
  ];

  const titleText = "Your next Job starts with an ";
  const specialText = "AI-Powered ";
  const endText = "Resume";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.09,
        ease: "easeOut",
      },
    },
  };

  const renderAnimatedText = (text, isSpecial = false) => {
    return text.split("").map((char, index) => (
      <motion.span
        key={index}
        variants={charVariants}
        className={`inline-block ${char === " " ? "w-[0.25em]" : ""} ${
          isSpecial
            ? "bg-linear-to-r from-red-900 to-red-800 bg-clip-text text-transparent"
            : ""
        }`}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  return (
    <>
      <div className="relative w-full overflow-hidden">
        {/* Navbar */}
        <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
          <Link href="https://job-labs.lk">
            <img
              src={logo}
              alt="Joblabs Logo"
              className="h-14 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800 mt-8">
            <Link href="#" className="hover:text-red-900 transition">
              Home
            </Link>
            <a href="#features" className="hover:text-red-900 transition">
              Features
            </a>
            <a href="#testimonials" className="hover:text-red-900 transition">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-red-900 transition">
              Contact
            </a>
          </div>

          <div className="flex gap-2 mt-8">
            <Link to={"/sign-in"} hidden={user} className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900 border-slate-300">
              Login
            </Link>
            <Link to={"/app"} hidden={!user} className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900 border-red-900">
              Dashboard
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden active:scale-90 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="lucide lucide-menu"
            >
              <path d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-100 bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <a href="#" className="text-white">
            Home
          </a>
          <a href="#features" className="text-white">
            Features
          </a>
          <a href="#testimonials" className="text-white">
            Testimonials
          </a>
          <a href="#contact" className="text-white">
            Contact
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-red-800 hover:bg-red-900 transition text-white rounded-md flex"
          >
            X
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
          <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-indigo-300 blur-[100px] opacity-30"></div>

          {/* Avatars + Stars */}
          <div className="flex items-center mt-24">
            <div className="flex -space-x-3 pr-3">
              <img
                src={img1}
                alt="user3"
                className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-1"
              />
              <img
                src={img2}
                alt="user1"
                className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2"
              />
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                alt="user2"
                className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-3"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
                alt="user3"
                className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-4"
              />
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="user5"
                className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-5"
              />
            </div>

            <div>
              <div className="flex ">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-star text-transparent fill-red-800"
                      aria-hidden="true"
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                    </svg>
                  ))}
              </div>
              <p className="text-sm text-gray-700">Used by 10,000+ users</p>
            </div>
          </div>

          {/* Animated Headline */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold max-w-5xl text-center mt-4 leading-tight sm:leading-snug md:leading-[70px] px-2 bg-clip-text text-transparent bg-linear-to-r from-[#AB8C95] via-[#000000] to-[#8E97C5]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {renderAnimatedText(titleText)}
            <span className="whitespace-nowrap">
              {renderAnimatedText(specialText, true)}
            </span>
            {renderAnimatedText(endText)}
          </motion.h1>

          <p className="max-w-md text-center text-base my-7">
            Build and upgrade your resume effortlessly with intelligent guidance
            at every step
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 ">
            <Link to="/app" hidden={user} className="bg-red-800 hover:bg-red-900 text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-red-700 flex items-center transition-colors">
              Get started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right ml-1 size-4"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
            <Link to="/app" className="bg-red-800 hover:bg-red-900 text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-red-700 flex items-center transition-colors" hidden={!user}>
              Welcome Back
            </Link>
          </div>

          {/* <p className="py-6 text-slate-600 mt-14">
            Trusting by leading brands, including
          </p>

          <div
            className="flex flex-wrap justify-between max-sm:justify-center gap-6 max-w-3xl w-full mx-auto py-4"
            id="logo-container"
          >
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="logo"
                className="h-6 w-auto max-w-xs"
              />
            ))}
          </div> */}
        </div>
      </div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

          * {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>
    </>
  );
};