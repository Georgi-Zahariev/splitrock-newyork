'use client';

import Image from 'next/image';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import ContactPeople from '../components/ContactPeople';
import QuoteButton from '../components/QuoteButton';
import QuoteForm from '../components/QuoteForm';

export default function Home() {
  const [isQuoteFormVisible, setIsQuoteFormVisible] = useState(false);

  const handleQuoteButtonClick = () => {
    setIsQuoteFormVisible(true);
    // Scroll to form after a brief delay to allow it to render
    setTimeout(() => {
      const form = document.querySelector('[data-quote-form]');
      if (form) {
        form.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100);
  };

  const handleQuoteFormClose = () => {
    setIsQuoteFormVisible(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Account for fixed navbar
      const elementTop = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen md:min-h-[105vh] flex items-center justify-center relative overflow-hidden
                  pb-8 md:pb-16"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-green-50/30"></div>

        <div className="relative z-10 text-center px-6 md:px-8 max-w-6xl mx-auto">
          <div>
            <h1 className="mt-0 text-2xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-2 md:mb-6 tracking-tight">
              SplitRock
            </h1>

            <p className="text-sm md:text-3xl text-gray-700 font-light leading-relaxed px-2 md:px-4">
              Landscaping and Outdoor Construction Services
            </p>
          </div>

          {/* Spacer for breathing room */}
          <div className="h-2 md:h-12 lg:h-16"></div>

          {/* Service Cards in Hero */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Landscaping Service */}
            <div
              onClick={() => scrollToSection('landscaping')}
              className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2"
            >
              <div className="aspect-[5/4] overflow-hidden relative">
                <img
                  src="/images/landscaping.jpeg"
                  alt="Landscaping Services"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-10 relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2"></div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 group-hover:text-emerald-600 transition-all duration-300 tracking-tight">
                    LANDSCAPING
                  </h2>
                </div>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium group-hover:text-gray-700 transition-colors">
                  Transform your outdoor space with cutting-edge design
                </p>
                <div className="mt-6 flex items-center justify-center text-emerald-600 group-hover:text-emerald-700 transition-colors">
                  <span className="text-sm font-bold tracking-wider uppercase">Explore Services</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Outdoor Construction Service */}
            <div
              onClick={() => scrollToSection('outdoor')}
              className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2"
            >
              <div className="aspect-[5/4] overflow-hidden relative">
                <img
                  src="/images/outdoor.jpeg"
                  alt="Outdoor Construction Services"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-10 relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2"></div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 group-hover:text-amber-600 transition-all duration-300 tracking-tight">
                    CONSTRUCTION
                  </h2>
                </div>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium group-hover:text-gray-700 transition-colors">
                  Premium outdoor construction that elevates your property
                </p>
                <div className="mt-6 flex items-center justify-center text-amber-600 group-hover:text-amber-700 transition-colors">
                  <span className="text-sm font-bold tracking-wider uppercase">Explore Services</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Landscaping Section */}
      <section id="landscaping" className="min-h-screen py-20 bg-white flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Landscaping Services
            </h2>
            <div className="flex justify-center">
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed text-center">
                We create beautiful, sustainable landscapes that enhance your property's value and your quality of life.
              </p>
            </div>
          </div>
          
          {/* Spacer for breathing room */}
          <div className="h-8 md:h-12"></div>
          
          <div className="flex items-center justify-center w-full">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div className="space-y-10">
                <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-20 rounded-3xl border border-emerald-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] min-h-[160px] flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-emerald-700 transition-colors text-center">Garden Design & Installation</h3>
                  <p className="text-gray-600 leading-relaxed font-medium text-lg text-center">Professional garden planning and installation services that bring your vision to life.</p>
                </div>
                <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-20 rounded-3xl border border-blue-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] min-h-[160px] flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-blue-700 transition-colors text-center">Lawn Care & Maintenance</h3>
                  <p className="text-gray-600 leading-relaxed font-medium text-lg text-center">Complete lawn care solutions for healthy, beautiful grass year-round.</p>
                </div>
                <div className="group relative overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50 py-12 px-20 rounded-3xl border border-teal-100 hover:border-teal-200 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] min-h-[160px] flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-teal-700 transition-colors text-center">Irrigation Systems</h3>
                  <p className="text-gray-600 leading-relaxed font-medium text-lg text-center">Efficient watering solutions that keep your landscape thriving.</p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="rounded-3xl overflow-hidden shadow-2xl max-w-lg">
                  <img 
                    src="/images/landscaping.jpeg" 
                    alt="Landscaping Services" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outdoor Construction Section */}
      <section id="outdoor" className="min-h-screen py-20 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Outdoor Construction
            </h2>
            <div className="flex justify-center">
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed text-center">
                Custom outdoor construction projects that extend your living space and add value to your property.
              </p>
            </div>
          </div>
          
          {/* Spacer for breathing room */}
          <div className="h-8 md:h-12"></div>
          
          <div className="flex items-center justify-center w-full">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div className="flex justify-center">
                <div className="rounded-3xl overflow-hidden shadow-2xl max-w-lg">
                  <img 
                    src="/images/outdoor.jpeg" 
                    alt="Outdoor Construction Services" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-10">
                <div className="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-20 rounded-3xl border border-orange-100 hover:border-orange-200 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] min-h-[160px] flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-orange-700 transition-colors text-center">Patios & Decks</h3>
                  <p className="text-gray-600 leading-relaxed font-medium text-lg text-center">Custom patios and decks for outdoor entertainment and relaxation.</p>
                </div>
                <div className="group relative overflow-hidden bg-gradient-to-br from-stone-50 to-gray-50 py-12 px-20 rounded-3xl border border-stone-100 hover:border-stone-200 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] min-h-[160px] flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-stone-700 transition-colors text-center">Retaining Walls</h3>
                  <p className="text-gray-600 leading-relaxed font-medium text-lg text-center">Functional and beautiful retaining wall solutions for your property.</p>
                </div>
                <div className="group relative overflow-hidden bg-gradient-to-br from-red-50 to-orange-50 py-12 px-20 rounded-3xl border border-red-100 hover:border-red-200 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] min-h-[160px] flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-red-700 transition-colors text-center">Outdoor Kitchens</h3>
                  <p className="text-gray-600 leading-relaxed font-medium text-lg text-center">Complete outdoor kitchen design and construction for culinary excellence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-900 text-white flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-10 w-full">
          {/* Spacer for breathing room */}
          <div className="h-2 md:h-12 lg:h-16"></div>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-10">
              Ready to Transform Your Space?
            </h2>
            <div className="flex justify-center mb-12">
              <p className="text-xl text-gray-300 max-w-4xl leading-relaxed text-center">
                Contact us today for a free consultation and let's bring your outdoor vision to life.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center mb-20">
            <div className="grid lg:grid-cols-2 gap-24 items-center max-w-7xl w-full">
              {/* Contact People Component */}
              <ContactPeople />

              {/* Quote Button Component */}
              <QuoteButton onClick={handleQuoteButtonClick} />
            </div>
            
          </div>

          {/* Quote Form Component */}
          <div data-quote-form>
            <QuoteForm isVisible={isQuoteFormVisible} onClose={handleQuoteFormClose} />
          </div>
          {/* Spacer for breathing room */}
          <div className="h-2 md:h-12 lg:h-16"></div>
        </div>
      </section>
    </div>
  );
}
