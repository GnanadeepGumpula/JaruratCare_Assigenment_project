import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" fill="white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">JaruratCare</h3>
                <p className="text-sm text-gray-400">Compassion in Action</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Dedicated to providing comprehensive support for gallbladder and biliary tract cancer patients across India.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-400 hover:text-teal-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-teal-400 transition-colors">Our Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Get Involved</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Donate</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Request Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Volunteer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Partner With Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  123 Care Street, Medical District<br />
                  Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-400">+91 1234 567 890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-400">support@jaruratcare.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2026 Jarurat Care. All rights reserved. Built with compassion.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
