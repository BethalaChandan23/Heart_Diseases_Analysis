import React from 'react';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-2 rounded-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">Heart Disease Analysis</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              A comprehensive healthcare analytics platform providing insights for medical professionals, 
              policy makers, and individuals to understand and manage heart disease risks.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="/dr-sharma" className="text-gray-300 hover:text-blue-400 transition-colors">Clinical Dashboard</a>
              </li>
              <li>
                <a href="/ramesh" className="text-gray-300 hover:text-blue-400 transition-colors">Policy Dashboard</a>
              </li>
              <li>
                <a href="/anita" className="text-gray-300 hover:text-blue-400 transition-colors">Personal Health</a>
              </li>
            </ul>
          </div>

          {/* Contact & Disclaimer */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Important Notice</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              This platform is for educational and informational purposes only. 
              Always consult qualified healthcare professionals for medical advice.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-700 rounded-lg hover:bg-blue-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-lg hover:bg-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-lg hover:bg-blue-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 Heart Disease Analysis Platform. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Medical Disclaimer: This tool does not provide medical advice. Consult a healthcare provider for diagnosis and treatment.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;