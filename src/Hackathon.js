import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Code, Calendar, Trophy, Clock, ChevronDown, Users, MessageCircle, HelpCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

// Optimized CustomCursor component with reduced lag
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  
  useEffect(() => {
    // Create a throttling mechanism
    let lastUpdate = 0;
    const throttleAmount = 5; // ms between updates
    
    const moveCursor = (e) => {
      const now = Date.now();
      if (now - lastUpdate < throttleAmount) return;
      
      lastUpdate = now;
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        
        // Check if the cursor is over a clickable element
        const target = e.target;
        const clickableElements = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
        setIsPointer(
          clickableElements.includes(target.tagName) || 
          window.getComputedStyle(target).cursor === 'pointer'
        );
      });
    };
    
    window.addEventListener('mousemove', moveCursor);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);
  
  return (
    <>
      {/* Main cursor dot - simplified animation settings */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-blue-400/50 pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: position.x - 10,
          y: position.y - 10,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.2,
        }}
      />
      
      {/* First ring - simplified to follow without complex spring physics */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-pink-300/30 pointer-events-none z-[9998]"
        style={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isPointer ? 1.2 : 1,
        }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 0.1,
        }}
      />
      
      {/* Outer ring - more lightweight animation */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 rounded-full border border-pink-300/10 pointer-events-none z-[9997] blur-sm"
        style={{
          x: position.x - 48,
          y: position.y - 48,
          scale: isPointer ? 1.1 : 1,
        }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 0.2,
        }}
      />
    </>
  );
};

