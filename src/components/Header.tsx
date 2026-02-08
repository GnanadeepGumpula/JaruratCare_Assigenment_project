import { motion } from 'framer-motion';
import { Heart, Phone, Mail } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
                Jarurat Care
              </h1>
              <p className="text-xs text-gray-600">Compassion in Action</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
              About Us
            </a>
            <a href="#services" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
              Services
            </a>
            <a href="#contact" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <a
              href="tel:+911234567890"
              className="hidden sm:flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">Emergency</span>
            </a>
            <a
              href="#support"
              className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Donate Now
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
