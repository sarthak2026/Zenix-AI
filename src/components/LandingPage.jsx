import React, { useState } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import '../App.css';
import emailjs from 'emailjs-com';

const LandingPage = ({ onStart }) => {
  const [popupMessage, setPopupMessage] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_q9urego',
        'template_j1hcuil',
        e.target,
        'iYG_rs8ETHZ7BjM2C'
      )
      .then(
        (result) => {
          setPopupMessage('Message sent successfully!');
          setPopupVisible(true);
        },
        (error) => {
          setPopupMessage('Failed to send the message, please try again.');
          setPopupVisible(true);
        }
      );

    e.target.reset();
  };


  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="bg-gray-900 text-gray-100 font-sans">

      <nav
        id="navbar"
        className="floating-navbar fixed top-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-between navbar-visible bg-gradient-to-r from-gray-800 to-gray-800 text-white px-16 py-4 w-[90%] rounded-lg shadow-xl"
      >

        <div className="text-2xl font-bold text-cyan-400 flex items-center mr-9">Zenix AI</div>
        <div className="hidden md:flex space-x-8 text-gray-200">
          <a href="#home" className="navbar-link transition">Home</a>
          <a href="#benefits" className="navbar-link transition">Key Benefits</a>
          <a href="#insights" className="navbar-link transition">AI Insights</a>
          <a href="#contact" className="navbar-link transition">Contact</a>
        </div>
        <button
          className="text-white bg-pink-600 font-semibold py-3 px-8 rounded-full transition duration-300 shadow md:shadow-lg button-hover"
          onClick={onStart}
        >
          Get Started
        </button>
      </nav>


      <section id="home" className="gradient-bg min-h-screen flex items-center text-center text-white pt-24">
        <div className="container mx-auto px-6 py-16">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">Meet Zenix AI</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">An AI-powered companion that’s smart, intuitive, and futuristic.</p>
          <button
            className="text-white bg-pink-600 font-semibold py-3 px-8 rounded-full transition duration-300 shadow md:shadow-lg button-hover"
            onClick={onStart}
          >
            Start Now
          </button>
        </div>
      </section>
      <section id="benefits" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-12 text-center">Why Choose Zenix AI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="p-8 bg-gradient-to-tr from-gray-800 via-gray-900 to-gray-800 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
            <div className="text-fuchsia-400 mb-4">
              <i className="fas fa-chart-line text-4xl"></i>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Enhanced Productivity</h3>
            <p className="text-gray-300">Optimize your day-to-day tasks with Zenix AI, designed to streamline your workflow and maximize efficiency.</p>
          </div>

          <div className="p-8 bg-gradient-to-tr from-gray-800 via-gray-900 to-gray-800 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
            <div className="text-fuchsia-400 mb-4">
              <i className="fas fa-comments text-4xl"></i>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Intelligent Interaction</h3>
            <p className="text-gray-300">Engage in natural, meaningful conversations with an AI that understands your unique preferences and style.</p>
          </div>

          <div className="p-8 bg-gradient-to-tr from-gray-800 via-gray-900 to-gray-800 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
            <div className="text-fuchsia-400 mb-4">
              <i className="fas fa-clock text-4xl"></i>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Always Available</h3>
            <p className="text-gray-300">24/7 availability means Zenix AI is ready to assist you at any time, day or night, wherever you are.</p>
          </div>
        </div>
      </section>


      <section id="insights" className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-400 mb-12">AI Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-100">
          <div className="bg-gradient-to-r from-pink-600 to-indigo-500 p-8 rounded-lg shadow-lg transform transition-all hover:scale-105">
            <i className="fas fa-robot text-5xl text-white mb-4"></i>
            <h3 className="text-2xl font-semibold mb-4 text-white">The Future of AI</h3>
            <p>AI is transforming industries worldwide, with applications in healthcare, education, finance, and more. Zenix AI aims to bring this advanced technology into everyday interactions.</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-lg shadow-lg transform transition-all hover:scale-105">
            <i className="fas fa-shield-alt text-5xl text-white mb-4"></i>
            <h3 className="text-2xl font-semibold mb-4 text-white">Ethical AI</h3>
            <p>Our AI is built with a focus on ethical guidelines, ensuring privacy, security, and fairness in all interactions to provide a trustworthy user experience.</p>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-pink-600 p-8 rounded-lg shadow-lg transform transition-all hover:scale-105">
            <i className="fas fa-brain text-5xl text-white mb-4"></i>
            <h3 className="text-2xl font-semibold mb-4 text-white">Continuous Learning</h3>
            <p>Zenix AI is constantly learning from user interactions to improve and adapt, making your experience better over time with every conversation.</p>
          </div>
        </div>
      </section>


      <section id="contact" className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-10 md:mb-0 text-center md:text-left">

          <div className="flex items-center justify-start mb-4">
            <img
              src="src/assets/icon.png"
              alt="Contact Icon"
              className="w-8 h-8 mr-2"
            />
            <h2 className="text-4xl font-bold text-fuchsia-500">Get in Touch</h2>
          </div>

          <p className="text-gray-200 text-lg mb-4">Got questions or feedback? We're just a message away!</p>
          <p className="text-gray-300 text-base mb-4 leading-relaxed">Our team is dedicated to making sure your experience with Zenix AI is seamless and enjoyable.</p>
          <p className="text-fuchsia-400 font-semibold">We’ll get back to you shortly.</p>
        </div>

        <div className="w-full md:w-1/2 bg-gradient-to-br from-cyan-700 to-fuchsia-700 p-8 rounded-lg shadow-2xl">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Contact Us</h3>
          <form className="space-y-4" onSubmit={sendEmail}>
            <div>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                placeholder="Your Message"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:bg-gradient-to-l"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>


      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-8 rounded-lg text-center text-white shadow-lg w-1/2 max-w-md">
            <h2 className="text-3xl font-semibold text-cyan-400">Zenix Says</h2>
            <p className="text-lg mt-4">{popupMessage}</p>
            <button
              onClick={closePopup}
              className="mt-6 px-6 py-2 bg-pink-700 rounded-lg text-white font-semibold hover:bg-pink-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}


      <footer className="bg-gray-800 text-gray-400 py-10">
        <div className="container mx-auto px-6 flex justify-center items-center">
          <p>&copy; 2023 Zenix AI. All rights reserved.</p>
          <p className="mx-4">|</p>
          <p>
            Developed by <span className="text-cyan-400 font-semibold">Mr. Sarthak Singh</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

