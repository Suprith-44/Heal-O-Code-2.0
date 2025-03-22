import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, FileText, Globe, Eye, Microscope, Database, MessageSquare, Smartphone, Fingerprint } from 'lucide-react';

const ProblemStatements = () => {
  // Add this useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-md border-b border-pink-600">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://i.ibb.co/9kNWRD27/weal2.png" alt="WEAL Logo" className="h-8 w-8 mr-3" />
            <div className="text-xl font-bold text-pink-500">HEAL-O-CODE 2.0</div>
          </div>
          <Link 
            to="/" 
            className="text-pink-400 hover:text-pink-300 transition-colors flex items-center"
          >
            <ArrowLeft className="mr-2" size={18} />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-2">Problem Statements</h1>
          <div className="w-24 h-1 bg-pink-500 mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Choose from these innovative health-tech challenges and create solutions that can transform healthcare!
          </p>
        </motion.div>
        
        {/* Main problem statements */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {/* Problem 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-black/60 border border-pink-500/30 rounded-lg p-6 backdrop-blur-sm h-full"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mr-4">
                <Brain className="text-pink-500" size={24} />
              </div>
              <h2 className="text-xl font-bold">Alzheimer's Memory Activities App</h2>
            </div>
            <div className="mb-3 text-pink-300 text-sm font-semibold">Domain: Mobile App Development</div>
            <p className="text-gray-300 mb-4">
              This mobile app supports adults with Alzheimer's by offering memory-stimulating games, personalized reminders, and emotional support. It includes mood tracking, virtual companionship, and AI-powered insights to monitor cognitive health. Caregivers can stay connected through shared calendars and reports. The app enhances independence and quality of life for users and their families.
            </p>
            <div className="bg-pink-500/10 p-3 rounded-lg mt-auto">
              <h3 className="font-semibold mb-2 text-pink-300">Key Requirements:</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                <li>Intuitive UI designed for elderly users</li>
                <li>Progressive memory exercises with difficulty adaptation</li>
                <li>Caregiver dashboard with progress monitoring</li>
                <li>Reminder system with voice and visual cues</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="bg-black/60 border border-pink-500/30 rounded-lg p-6 backdrop-blur-sm h-full"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mr-4">
                <Fingerprint className="text-pink-500" size={24} />
              </div>
              <h2 className="text-xl font-bold">IoT Sign Language Translator</h2>
            </div>
            <div className="mb-3 text-pink-300 text-sm font-semibold">Domain: IoT & AI</div>
            <p className="text-gray-300 mb-4">
              An IoT-powered sign language translation device enables seamless communication for mute individuals using smart finger sensors and a wristband equipped with motion sensors. It accurately recognizes gestures using AI models, converting them into text or speech in real-time, enhancing accessibility and fostering independence.
            </p>
            <div className="bg-pink-500/10 p-3 rounded-lg mt-auto">
              <h3 className="font-semibold mb-2 text-pink-300">Key Requirements:</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                <li>Wearable sensors with low latency processing</li>
                <li>Machine learning for gesture recognition</li>
                <li>Text-to-speech conversion in multiple languages</li>
                <li>Mobile app integration for settings and updates</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-black/60 border border-pink-500/30 rounded-lg p-6 backdrop-blur-sm h-full"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mr-4">
                <Eye className="text-pink-500" size={24} />
              </div>
              <h2 className="text-xl font-bold">Glaucoma & ROP Screening System</h2>
            </div>
            <div className="mb-3 text-pink-300 text-sm font-semibold">Domain: Computer Vision & Deep Learning</div>
            <p className="text-gray-300 mb-4">
              An advanced system for early detection and screening of Glaucoma using Fundus photos and RNFL (OCT), combined with automated time tracking of ROP screening. The solution provides automated reviews and sends notifications to doctors upon failure to review cases, ensuring timely intervention and treatment for patients with eye conditions.
            </p>
            <div className="bg-pink-500/10 p-3 rounded-lg mt-auto">
              <h3 className="font-semibold mb-2 text-pink-300">Key Requirements:</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                <li>AI model for analyzing retinal images</li>
                <li>Automated screening workflow management</li>
                <li>Alert system for missed or delayed reviews</li>
                <li>Integration with ophthalmology equipment</li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="bg-black/60 border border-pink-500/30 rounded-lg p-6 backdrop-blur-sm h-full"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mr-4">
                <MessageSquare className="text-pink-500" size={24} />
              </div>
              <h2 className="text-xl font-bold">Dyslexic Communication AI Assistant</h2>
            </div>
            <div className="mb-3 text-pink-300 text-sm font-semibold">Domain: Mobile App & Generative AI</div>
            <p className="text-gray-300 mb-4">
              This mobile app features an AI-powered chatbot designed to assist dyslexic learners in enhancing their communication skills through interactive and personalized learning. It offers real-time speech recognition, text-to-speech feedback, and phonetic correction to improve pronunciation and fluency, fostering confidence and language development.
            </p>
            <div className="bg-pink-500/10 p-3 rounded-lg mt-auto">
              <h3 className="font-semibold mb-2 text-pink-300">Key Requirements:</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                <li>Dyslexia-friendly UI with customizable text display</li>
                <li>AI chatbot with natural language understanding</li>
                <li>Adaptive learning pathways</li>
                <li>Speech recognition with pronunciation guidance</li>
              </ul>
            </div>
          </motion.div>

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-black/60 border border-pink-500/30 rounded-lg p-6 backdrop-blur-sm h-full"
            >
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mr-4">
                <FileText className="text-pink-500" size={24} />
                </div>
                <h2 className="text-xl font-bold">Medical Documentation & Summarization System</h2>
            </div>
            <div className="mb-3 text-pink-300 text-sm font-semibold">Domain: NLP, Computer Vision, Blockchain & Generative AI</div>
            <p className="text-gray-300 mb-4">
                This comprehensive system addresses multiple documentation challenges in healthcare. It uses NLP to summarize complex medical records, OCR and computer vision to interpret handwritten prescriptions, and AI to streamline post-surgery documentation. Medical professionals can efficiently create reports while the system ensures accuracy and compliance. All records are securely stored on blockchain, allowing both doctors and patients to access simplified summaries of medical information.
            </p>
            <div className="bg-pink-500/10 p-3 rounded-lg mt-auto">
                <h3 className="font-semibold mb-2 text-pink-300">Key Requirements:</h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-1">
                <li>Computer vision for handwritten prescription recognition</li>
                <li>Patient-friendly summary generation with medical terminology explanation</li>
                <li>Secure blockchain storage with proper access controls</li>
                <li>Integration with existing Electronic Health Record systems</li>
                </ul>
            </div>
            </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-black/60 border border-pink-500/30 rounded-lg p-6 backdrop-blur-sm h-full"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mr-4">
                <Microscope className="text-pink-500" size={24} />
              </div>
              <h2 className="text-xl font-bold">AI Esophageal Cancer Prediction</h2>
            </div>
            <div className="mb-3 text-pink-300 text-sm font-semibold">Domain: Computer Vision & Deep Learning</div>
            <p className="text-gray-300 mb-4">
              This system uses artificial intelligence to predict esophageal cancer by analyzing endoscopy images. It helps medical professionals identify potential malignancies at early stages when they're most treatable, improving patient outcomes through faster and more accurate diagnoses during routine endoscopic examinations.
            </p>
            <div className="bg-pink-500/10 p-3 rounded-lg mt-auto">
              <h3 className="font-semibold mb-2 text-pink-300">Key Requirements:</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                <li>Deep learning model for cancer detection in images</li>
                <li>Real-time analysis during endoscopic procedures</li>
                <li>Visual highlight of suspicious areas</li>
                <li>Integration with hospital imaging systems</li>
              </ul>
            </div>
          </motion.div>

          {/* Problem 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-black/60 border border-pink-500/30 rounded-lg p-6 backdrop-blur-sm h-full"
            >
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                    <path d="M12 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"></path>
                    <path d="M6 9a4 4 0 1 0 0 8"></path>
                    <path d="M14 3a2 2 0 0 0-4 0"></path>
                    <path d="M14 21a2 2 0 0 1-4 0"></path>
                </svg>
                </div>
                <h2 className="text-xl font-bold">Maternal Care Connect</h2>
            </div>
            <div className="mb-3 text-pink-300 text-sm font-semibold">Domain: Mobile App Development</div>
            <p className="text-gray-300 mb-4">
                Addressing high rates of maternal mortality and poor access to quality antenatal care in rural areas, this solution provides a mobile application that connects pregnant women with critical healthcare resources. The app offers prenatal care information, connects users with healthcare providers, tracks pregnancy progress, and facilitates timely hospital referrals. It includes an emergency SOS button for urgent situations, helping bridge the healthcare gap in underserved communities.
            </p>
            <div className="bg-pink-500/10 p-3 rounded-lg mt-auto">
                <h3 className="font-semibold mb-2 text-pink-300">Key Requirements:</h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-1">
                <li>Offline-capable educational resources for prenatal care</li>
                <li>GPS-enabled SOS function with nearest hospital locator</li>
                <li>Pregnancy tracking with customized alerts and reminders</li>
                <li>Low-bandwidth telemedicine capabilities for remote consultations</li>
                <li>Local language support for improved accessibility</li>
                </ul>
            </div>
            </motion.div>
                    
          {/* Problem 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-black/60 border border-pink-500/30 rounded-lg p-6 backdrop-blur-sm h-full"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mr-4">
                <Globe className="text-pink-500" size={24} />
              </div>
              <h2 className="text-xl font-bold">Remote Healthcare Access Platform</h2>
            </div>
            <div className="mb-3 text-pink-300 text-sm font-semibold">Domain: Web/Mobile App Development</div>
            <p className="text-gray-300 mb-4">
              Many people in rural or remote locations lack access to timely medical advice, leading to undiagnosed or worsening health conditions. With limited healthcare infrastructure and specialists, this platform helps people in remote areas receive basic medical guidance, assess symptom severity, and connect with healthcare providers through low-bandwidth connections.
            </p>
            <div className="bg-pink-500/10 p-3 rounded-lg mt-auto">
              <h3 className="font-semibold mb-2 text-pink-300">Key Requirements:</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                <li>Low-bandwidth functionality for poor connectivity areas</li>
                <li>Offline mode with essential healthcare information</li>
                <li>Telemedicine capabilities with minimal data usage</li>
                <li>Symptom checker with severity assessment</li>
              </ul>
            </div>
          </motion.div>
          
          {/* Problem 4 */}
          
          
          {/* Problem 5 */}
          
          
          {/* Problem 6 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="bg-black/60 border border-pink-500/30 rounded-lg p-6 backdrop-blur-sm h-full"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mr-4">
                <Database className="text-pink-500" size={24} />
              </div>
              <h2 className="text-xl font-bold">Blockchain-Powered Healthcare Insights</h2>
            </div>
            <div className="mb-3 text-pink-300 text-sm font-semibold">Domain: Blockchain & Generative AI</div>
            <p className="text-gray-300 mb-4">
              This solution creates AI tools that extract actionable insights from Electronic Health Records (EHR) stored in blockchain, helping doctors make informed decisions faster. It includes systems to analyze patient histories, predict adverse drug reactions, provide personalized treatment recommendations, and predict post-surgical complications based on preoperative data.
            </p>
            <div className="bg-pink-500/10 p-3 rounded-lg mt-auto">
              <h3 className="font-semibold mb-2 text-pink-300">Key Requirements:</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                <li>Secure blockchain storage of medical records</li>
                <li>AI-powered predictive analytics</li>
                <li>Treatment recommendation engine</li>
                <li>Patient-specific risk assessment</li>
              </ul>
            </div>
          </motion.div>
          
          {/* Problem 7 */}
          
          
          {/* Problem 8 */}
          
          
          {/* Problem 9 */}
          
          {/* Open Innovation - Full Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="md:col-span-3 bg-gradient-to-br from-black/90 to-purple-900/20 border-2 border-purple-500 rounded-lg p-8 backdrop-blur-sm shadow-lg shadow-purple-500/20 relative overflow-hidden"
          >
            {/* Background glow effects */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-600 opacity-10 blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-pink-400 opacity-10 blur-3xl -z-10"></div>

            <div className="flex flex-col md:flex-row md:items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-purple-500/30 flex items-center justify-center mr-4 mb-4 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-purple-100 mb-2">Open Innovation</h2>
                <div className="w-20 h-1 bg-purple-500"></div>
                <div className="mt-3 text-purple-300 text-sm font-semibold">Domain: Any Healthcare Technology</div>
              </div>
            </div>

            <p className="text-gray-200 mb-6 text-lg text-center mx-auto leading-relaxed px-4 md:px-10">
              Have an innovative healthcare solution that doesn't fit into the categories above? We encourage you to propose your own problem statement and solution! Identify a significant healthcare challenge and develop a technological solution that addresses it in a novel way. This track is designed for teams with unique ideas that can transform healthcare delivery, patient care, or medical research.
            </p>

            <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-purple-500/10 p-5 rounded-lg border border-purple-500/30">
                <h3 className="font-semibold mb-3 text-purple-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                Submission Requirements
                </h3>
                <ul className="list-disc pl-8 text-gray-200 space-y-2 max-w-2xl mx-auto">
                <li>Clear identification of a specific healthcare problem</li>
                <li>Detailed explanation of how your solution addresses the problem</li>
                <li>Technical feasibility assessment with implementation plan</li>
                <li>Evidence of potential impact and scalability</li>
                <li>Innovative approach that differentiates from existing solutions</li>
                </ul>
            </div>
            </div>
            
            {/* Special highlight badge */}
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-400 text-white font-bold py-2 px-4 rounded-full text-sm shadow-lg transform">
              Be Creative!
            </div>

          </motion.div>
        </div>
        
      </div>
      
      {/* Background elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-pink-600 opacity-5 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-pink-400 opacity-5 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-30 blur-3xl"></div>
    </div>
  );
};

export default ProblemStatements;