const HackathonWebsite = () => {
  const [loading, setLoading] = useState(true);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  // Add this new state for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Set the registration deadline (example: April 15, 2025)
  const deadline = new Date("March 25, 2025 23:59:59").getTime();
  
  useEffect(() => {
    // Logo animation timing
    setTimeout(() => {
      setLogoAnimationComplete(true);
    }, 2000);
    
    // Text animation timing
    setTimeout(() => {
      setTextAnimationComplete(true);
    }, 4500);
    
    // Complete loading and show main website
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = deadline - now;
      
      setDays(Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((timeLeft % (1000 * 60)) / 1000));
      
      if (timeLeft < 0) {
        clearInterval(interval);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const sections = ['home', 'about', 'timeline', 'problem-statements', 'prize-pool', 'faq', 'contact'];
  
  // Update the scrollToSection function to ensure it works properly on mobile

const scrollToSection = (section) => {
  setCurrentSection(section);
  
  // Close mobile menu if open
  if (mobileMenuOpen) {
    setMobileMenuOpen(false);
  }
  
  // Use setTimeout to ensure menu closing animation completes before scrolling
  setTimeout(() => {
    const element = document.getElementById(section);
    if (element) {
      // Smooth scroll with proper offset to account for fixed header
      const headerOffset = 80; // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, 10);
};
  
  // Replace your current handleWheel function with this improved version
const handleWheel = (e) => {
  // Add a throttle/debounce mechanism
  if (e.target.scrollingTimer) return; // Prevent multiple rapid scrolls
  
  e.target.scrollingTimer = true;
  
  // Use a threshold to determine if the scroll was significant
  const scrollThreshold = 80;
  
  // Only change sections on significant scroll movements
  if (Math.abs(e.deltaY) > scrollThreshold) {
    // Determine direction
    if (e.deltaY > 0) {
      // Scrolling down
      const currentIndex = sections.indexOf(currentSection);
      if (currentIndex < sections.length - 1) {
        scrollToSection(sections[currentIndex + 1]);
      }
    } else {
      // Scrolling up
      const currentIndex = sections.indexOf(currentSection);
      if (currentIndex > 0) {
        scrollToSection(sections[currentIndex - 1]);
      }
    }
  }
  
  // Reset the timer after a delay to allow scrolling again
  setTimeout(() => {
    if (e.target) e.target.scrollingTimer = false;
  }, 1000); // 1 second cooldown between section changes
};
  
  // Loading animation screen
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-pink-600 opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-pink-400 opacity-10 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        {/* Logo animation */}
        <AnimatePresence>
          {!logoAnimationComplete && (
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="relative z-10"
            >
              <img src="https://i.ibb.co/9kNWRD27/weal2.png" alt="WEAL Logo" className="w-64 h-64 object-contain" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Text animation */}
        <AnimatePresence>
          {logoAnimationComplete && !textAnimationComplete && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-gray-400 text-2xl mb-6 tracking-widest font-semibold relative"
              >
                <span className="relative z-10">
                  <span className="bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text">WEAL</span> PRESENTS
                </span>
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent absolute bottom-0 left-0"></div>
              </motion.div>
              
              <div className="relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="h-16 bg-pink-500/20 absolute top-1/2 left-0 transform -translate-y-1/2 z-0"
                ></motion.div>
                
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="text-6xl font-bold mb-4 relative z-10"
                >
                  <span className="text-pink-500">HEAL</span><span className="text-white">-O-</span>
                  <span className="text-pink-500">CODE</span><span className="text-white"> 2.0</span>
                </motion.h1>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="flex items-center justify-center space-x-4 mt-4"
              >
                <Heart className="text-pink-500" size={24} />
                <motion.p 
                  className="text-xl font-light italic text-white relative"
                  initial={{ filter: "blur(4px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={{ duration: 1, delay: 1.8 }}
                >
                  <span className="bg-gradient-to-r from-pink-400 to-pink-500 text-transparent bg-clip-text font-medium">Code</span>, 
                  <span className="bg-gradient-to-r from-white to-gray-200 text-transparent bg-clip-text"> Create</span>, 
                  <span className="bg-gradient-to-r from-pink-400 to-pink-500 text-transparent bg-clip-text font-medium"> Cure</span>: 
                  <span className="relative">
                    <span> Where Tech Meets Wellness</span>
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent" 
                      initial={{ width: 0, left: "50%" }}
                      animate={{ width: "100%", left: 0 }}
                      transition={{ delay: 2, duration: 1 }}
                    ></motion.span>
                  </span>
                </motion.p>
                <Code className="text-pink-500" size={24} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Loading progress bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ duration: 5, ease: "easeInOut" }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 h-1 bg-pink-500 rounded-full"
        ></motion.div>
      </div>
    );
  }
  
  // Main website content
  return (
    <div className="bg-black text-white min-h-screen" onWheel={handleWheel}>
      {/* Hide the default cursor */}
      <style jsx global>{`
        body {
          cursor: none;
        }
      `}</style>
      
      {/* Custom cursor component */}
      <CustomCursor />
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-md border-b border-pink-600">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://i.ibb.co/9kNWRD27/weal2.png" alt="WEAL Logo" className="h-8 w-8 mr-3" />
            <div className="text-xl font-bold text-pink-500">HEAL-O-CODE 2.0</div>
          </div>
          <div className="hidden md:flex space-x-6">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`uppercase font-medium hover:text-pink-400 transition-colors ${
                  currentSection === section ? 'text-pink-500' : 'text-gray-300'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
          <button 
            className="md:hidden text-pink-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/95 backdrop-blur-md border-b border-pink-600"
            >
              <div className="container mx-auto px-4 py-4">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left py-3 uppercase font-medium hover:text-pink-400 transition-colors ${
                    currentSection === section ? 'text-pink-500' : 'text-gray-300'
                  }`}
                >
                  {section}
                </button>
              ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Home Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-4"
      >
        {/* Enhanced background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main glow elements */}
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-pink-600 opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-pink-400 opacity-10 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Additional glow elements */}
          <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-pink-500 opacity-10 blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 left-1/4 w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 right-1/3 w-72 h-72">
            <div className="w-full h-full border border-pink-500/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-56 h-56 -translate-x-1/2 -translate-y-1/2 border border-pink-500/15 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 border border-pink-500/10 rounded-full"></div>
          </div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:14px_14px]"></div>
          
          {/* Animated particles */}
          <div className="absolute left-10 top-1/4">
            <motion.div 
              className="w-1 h-1 bg-pink-400 rounded-full"
              animate={{ 
                y: [0, -20, 0], 
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.2, 1]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
          </div>
          <div className="absolute right-20 top-1/3">
            <motion.div 
              className="w-1 h-1 bg-pink-400 rounded-full"
              animate={{ 
                y: [0, -15, 0], 
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.1, 1]
              }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            />
          </div>
          <div className="absolute left-1/3 bottom-1/3">
            <motion.div 
              className="w-2 h-2 bg-pink-500 rounded-full"
              animate={{ 
                y: [0, -25, 0], 
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.3, 1]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
            />
          </div>
          
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/50 to-black pointer-events-none"></div>

          {/* Animated lines */}
          <div className="absolute left-0 top-0 h-full w-1 overflow-hidden opacity-20">
            <motion.div 
              className="w-full h-1/3 bg-gradient-to-b from-transparent via-pink-500 to-transparent"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            />
          </div>
          <div className="absolute right-0 top-0 h-full w-1 overflow-hidden opacity-20">
            <motion.div 
              className="w-full h-1/3 bg-gradient-to-b from-transparent via-pink-500 to-transparent"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 7, ease: "linear", delay: 2 }}
            />
          </div>

          {/* DNA-like helix (representing health/tech combination) */}
          <div className="absolute bottom-20 left-10 opacity-20">
            <motion.div
              className="w-32 h-1/2"
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-pink-500 to-transparent transform -skew-x-12"></div>
              <div className="absolute top-0 left-8 w-1 h-full bg-gradient-to-b from-transparent via-pink-500 to-transparent transform skew-x-12"></div>
              <div className="absolute top-0 left-16 w-1 h-full bg-gradient-to-b from-transparent via-pink-500 to-transparent transform -skew-x-12"></div>
              <div className="absolute top-0 left-24 w-1 h-full bg-gradient-to-b from-transparent via-pink-500 to-transparent transform skew-x-12"></div>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <div className="font-semibold text-2xl text-gray-400 mb-4 tracking-widest relative inline-block">
            <span className="relative z-10">
              <span className="bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text">WEAL</span> PRESENTS
            </span>
            <motion.div 
              initial={{ width: 0, left: "50%" }}
              animate={{ width: "100%", left: 0 }}
              transition={{ duration: 1.5 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent absolute bottom-0"
            ></motion.div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4">
            <span className="text-pink-500">HEAL</span>-O-
            <span className="text-pink-500">CODE</span> 2.0
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center justify-center space-x-2 sm:space-x-4 mb-8 sm:mb-12"
          >
            <Heart className="text-pink-500 hidden sm:block" size={24} />
            <h2 className="text-lg sm:text-xl md:text-2xl font-light italic">
              Code, Create, Cure: Where Tech Meets Wellness
            </h2>
            <Code className="text-pink-500 hidden sm:block" size={24} />
          </motion.div>
          
          <div className="mb-12">
            <div className="text-sm uppercase tracking-wider mb-3 font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-500">
              REGISTRATION DEADLINE
            </div>
            
            {/* Add this attractive date display with responsive padding */}
            <div className="mb-5">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-block px-4 sm:px-6 py-2 rounded-full bg-gradient-to-r from-pink-600/20 to-pink-400/20 border border-pink-500/50"
              >
                <span className="text-white font-medium text-sm sm:text-base">
                  <span className="text-pink-400 mr-1 sm:mr-2">⏰</span>
                  <span className="text-lg sm:text-xl font-bold text-white">25</span>
                  <sup className="text-xs sm:text-sm text-pink-300">th</sup> 
                  <span className="text-lg sm:text-xl font-bold ml-1 text-white">March 2025</span>
                  <span className="text-pink-300 ml-1 sm:ml-2 font-light text-sm sm:text-base">23:59 IST</span>
                </span>
              </motion.div>
            </div>
            
            {/* Responsive countdown timer boxes */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <div className="bg-gradient-to-b from-black to-gray-900 border-2 border-pink-500 rounded-lg p-2 sm:p-4 w-20 sm:w-24 shadow-lg shadow-pink-500/20">
                <div className="text-3xl sm:text-4xl font-bold text-pink-400">{days}</div>
                <div className="text-xs text-gray-300 font-medium">DAYS</div>
              </div>
              <div className="bg-gradient-to-b from-black to-gray-900 border-2 border-pink-500 rounded-lg p-2 sm:p-4 w-20 sm:w-24 shadow-lg shadow-pink-500/20">
                <div className="text-3xl sm:text-4xl font-bold text-pink-400">{hours}</div>
                <div className="text-xs text-gray-300 font-medium">HOURS</div>
              </div>
              <div className="bg-gradient-to-b from-black to-gray-900 border-2 border-pink-500 rounded-lg p-2 sm:p-4 w-20 sm:w-24 shadow-lg shadow-pink-500/20">
                <div className="text-3xl sm:text-4xl font-bold text-pink-400">{minutes}</div>
                <div className="text-xs text-gray-300 font-medium">MINUTES</div>
              </div>
              <div className="bg-gradient-to-b from-black to-gray-900 border-2 border-pink-500 rounded-lg p-2 sm:p-4 w-20 sm:w-24 shadow-lg shadow-pink-500/20">
                <div className="text-3xl sm:text-4xl font-bold text-pink-400">{seconds}</div>
                <div className="text-xs text-gray-300 font-medium">SECONDS</div>
              </div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-600 to-pink-400 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all"
            onClick={() => window.open("https://forms.gle/wPkrVQwQkpAFcVp86", "_blank")}
          >
            REGISTER NOW
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-10"
        >
          <button onClick={() => scrollToSection('about')} className="flex flex-col items-center text-gray-400 hover:text-pink-400 transition-colors">
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="animate-bounce" size={24} />
          </button>
        </motion.div>
      </section>
      
      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 py-16"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold mb-2">About</h2>
            <div className="w-24 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>
          
          {/* Single wider card about the hackathon instead of two cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-black rounded-2xl p-8 border border-pink-500/30 mb-12"
          >
            <div className="flex items-center mb-6">
              <Heart className="text-pink-500 mr-4" size={36} />
              <h3 className="text-2xl font-bold">About HEAL-O-CODE</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              HEAL-O-CODE 2.0 is a premier health-tech hackathon organized by the WEAL Club of PES University. This innovative event brings together passionate developers, designers, and healthcare enthusiasts to create technological solutions addressing critical healthcare challenges. Participants will work in teams to develop prototypes that could potentially transform the healthcare industry, focusing on accessibility, efficiency, and patient care. Join us for an unforgettable 24-hour journey of coding, collaboration, and innovation at the intersection of technology and wellness.
            </p>

            {/* Hackathon Dates information */}
            <div className="bg-black/50 p-4 rounded-lg border border-pink-500/20">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <h4 className="text-lg font-semibold text-white">Event Dates</h4>
                </div>
                <div className="text-gray-300 pl-7">
                  <p className="mb-1">
                    <span className="bg-gradient-to-r from-pink-400 to-pink-500 text-transparent bg-clip-text font-medium">Start:</span> 28th March 2025, 5:00 PM
                  </p>
                  <p>
                    <span className="bg-gradient-to-r from-pink-400 to-pink-500 text-transparent bg-clip-text font-medium">End:</span> 29th March 2025, 1:00 PM
                  </p>
                </div>
              </div>
            
            <div className="mt-8 space-y-4">
              {/* Venue information */}
              <div className="bg-black/50 p-4 rounded-lg border border-pink-500/20">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <h4 className="text-lg font-semibold text-white">Venue</h4>
                </div>
                <p className="text-gray-300 pl-7">
                  <span className="bg-gradient-to-r from-pink-400 to-pink-500 text-transparent bg-clip-text font-medium">MRD Student Center</span>, 
                  PES University, Electronic City Campus
                </p>
              </div>
              
              
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Why Participate?</h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-black p-6 rounded-xl border border-pink-500/20 hover:border-pink-500/50 transition-all">
                <div className="bg-pink-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="text-pink-500" size={32} />
                </div>
                <h4 className="text-xl font-semibold mb-2">Learn & Grow</h4>
                <p className="text-gray-400">Enhance your skills and collaborate with like-minded individuals</p>
              </div>
              <div className="bg-black p-6 rounded-xl border border-pink-500/20 hover:border-pink-500/50 transition-all">
                <div className="bg-pink-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="text-pink-500" size={32} />
                </div>
                <h4 className="text-xl font-semibold mb-2">Win Prizes</h4>
                <p className="text-gray-400">Compete for an impressive prize pool and recognition</p>
              </div>
              <div className="bg-black p-6 rounded-xl border border-pink-500/20 hover:border-pink-500/50 transition-all">
                <div className="bg-pink-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-pink-500" size={32} />
                </div>
                <h4 className="text-xl font-semibold mb-2">Make Impact</h4>
                <p className="text-gray-400">Create solutions that can transform healthcare and wellness</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Placeholder sections for future development */}
      <section 
        id="timeline" 
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-16"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold mb-2 text-center">Timeline</h2>
            <div className="w-24 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="relative inline-block mb-5">
              <div className="absolute inset-0 blur-xl bg-pink-500/20 rounded-full"></div>
              <Clock className="text-pink-500 mx-auto" size={64} />
            </div>
            
            <h3 className="text-2xl font-bold mb-3">Hackathon Schedule</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12">
              Join us for an action-packed 24 hours of coding, collaboration, mentorship and innovation!
            </p>
            
            {/* Timeline container */}
            <div className="relative text-left">
              {/* Day 1 Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center mb-6"
              >
                <div className="h-12 w-12 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500">
                  <Calendar className="text-pink-500" size={20} />
                </div>
                <h3 className="text-2xl ml-4 font-bold text-pink-400">Day 1 - 28th March 2025</h3>
              </motion.div>
              
              {/* Vertical line */}
              <div className="absolute top-12 left-6 w-0.5 h-[calc(100%-4rem)] bg-gradient-to-b from-pink-500 via-pink-400 to-pink-500/30"></div>
              
              {/* Day 1 Timeline Items */}
              <div className="ml-10 mb-12">

              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="relative mb-8 pl-8"
                >
                  <div className="absolute left-[-40px] top-0 h-6 w-6 rounded-full bg-gradient-to-r from-pink-600 to-pink-400 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-lg border border-pink-500/30 backdrop-blur-sm">
                    <div className="text-pink-400 font-semibold mb-1">5:00 PM</div>
                    <h4 className="text-lg font-bold mb-2">Arrival of Participants</h4>
                  </div>
                </motion.div>

                {/* Timeline Item 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="relative mb-8 pl-8"
                >
                  <div className="absolute left-[-40px] top-0 h-6 w-6 rounded-full bg-gradient-to-r from-pink-600 to-pink-400 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-lg border border-pink-500/30 backdrop-blur-sm">
                    <div className="text-pink-400 font-semibold mb-1">5:30 PM - 6:00 PM</div>
                    <h4 className="text-lg font-bold mb-2">Inauguration</h4>
                    <p className="text-gray-400 text-sm">Welcome ceremony and introduction to the hackathon</p>
                  </div>
                </motion.div>
                
                {/* Timeline Item 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative mb-8 pl-8"
                >
                  <div className="absolute left-[-40px] top-0 h-6 w-6 rounded-full bg-gradient-to-r from-pink-600 to-pink-400 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-lg border border-pink-500/30 backdrop-blur-sm">
                    <div className="text-pink-400 font-semibold mb-1">6:00 PM - 8:00 PM</div>
                    <h4 className="text-lg font-bold mb-2">First Coding Round</h4>
                    <p className="text-gray-400 text-sm">Teams begin working on their projects</p>
                  </div>
                </motion.div>
                
                {/* Timeline Item 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="relative mb-8 pl-8"
                >
                  <div className="absolute left-[-40px] top-0 h-6 w-6 rounded-full bg-gradient-to-r from-pink-600 to-pink-400 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-lg border border-pink-500/30 backdrop-blur-sm">
                    <div className="text-pink-400 font-semibold mb-1">8:00 PM - 9:00 PM</div>
                    <h4 className="text-lg font-bold mb-2">Dinner</h4>
                    <p className="text-gray-400 text-sm">Refuel and network with other participants</p>
                  </div>
                </motion.div>
                
                {/* Timeline Item 4 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="relative mb-8 pl-8"
                >
                  <div className="absolute left-[-40px] top-0 h-6 w-6 rounded-full bg-gradient-to-r from-pink-600 to-pink-400 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-lg border border-pink-500/30 backdrop-blur-sm">
                    <div className="text-pink-400 font-semibold mb-1">9:00 PM - 10:30 PM</div>
                    <h4 className="text-lg font-bold mb-2">First Mentoring Session</h4>
                    <p className="text-gray-400 text-sm">Expert mentors help teams refine their ideas</p>
                  </div>
                </motion.div>
                
                {/* Timeline Item 5 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="relative mb-8 pl-8"
                >
                  <div className="absolute left-[-40px] top-0 h-6 w-6 rounded-full bg-gradient-to-r from-pink-600 to-pink-400 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-lg border border-pink-500/30 backdrop-blur-sm">
                    <div className="text-pink-400 font-semibold mb-1">10:30 PM - 1:00 AM</div>
                    <h4 className="text-lg font-bold mb-2">Second Coding Round</h4>
                    <p className="text-gray-400 text-sm">Continue development with feedback from mentors</p>
                  </div>
                </motion.div>
              </div>
              
              {/* Day 2 Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center mb-6"
              >
                <div className="h-12 w-12 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500">
                  <Calendar className="text-pink-500" size={20} />
                </div>
                <h3 className="text-2xl ml-4 font-bold text-pink-400">Day 2 - 29th March 2025</h3>
              </motion.div>
              
              {/* Day 2 Timeline Items */}
              <div className="ml-10">
                {/* Timeline Item 6 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="relative mb-8 pl-8"
                >
                  <div className="absolute left-[-40px] top-0 h-6 w-6 rounded-full bg-gradient-to-r from-pink-600 to-pink-400 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-lg border border-pink-500/30 backdrop-blur-sm">
                    <div className="text-pink-400 font-semibold mb-1">1:00 AM - 1:30 AM</div>
                    <h4 className="text-lg font-bold mb-2">Mini Games</h4>
                    <p className="text-gray-400 text-sm">Fun activities to re-energize participants</p>
                  </div>
                </motion.div>
                
                {/* Timeline Item 7 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative mb-8 pl-8"
                >
                  <div className="absolute left-[-40px] top-0 h-6 w-6 rounded-full bg-gradient-to-r from-pink-600 to-pink-400 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-lg border border-pink-500/30 backdrop-blur-sm">
                    <div className="text-pink-400 font-semibold mb-1">1:30 AM - 3:00 AM</div>
                    <h4 className="text-lg font-bold mb-2">Second Mentoring Session</h4>
                    <p className="text-gray-400 text-sm">Additional guidance from domain experts</p>
                  </div>
                </motion.div>
                
                {/* Timeline Item 8 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="relative mb-8 pl-8"
                >
                  <div className="absolute left-[-40px] top-0 h-6 w-6 rounded-full bg-gradient-to-r from-pink-600 to-pink-400 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-lg border border-pink-500/30 backdrop-blur-sm">
                    <div className="text-pink-400 font-semibold mb-1">3:00 AM - 7:30 AM</div>
                    <h4 className="text-lg font-bold mb-2">Final Coding Round</h4>
                    <p className="text-gray-400 text-sm">Complete project development and prepare presentations</p>
                  </div>
                </motion.div>
                
                {/* Timeline Item 9 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="relative mb-8 pl-8"
                >
                  <div className="absolute left-[-40px] top-0 h-6 w-6 rounded-full bg-gradient-to-r from-pink-600 to-pink-400 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-lg border border-pink-500/30 backdrop-blur-sm">
                    <div className="text-pink-400 font-semibold mb-1">7:30 AM - 8:30 AM</div>
                    <h4 className="text-lg font-bold mb-2">Breakfast</h4>
                    <p className="text-gray-400 text-sm">Morning refreshments before final presentations</p>
                  </div>
                </motion.div>
                
                {/* Timeline Item 10 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="relative mb-8 pl-8"
                >
                  <div className="absolute left-[-40px] top-0 h-6 w-6 rounded-full bg-gradient-to-r from-pink-600 to-pink-400 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-lg border border-pink-500/30 backdrop-blur-sm">
                    <div className="text-pink-400 font-semibold mb-1">8:30 AM - 11:00 AM</div>
                    <h4 className="text-lg font-bold mb-2">Final Mentoring & Shortlisting</h4>
                    <p className="text-gray-400 text-sm">Last-minute guidance and selection of finalists</p>
                  </div>
                </motion.div>
                
                {/* Timeline Item 11 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="relative mb-8 pl-8"
                >
                  <div className="absolute left-[-40px] top-0 h-6 w-6 rounded-full bg-gradient-to-r from-pink-600 to-pink-400 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-lg border border-pink-500/30 backdrop-blur-sm">
                    <div className="text-pink-400 font-semibold mb-1">11:00 AM - 11:30 AM</div>
                    <h4 className="text-lg font-bold mb-2">Welcoming Judges</h4>
                    <p className="text-gray-400 text-sm">Introduction of judges and evaluation criteria</p>
                  </div>
                </motion.div>
                
                {/* Timeline Item 12 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="relative mb-8 pl-8"
                >
                  <div className="absolute left-[-40px] top-0 h-6 w-6 rounded-full bg-gradient-to-r from-pink-600 to-pink-400 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-lg border border-pink-500/30 backdrop-blur-sm">
                    <div className="text-pink-400 font-semibold mb-1">11:30 AM - 12:30 PM</div>
                    <h4 className="text-lg font-bold mb-2">Presentations</h4>
                    <p className="text-gray-400 text-sm">Teams present their solutions to the judges</p>
                  </div>
                </motion.div>
                
                {/* Timeline Item 13 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="relative mb-8 pl-8"
                >
                  <div className="absolute left-[-40px] top-0 h-6 w-6 rounded-full bg-gradient-to-r from-pink-600 to-pink-400 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-lg border border-pink-500/30 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="text-pink-400 font-semibold mb-1">12:30 PM - 1:00 PM</div>
                      <h4 className="text-lg font-bold mb-2">Winner Announcement & Prize Distribution</h4>
                      <p className="text-gray-400 text-sm">Celebration of winners and concluding ceremony</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Optimized background elements */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-pink-600 opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-pink-400 opacity-5 blur-3xl"></div>
      </section>

      <section 
        id="problem-statements" 
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-16"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold mb-2">Problem Statements</h2>
            <div className="w-24 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 blur-xl bg-pink-500/20 rounded-full"></div>
              <Code className="text-pink-500 mx-auto mb-6" size={64} />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">Problem Statements Released!</h3>
            
            <p className="text-gray-400 max-w-2xl mx-auto mb-10">
              Our team of experts has crafted innovative health-tech challenges that will push your creativity and technical skills to new heights. 
              Check out the problem statements and start brainstorming your solutions!
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/problem-statements">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-purple-400 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all"
                >
                  <span className="flex items-center">
                    <span className="mr-2">View Problem Statements</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
              < br />
              < br />

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              <div className="bg-black/60 border border-pink-500/20 rounded-lg p-5 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <Heart className="text-pink-500 mb-3 mx-auto" size={28} />
                  <h4 className="font-medium mb-2">Healthcare Access</h4>
                  <p className="text-sm text-gray-400">Solutions that improve healthcare accessibility for all</p>
                </div>
              </div>
              <div className="bg-black/60 border border-pink-500/20 rounded-lg p-5 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <Users className="text-pink-500 mb-3 mx-auto" size={28} />
                  <h4 className="font-medium mb-2">Patient Care</h4>
                  <p className="text-sm text-gray-400">Innovations for improving patient monitoring and care</p>
                </div>
              </div>
              <div className="bg-black/60 border border-pink-500/20 rounded-lg p-5 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <MessageCircle className="text-pink-500 mb-3 mx-auto" size={28} />
                  <h4 className="font-medium mb-2">Mental Wellness</h4>
                  <p className="text-sm text-gray-400">Tech solutions for mental health awareness and support</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-purple-600 opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-purple-400 opacity-5 blur-3xl"></div>
      </section>
      
      <section 
        id="prize-pool" 
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-16"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold mb-2">Prize Pool</h2>
            <div className="w-24 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 blur-xl bg-pink-500/20 rounded-full"></div>
              <Trophy className="text-pink-500 mx-auto" size={64} />
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-pink-600/20 to-pink-400/20 p-6 rounded-2xl border border-pink-500/30 max-w-md mx-auto mb-12"
            >
              <h3 className="text-2xl font-bold mb-2">Total Prize Pool</h3>
              <div className="text-5xl md:text-6xl font-bold my-4 bg-gradient-to-r from-pink-400 to-pink-500 text-transparent bg-clip-text">
                ₹18,000
              </div>
              <p className="text-gray-300 mb-2">Win big and gain recognition for your innovative health-tech solutions</p>
            </motion.div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* First Prize */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-yellow-400 to-yellow-600 w-16 h-16 rounded-full flex items-center justify-center border-4 border-black z-10">
                <span className="text-black text-2xl font-bold">1st</span>
              </div>
              <div className="bg-gradient-to-b from-black to-black/80 rounded-xl border-2 border-yellow-500/50 p-8 pt-12 text-center mt-6 h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text">₹8,000</div>
                  <p className="text-gray-300">First Prize</p>
                  
                  <div className="w-16 h-1 bg-yellow-500/30 mx-auto my-4"></div>
                  
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>Winner Certificates</li>
                    <li>Exclusive Opportunities</li>
                    <li>Recognition at Awards Ceremony</li>
                  </ul>
                </div>
              </div>
            </motion.div>
            
            {/* Second Prize */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-gray-300 to-gray-400 w-16 h-16 rounded-full flex items-center justify-center border-4 border-black z-10">
                <span className="text-black text-2xl font-bold">2nd</span>
              </div>
              <div className="bg-gradient-to-b from-black to-black/80 rounded-xl border-2 border-gray-400/50 p-8 pt-12 text-center mt-6 h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-300 to-gray-400 text-transparent bg-clip-text">₹6,000</div>
                  <p className="text-gray-300">Second Prize</p>
                  
                  <div className="w-16 h-1 bg-gray-400/30 mx-auto my-4"></div>
                  
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>Runner-up Certificates</li>
                    <li>Networking Opportunities</li>
                    <li>Recognition at Awards Ceremony</li>
                  </ul>
                </div>
              </div>
            </motion.div>
            
            {/* Third Prize */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-amber-600 to-amber-800 w-16 h-16 rounded-full flex items-center justify-center border-4 border-black z-10">
                <span className="text-black text-2xl font-bold">3rd</span>
              </div>
              <div className="bg-gradient-to-b from-black to-black/80 rounded-xl border-2 border-amber-700/50 p-8 pt-12 text-center mt-6 h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-700/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-amber-700 text-transparent bg-clip-text">₹4,000</div>
                  <p className="text-gray-300">Third Prize</p>
                  
                  <div className="w-16 h-1 bg-amber-700/30 mx-auto my-4"></div>
                  
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>2nd Runner-Up Certificates</li>
                    <li>Networking Opportunities</li>
                    <li>Recognition at Awards Ceremony</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 text-2xl font-bold mt-10 max-w-2xl mx-auto"
          >
            All participants will receive certificates of participation. Special prizes may be awarded for innovative solutions in specific categories.
          </motion.p>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-pink-600 opacity-5 blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-pink-400 opacity-5 blur-3xl"></div>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
          className="absolute top-1/4 right-1/4 opacity-5 w-96 h-96"
        >
          <div className="w-full h-full border border-pink-500 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 border border-pink-500 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 border border-pink-500 rounded-full"></div>
        </motion.div>
      </section>
      
      {/* Add this comprehensive FAQ section */}
      <section 
        id="faq" 
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-16"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold mb-2">FAQs</h2>
            <div className="w-24 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 blur-xl bg-pink-500/20 rounded-full"></div>
              <HelpCircle className="text-pink-500 mx-auto" size={64} />
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Got questions about HEAL-O-CODE 2.0? Find answers to commonly asked questions below.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            {/* FAQ Item 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="group">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer rounded-xl bg-black border border-pink-500/30 hover:border-pink-500/50 transition-all">
                    <h3 className="text-lg font-semibold">Who can participate in HEAL-O-CODE 2.0?</h3>
                    <div className="text-pink-500 transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-gray-300">
                    HEAL-O-CODE 2.0 is open to all students of PES University. Participants from all branches and years of study are welcome to join the hackathon.
                  </div>
                </details>
              </div>
            </motion.div>
            
            {/* FAQ Item 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="group">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer rounded-xl bg-black border border-pink-500/30 hover:border-pink-500/50 transition-all">
                    <h3 className="text-lg font-semibold">Can I participate solo?</h3>
                    <div className="text-pink-500 transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-gray-300">
                    No, HEAL-O-CODE 2.0 requires participants to form teams of 3-4 members. If you don't have a team, please feel free to contact us! We can help match you with other participants.
                  </div>
                </details>
              </div>
            </motion.div>
            
            {/* FAQ Item 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="group">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer rounded-xl bg-black border border-pink-500/30 hover:border-pink-500/50 transition-all">
                    <h3 className="text-lg font-semibold">Is there any registration fee?</h3>
                    <div className="text-pink-500 transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-gray-300">
                    Yes, there is a registration fee of ₹150 per person. 
                  </div>
                </details>
              </div>
            </motion.div>
            
            {/* FAQ Item 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="group">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer rounded-xl bg-black border border-pink-500/30 hover:border-pink-500/50 transition-all">
                    <h3 className="text-lg font-semibold">What should I bring to the hackathon?</h3>
                    <div className="text-pink-500 transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-gray-300">
                    Participants should bring their own laptops, chargers, any specific hardware needed for your project, and your student ID. We'll provide power outlets, internet connectivity, workspace, and refreshments throughout the event.
                  </div>
                </details>
              </div>
            </motion.div>
            
            {/* FAQ Item 5 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="group">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer rounded-xl bg-black border border-pink-500/30 hover:border-pink-500/50 transition-all">
                    <h3 className="text-lg font-semibold">Do I need prior hackathon experience?</h3>
                    <div className="text-pink-500 transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-gray-300">
                    Not at all! HEAL-O-CODE 2.0 welcomes participants of all experience levels, from beginners to experienced hackers. We'll have mentors available to guide you throughout the event, and workshops to help you build your skills.
                  </div>
                </details>
              </div>
            </motion.div>
            
            {/* FAQ Item 6 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="group">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer rounded-xl bg-black border border-pink-500/30 hover:border-pink-500/50 transition-all">
                    <h3 className="text-lg font-semibold">What kind of projects can I build?</h3>
                    <div className="text-pink-500 transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-gray-300">
                    Your project must address a healthcare or wellness challenge. This can include mobile apps, web applications, hardware solutions, or AI/ML systems. Specific challenge tracks will be announced closer to the event, but all projects should focus on the intersection of technology and healthcare.
                  </div>
                </details>
              </div>
            </motion.div>
            
            {/* FAQ Item 7 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="group">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer rounded-xl bg-black border border-pink-500/30 hover:border-pink-500/50 transition-all">
                    <h3 className="text-lg font-semibold">How will projects be judged?</h3>
                    <div className="text-pink-500 transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-gray-300">
                    Projects will be evaluated based on innovation, technical complexity, adherence to the challenge theme, user experience, and presentation quality. A panel of judges from healthcare and technology industries will review all submissions and select the winners.
                  </div>
                </details>
              </div>
            </motion.div>
            
            
            {/* FAQ Item 8 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="group">
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer rounded-xl bg-black border border-pink-500/30 hover:border-pink-500/50 transition-all">
                    <h3 className="text-lg font-semibold">Will food be provided during the event?</h3>
                    <div className="text-pink-500 transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-gray-300">
                    Yes! We'll provide meals, snacks, and beverages throughout the entire hackathon. If you have any dietary restrictions, please let us know during registration so we can accommodate your needs.
                  </div>
                </details>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-400">
              Have a question that's not answered here? Feel free to reach out!
            </p>
            
          </motion.div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-pink-600 opacity-5 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-pink-400 opacity-5 blur-3xl"></div>
      </section>
      
      <section 
        id="contact" 
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-16"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold mb-2">Contact Us</h2>
            <div className="w-24 h-1 bg-pink-500 mx-auto"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 blur-xl bg-pink-500/20 rounded-full"></div>
              <Mail className="text-pink-500 mx-auto" size={64} />
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Have any questions or need further information? Feel free to reach out to us!
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="bg-black p-6 rounded-xl border border-pink-500/30 hover:border-pink-500/50 transition-all">
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-300">weal.ecc@pes.edu</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="bg-black p-6 rounded-xl border border-pink-500/30 hover:border-pink-500/50 transition-all">
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-gray-300">Club Head: Sameer Beedi</p>
                <p className="text-gray-300">+91 93804 63538</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="bg-black p-6 rounded-xl border border-pink-500/30 hover:border-pink-500/50 transition-all">
                <h3 className="text-lg font-semibold mb-2">Instagram</h3>
                <p className="text-gray-300">ID: weal_ecc</p>
              </div>
            </motion.div>
            
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-pink-600 opacity-5 blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-pink-400 opacity-5 blur-3xl"></div>
      </section>
    </div>
  );
};

export default HackathonWebsite;