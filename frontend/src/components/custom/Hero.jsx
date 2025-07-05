import React from 'react';
import { Button } from '../ui/button'; // Assuming your button component
import { Link } from 'react-router-dom';
// If you want to use framer-motion for animations:
// import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-blue-100 via-blue-50 to-teal-100">
        {/* Subtle background pattern/texture */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23a1a1aa\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '40px 40px' }}></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center relative z-10">
          {/* Using motion.h1 for a subtle fade-in animation, if framer-motion is installed */}
          {/* <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
          > */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Plan Smarter with{' '}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-600 drop-shadow-lg">
              AI Travel
            </span>
          </h1>
          {/* </motion.h1> */}

          {/* <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-700 max-w-3xl mx-auto mb-10 opacity-90"
          > */}
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10 opacity-90">
            Get your **dream itinerary** in seconds — powered by AI. No stress, no hassle, just perfect trips every time.
          </p>
          {/* </motion.p> */}

          {/* <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-5"
          > */}
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link to="/create-trip">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 py-3 rounded-full text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
              >
                Start Planning
              </Button>
            </Link>
           
          </div>
          {/* </motion.div> */}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose AI Travel?</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-14">
          Instantly generate **personalized itineraries** that include hotels, attractions, and travel tips — all customized to your preferences and budget.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {[
            { icon: '🚀', title: 'Instant Plans', desc: 'Save hours of research with one-click trip generation. Get your itinerary in minutes, not days!' },
            { icon: '💰', title: 'Budget Smart', desc: 'Discover hotel options and activities perfectly tailored to your budget and group type, ensuring value.' },
            { icon: '😌', title: 'No Hassle', desc: 'AI handles all the complex details, from logistics to unique suggestions. You just enjoy the journey, stress-free.' },
          ].map((item, i) => (
            // Consider using motion.div for individual card animations
            // <motion.div 
            //   key={i} 
            //   initial={{ opacity: 0, y: 50 }} 
            //   whileInView={{ opacity: 1, y: 0 }} 
            //   viewport={{ once: true, amount: 0.5 }}
            //   transition={{ duration: 0.7, delay: i * 0.15 }}
            //   className="bg-blue-50 p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transform transition duration-300 ease-in-out hover:-translate-y-2"
            // >
            <div key={i} className="bg-blue-50 p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transform transition duration-300 ease-in-out hover:-translate-y-2">
              <div className="text-5xl mb-4">{item.icon}</div> {/* Larger, more prominent icon */}
              <h3 className="text-2xl font-bold text-blue-700 mb-3">{item.title}</h3>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
            // </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-100 text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-14">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {[
            { step: '01', title: 'Enter Trip Info', desc: 'Tell us your destination, preferred budget, travel days, and what kind of travel style you enjoy (adventure, relaxation, etc.).' },
            { step: '02', title: 'AI Builds Itinerary', desc: 'Our advanced AI gets to work, crafting a detailed, day-by-day plan complete with activities, dining suggestions, and lodging options.' },
            { step: '03', title: 'View & Save Trip', desc: 'Explore your customized itinerary, make any adjustments, or simply save it. Not quite right? Regenerate for a fresh plan!' },
          ].map((item, i) => (
            // Consider using motion.div for individual step animations
            // <motion.div 
            //   key={i} 
            //   initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} 
            //   whileInView={{ opacity: 1, x: 0 }} 
            //   viewport={{ once: true, amount: 0.5 }}
            //   transition={{ duration: 0.8, delay: i * 0.2 }}
            //   className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg text-left transform transition duration-300 ease-in-out hover:shadow-xl"
            // >
            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg text-left transform transition duration-300 ease-in-out hover:shadow-xl">
              <div className="text-5xl font-extrabold text-blue-600 mb-4 opacity-75">{item.step}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
            // </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section (New) */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Plan Your Next Adventure?</h2>
        <p className="text-xl max-w-2xl mx-auto mb-10 opacity-90">
          Join thousands of happy travelers who trust AI Travel to create unforgettable journeys.
        </p>
        <Link to="/create-trip">
          <Button
            size="lg"
            className="px-10 py-4 rounded-full text-xl font-bold bg-white text-blue-700 hover:bg-gray-100 shadow-xl transform transition duration-300 ease-in-out hover:scale-105"
          >
            Start Your Journey Now
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-md text-gray-500 border-t bg-white">
        © {new Date().getFullYear()} AI Travel Planner. All rights reserved. Made with ❤️ and AI.
      </footer>
    </div>
  );
};

export default Hero;