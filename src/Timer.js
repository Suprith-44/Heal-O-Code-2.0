import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Code } from 'lucide-react';

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

const Timer = () => {
  const [loading, setLoading] = useState(true);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  // Set the event end deadline - Updated to March 29, 2025 12:00 PM
  const deadline = new Date("March 29, 2025 12:00:00").getTime();
  
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
    <div className="bg-black text-white min-h-screen">
      {/* Hide the default cursor */}
      <style jsx global>{`
        body {
          cursor: none;
        }
      `}</style>
      
      {/* Custom cursor component */}
      <CustomCursor />
      
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
          
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/50 to-black pointer-events-none"></div>
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
            <div className="text-sm uppercase tracking-wider mb-3 font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-500">
              Hackathon ends in:
            </div>
            
            {/* Updated date display with new deadline */}
            <div className="mb-5">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-block px-4 sm:px-6 py-2 rounded-full bg-gradient-to-r from-pink-600/20 to-pink-400/20 border border-pink-500/50"
              >
                <span className="text-white font-medium text-sm sm:text-base">
                  <span className="text-pink-400 mr-1 sm:mr-2">⏰</span>
                  <span className="text-lg sm:text-xl font-bold text-white">29</span>
                  <sup className="text-xs sm:text-sm text-pink-300">th</sup> 
                  <span className="text-lg sm:text-xl font-bold ml-1 text-white">March 2025</span>
                  <span className="text-pink-300 ml-1 sm:ml-2 font-light text-sm sm:text-base">12:00 PM</span>
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

        </motion.div>
      </section>
    </div>
  );
};

export default Timer;