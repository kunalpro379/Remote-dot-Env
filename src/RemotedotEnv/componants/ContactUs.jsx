import React from 'react';
import {  X, Info  } from 'lucide-react';

const ContactUs = (
    
) => {
    return (
        <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            Contact Us
          </h2>
          <form className="max-w-2xl mx-auto">
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    );
}
export default ContactUs;