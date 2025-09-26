export default function ContactPeople() {
  return (
    
    <div className="space-y-12 flex flex-col items-center">

    {/* Spacer for breathing room */}
        <div className="h-2 md:h-12 lg:h-16"></div>

      <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 hover:border-gray-600 transition-all hover:transform hover:scale-[1.02] w-full max-w-sm text-center">
        <h3 className="text-2xl font-bold mb-3 text-white">Rob</h3>
        <p className="text-gray-400 mb-3 text-lg">Landscaping Specialist</p>
        <p className="text-xl text-white font-semibold">(555) 123-4567</p>
      </div>

      {/* Spacer for breathing room */}
    <div className="h-2 md:h-12 lg:h-16"></div>

      <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 hover:border-gray-600 transition-all hover:transform hover:scale-[1.02] w-full max-w-sm text-center">
        <h3 className="text-2xl font-bold mb-3 text-white">Rob 2.0</h3>
        <p className="text-gray-400 mb-3 text-lg">Outdoor Construction Manager</p>
        <p className="text-xl text-white font-semibold">(555) 987-6543</p>
      </div>

      {/* Spacer for breathing room */}
    <div className="h-2 md:h-12 lg:h-16"></div>
    </div>
  );
}