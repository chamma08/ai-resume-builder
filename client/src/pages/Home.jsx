import { useEffect, useState, lazy, Suspense } from "react";
import { motion, useScroll, useSpring, LazyMotion, domAnimation } from "framer-motion";
import { Home as HomeIcon } from "lucide-react"; // Lucide Home icon
import Banner from "../components/home/Banner";
import { Hero } from "../components/home/Hero";

// Lazy load non-critical components
const Features = lazy(() => import("../components/home/Features"));
const Testimonial = lazy(() => import("../components/home/Testimonial"));
const Contact = lazy(() => import("../components/home/Contact"));
const GetStarted = lazy(() => import("../components/home/Getstarted"));
const Footer = lazy(() => import("../components/home/Footer"));

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-pink-500 to-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Scroll-to-top button with fade + pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showTopButton ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-6 right-6 z-50"
      >
        {showTopButton && (
          <motion.button
            onClick={scrollToTop}
            className="bg-gray-800 hover:bg-black text-white p-3 rounded-full shadow-lg"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            aria-label="Go to top"
          >
            <HomeIcon size={22} />
          </motion.button>
        )}
      </motion.div>

      {/* Page sections */}
      <LazyMotion features={domAnimation}>
        <div className="min-h-screen bg-linear-to-br from-gradient-pink to-gradient-blue">
          <Banner onNavigate={scrollToSection} />

          <motion.div
            id="hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Hero />
          </motion.div>

          <Suspense fallback={<div className="h-32" />}>
            <motion.div
              id="features"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mt-32"
            >
              <Features />
            </motion.div>

            <motion.div
              id="testimonials"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mt-10"
            >
              <Testimonial />
            </motion.div>

            <motion.div
              id="contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Contact />
            </motion.div>

            <motion.div
              id="get-started"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <GetStarted />
            </motion.div>

            <motion.div
              id="footer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Footer />
            </motion.div>
          </Suspense>
        </div>
      </LazyMotion>
    </>
  );
}
