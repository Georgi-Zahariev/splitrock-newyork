export default function ContactPeople() {
  return (
    
    <div className="space-y-12 flex flex-col items-center">

    {/* Spacer for breathing room */}
        <div className="h-2 md:h-12 lg:h-16"></div>

      <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 hover:border-gray-600 transition-all hover:transform hover:scale-[1.02] w-full max-w-sm text-center">
        <h3 className="text-2xl font-bold mb-3 text-white">Robert Evangelista</h3>
        <p className="text-gray-400 mb-3 text-lg">Co-Owner | Decking & Outdoor Structures Specialist</p>
        <p className="text-xl text-white font-semibold mb-2">(585) 455-9512</p>
        <p className="text-gray-300 text-sm">constructionsplitrock@gmail.com</p>
      </div>

      {/* Spacer for breathing room */}
    <div className="h-2 md:h-12 lg:h-16"></div>

      <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 hover:border-gray-600 transition-all hover:transform hover:scale-[1.02] w-full max-w-sm text-center">
        <h3 className="text-2xl font-bold mb-3 text-white">Aidan Jones</h3>
        <p className="text-gray-400 mb-3 text-lg">Co-Owner | Landscaping Specialist</p>
        <p className="text-xl text-white font-semibold mb-2">(585) 857-5360</p>
        <p className="text-gray-300 text-sm">splitrockscapes@gmail.com</p>
      </div>

      {/* Spacer for breathing room */}
    <div className="h-2 md:h-12 lg:h-16"></div>
    </div>
  );
}