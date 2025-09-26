'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems, companyInfo } from '@/lib/data';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = navItems.map(item => item.href.substring(1));
      let currentSection = 'home';

      // Check sections from bottom to top to get the most visible one
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is considered active if its top is above middle of screen
          if (rect.top <= window.innerHeight / 2) {
            currentSection = section;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      // Scroll to section for anchor links
      const element = document.querySelector(href) as HTMLElement;
      if (element) {
        const navbarHeight = 80; // Account for fixed navbar
        const elementTop = element.offsetTop - navbarHeight;
        window.scrollTo({
          top: elementTop,
          behavior: 'smooth'
        });
      }
    } else {
      // Navigate to page for regular links
      window.location.href = href;
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          'sticky top-0 z-50 transition-all duration-300 backdrop-blur-lg',
          isScrolled
            ? 'bg-white/95 shadow-lg border-b border-gray-200/50'
            : 'bg-white/90 shadow-md'
        )}
      >
        {/* Clean Navbar Container */}
        <div className="max-w-full mx-auto">
          <div className="flex items-center px-16 py-6">
            
            {/* Simple Logo Section - Fixed Width with Right Margin */}
            <div className="flex items-center w-80">
              <div className="ml-16">
                <button 
                  className="flex items-center group"
                  onClick={() => handleNavigation('#home')}
                >
                  {/* Company Logo */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 transition-all duration-200 group-hover:bg-gray-200 shadow-md">
                    <img 
                      src="/images/logo.jpeg" 
                      alt="SplitRock Logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* Centered Navigation Components */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-4">
              <div className="flex items-center space-x-4 justify-center">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={cn(
                      'relative px-8 py-4 text-base font-medium transition-all duration-200 rounded-xl min-w-[180px] text-center',
                      activeSection === item.href.substring(1)
                        ? 'text-white bg-gray-700 shadow-lg hover:bg-gray-800'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-md'
                    )}
                  >
                    <span className="whitespace-nowrap block leading-relaxed">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="w-80 flex justify-end">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-4 rounded-lg transition-colors text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>

          </div>
        </div>

        {/* Clean Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-lg shadow-lg border-t border-gray-200/50">
            <div className="max-w-7xl mx-auto px-8 py-6">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={cn(
                      'block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-200',
                      activeSection === item.href.substring(1)
                        ? 'text-white bg-gray-700 shadow-md'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-sm'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;