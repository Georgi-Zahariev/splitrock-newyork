'use client';

import { useState, FormEvent } from 'react';

interface QuoteFormProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function QuoteForm({ isVisible, onClose }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    landscaping: false,
    outdoorConstruction: false,
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/save-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          services: {
            landscaping: formData.landscaping,
            outdoorConstruction: formData.outdoorConstruction,
          },
          details: formData.details,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('✓ Quote request submitted successfully! We will contact you soon.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          landscaping: false,
          outdoorConstruction: false,
          details: ''
        });
        // Close form after 2 seconds
        setTimeout(() => {
          onClose();
          setSubmitMessage('');
        }, 2000);
      } else {
        setSubmitMessage('✗ Failed to submit request. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('✗ An error occurred. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center pt-20 pb-16">
      <div className={`${isVisible ? 'block' : 'hidden'} bg-white text-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-5xl w-full mx-8 mt-16`}>
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-8 border-b border-gray-700">
          <div className="flex justify-between items-center px-12 md:px-24">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Request a Professional Quote</h3>
              <p className="text-gray-300 text-sm md:text-base">All fields marked with * are required</p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      
        <div className="p-8 md:p-16">
          <div className="px-4 md:px-8">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Contact Information Section */}
              <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Contact Information</h4>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-5 py-4 bg-white border border-gray-300 rounded-lg focus:bg-white focus:border-gray-600 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all text-base"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-5 py-4 bg-white border border-gray-300 rounded-lg focus:bg-white focus:border-gray-600 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all text-base"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                
                <div className="mt-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-4 bg-white border border-gray-300 rounded-lg focus:bg-white focus:border-gray-600 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all text-base"
                    placeholder="john.doe@example.com"
                  />
                </div>
                
                <div className="mt-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Project Address *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-5 py-4 bg-white border border-gray-300 rounded-lg focus:bg-white focus:border-gray-600 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all text-base"
                    placeholder="123 Main Street, Albany, NY 12084"
                  />
                </div>
              </div>

              {/* Service Selection Section */}
              <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Service Type *</h4>
                <div className="space-y-5">
                  <label className="flex items-start p-5 bg-white rounded-lg hover:bg-gray-100 cursor-pointer transition-all border border-gray-200 hover:border-gray-400">
                    <input 
                      type="checkbox" 
                      checked={formData.landscaping}
                      onChange={(e) => setFormData({...formData, landscaping: e.target.checked})}
                      className="mr-5 mt-1 h-5 w-5 text-emerald-600 rounded border-gray-300 focus:ring-2 focus:ring-emerald-500" 
                    />
                    <div>
                      <span className="text-gray-900 font-semibold text-base block mb-1">Landscaping Services</span>
                      <span className="text-gray-500 text-sm">Lawn care, garden design, planting, irrigation</span>
                    </div>
                  </label>
                  <label className="flex items-start p-5 bg-white rounded-lg hover:bg-gray-100 cursor-pointer transition-all border border-gray-200 hover:border-gray-400">
                    <input 
                      type="checkbox" 
                      checked={formData.outdoorConstruction}
                      onChange={(e) => setFormData({...formData, outdoorConstruction: e.target.checked})}
                      className="mr-5 mt-1 h-5 w-5 text-amber-600 rounded border-gray-300 focus:ring-2 focus:ring-amber-500" 
                    />
                    <div>
                      <span className="text-gray-900 font-semibold text-base block mb-1">Outdoor Construction</span>
                      <span className="text-gray-500 text-sm">Patios, decks, pergolas, outdoor structures</span>
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Project Details Section */}
              <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Project Details *</h4>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Describe Your Project</label>
                  <textarea 
                    rows={7} 
                    required
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="w-full px-5 py-4 bg-white border border-gray-300 rounded-lg focus:bg-white focus:border-gray-600 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all resize-none text-base leading-relaxed"
                    placeholder="Please provide details about your project including scope, timeline, budget range, and any specific requirements or preferences..."
                  ></textarea>
                </div>
              </div>
            
              <div className="pt-8 flex flex-col items-center">
                {submitMessage && (
                  <div className={`mb-4 px-6 py-3 rounded-lg text-sm font-semibold ${
                    submitMessage.includes('✓') 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    {submitMessage}
                  </div>
                )}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-bold py-5 px-16 rounded-xl text-base md:text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}