interface QuoteFormProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function QuoteForm({ isVisible, onClose }: QuoteFormProps) {
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
            <form className="space-y-8">
              {/* Contact Information Section */}
              <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Contact Information</h4>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-5 py-4 bg-white border border-gray-300 rounded-lg focus:bg-white focus:border-gray-600 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all text-base"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
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
                    className="w-full px-5 py-4 bg-white border border-gray-300 rounded-lg focus:bg-white focus:border-gray-600 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all text-base"
                    placeholder="john.doe@example.com"
                  />
                </div>
                
                <div className="mt-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Project Address *</label>
                  <input 
                    type="text" 
                    required
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
                    <input type="checkbox" className="mr-5 mt-1 h-5 w-5 text-emerald-600 rounded border-gray-300 focus:ring-2 focus:ring-emerald-500" />
                    <div>
                      <span className="text-gray-900 font-semibold text-base block mb-1">Landscaping Services</span>
                      <span className="text-gray-500 text-sm">Lawn care, garden design, planting, irrigation</span>
                    </div>
                  </label>
                  <label className="flex items-start p-5 bg-white rounded-lg hover:bg-gray-100 cursor-pointer transition-all border border-gray-200 hover:border-gray-400">
                    <input type="checkbox" className="mr-5 mt-1 h-5 w-5 text-amber-600 rounded border-gray-300 focus:ring-2 focus:ring-amber-500" />
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
                    className="w-full px-5 py-4 bg-white border border-gray-300 rounded-lg focus:bg-white focus:border-gray-600 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all resize-none text-base leading-relaxed"
                    placeholder="Please provide details about your project including scope, timeline, budget range, and any specific requirements or preferences..."
                  ></textarea>
                </div>
              </div>
            
              <div className="pt-8 flex justify-center">
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-bold py-5 px-16 rounded-xl text-base md:text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  Submit Quote Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}