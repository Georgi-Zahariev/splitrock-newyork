interface QuoteFormProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function QuoteForm({ isVisible, onClose }: QuoteFormProps) {
  return (
    <div className="flex justify-center items-center pt-20 pb-16">
      <div className={`${isVisible ? 'block' : 'hidden'} bg-white text-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-5xl w-full mx-8 mt-16`}>
        <div className="bg-gray-50 px-16 py-12 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-4xl font-bold text-gray-900">Request a Quote</h3>
            <button 
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      
        <div className="p-20 flex justify-center">
          <div className="max-w-3xl w-full">
            <form className="space-y-10">
              <div className="grid md:grid-cols-2 gap-10 pl-20">
                <div className="text-left">
                  <label className="block text-xl font-semibold text-gray-700 mb-4">Name *</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all text-xl"
                    placeholder="Your full name"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-xl font-semibold text-gray-700 mb-4">Phone *</label>
                  <input 
                    type="tel" 
                    className="w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all text-xl"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              
              <div className="text-left pl-20">
                <label className="block text-xl font-semibold text-gray-700 mb-4">Email *</label>
                <input 
                  type="email" 
                  className="w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all text-xl"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="text-left pl-20">
                <label className="block text-xl font-semibold text-gray-700 mb-4">Address</label>
                <input 
                  type="text" 
                  className="w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all text-xl"
                  placeholder="Project address"
                />
              </div>
            
              <div className="text-left pl-20">
                <label className="block text-xl font-semibold text-gray-700 mb-6">Type of Service *</label>
                <div className="space-y-6">
                  <label className="flex items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors">
                    <input type="checkbox" className="mr-6 h-6 w-6 text-gray-600 rounded border-gray-300" />
                    <span className="text-gray-700 font-medium text-xl">Landscaping</span>
                  </label>
                  <label className="flex items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors">
                    <input type="checkbox" className="mr-6 h-6 w-6 text-gray-600 rounded border-gray-300" />
                    <span className="text-gray-700 font-medium text-xl">Outdoor Construction</span>
                  </label>
                </div>
              </div>
              
              <div className="text-left pl-20">
                <label className="block text-xl font-semibold text-gray-700 mb-4">Project Description</label>
                <textarea 
                  rows={6} 
                  className="w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all resize-none text-xl"
                  placeholder="Tell us about your project vision, timeline, and any specific requirements..."
                ></textarea>
              </div>
            
            <div className="pt-8 flex justify-center">
              <button 
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-10 px-24 rounded-xl text-2xl leading-relaxed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ minHeight: '80px', minWidth: '320px' }}
              >
                <span className="block py-2 px-4">Submit Quote Request</span>
              </button>
            </div>
        </form>
        </div>
      </div>
      </div>
    </div>
  );
}