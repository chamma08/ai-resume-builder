import logo from "../../assets/logo.png";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-[#261F20] text-white mt-4">
      {/* Header Section */}
      <div className="container mx-auto px-6 py-6"> {/* decreased py */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Job Labs Logo" className="w-12 h-12" />
              <h1 className="text-3xl font-bold">Job Labs</h1>
            </div>

            <p className="text-base text-gray-300 leading-relaxed mb-6 line-clamp-7">
              <span className="font-semibold text-white">
                Real Jobs for Real People.
              </span>{" "}
              At Job Labs, we connect candidates with verified opportunities
              across{" "}
              <span className="font-semibold text-white">
                Retail, Healthcare, Security, Driving & Reception, and
                Professional roles.
              </span>{" "}
              We provide{" "}
              <span className="font-semibold text-white">
                authentic, trusted job listings
              </span>{" "}
              designed to match the right people with the right employers.
              Discover your next career move today with{" "}
              <span className="font-semibold text-white">
                Job Labs – where talent meets opportunity.
              </span>
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white transition"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white transition"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Job Sectors */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Job Sectors</h2>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition text-base">Retail Jobs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition text-base">Healthcare Jobs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition text-base">Security Jobs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition text-base">Drivers & Receptionists</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition text-base">Professional Roles</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition text-base">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition text-base">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition text-base">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition text-base">Sign Up</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition text-base">Login</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Info</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-white mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:Enquiries@job-labs.lk" className="text-gray-300 hover:text-white transition text-base">
                  Enquiries@job-labs.lk
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-white mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                </svg>
                <a href="https://www.job-labs.lk" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition text-base">
                  www.job-labs.lk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="bg-red-800 py-3"> {/* decreased from py-5 */}
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-2 md:mb-0">
            © 2025 Job Labs. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
