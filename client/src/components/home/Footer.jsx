import logo from "../../assets/logo.png";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Globe,
  ChevronRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1414] text-white mt-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-600/5 rounded-full blur-3xl"></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="relative">
                <img
                  src={logo}
                  alt="Job Labs Logo"
                  className="w-14 h-14 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                />
                <div className="absolute inset-0 bg-red-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Job Labs
              </h1>
            </div>

            <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6">
              <span className="font-semibold text-white block mb-2">
                Create Smart, ATS-Friendly Resumes
              </span>
              <span></span>
              Build and enhance your resume with AI-powered tools that highlight
              your skills and help you stand out.
              <span className="font-semibold text-red-400 block mt-2">
                Job Labs - where your resume meets innovation
              </span>
            </p>

            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/share/17LDn2cdnr/?mibextid=wwXIfr"
                className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:scale-110 transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/job.labs?igsh=bDM5N2ZsYmZ5eGJx"
                className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:scale-110 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCIeo4mgjR8gOGxnrmAmpRhw/featured"
                className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:scale-110 transition-all duration-300 group"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/company/job-labs-sri-lanka/"
                className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:scale-110 transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Job Sectors */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white relative inline-block">
              Job Sectors
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-red-600 rounded-full"></span>
            </h2>
            <ul className="space-y-3">
              {[
                "Retail Jobs",
                "Healthcare Jobs",
                "Security Jobs",
                "Drivers & Receptionists",
                "Professional Roles",
              ].map((item, index) => (
                <li key={index} className="group">
                  <a
                    href="#"
                    className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4 text-red-600 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-red-600 rounded-full"></span>
            </h2>
            <ul className="space-y-3">
              {["Home", "About Us", "Services", "Sign Up", "Sign In"].map(
                (item, index) => (
                  <li key={index} className="group">
                    <a
                      href="/"
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2"
                    >
                      <ChevronRight className="w-4 h-4 text-red-600 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item}
                      </span>
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white relative inline-block">
              Contact Info
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-red-600 rounded-full"></span>
            </h2>
            <ul className="space-y-5">
              <li className="group">
                <a
                  href="mailto:Enquiries@job-labs.lk"
                  className="flex items-start gap-3 text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="pt-2">
                    <span className="block text-xs text-gray-500 mb-1">
                      Email Us
                    </span>
                    <span className="group-hover:text-red-400 break-all">
                      Enquiries@job-labs.lk
                    </span>
                  </div>
                </a>
              </li>
              <li className="group">
                <a
                  href="https://www.job-labs.lk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="pt-2">
                    <span className="block text-xs text-gray-500 mb-1">
                      Visit Website
                    </span>
                    <span className="group-hover:text-red-400 break-all">
                      www.job-labs.lk
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-white/10"></div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="bg-[#0f0a0b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} <span className="text-gray-400">Job Labs</span>. All Rights
              Reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-xs sm:text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-red-400 transition-colors duration-300 relative group"
              >
                Privacy Policy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-400 transition-colors duration-300 relative group"
              >
                Terms of Service
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-400 transition-colors duration-300 relative group"
              >
                Cookie Policy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
