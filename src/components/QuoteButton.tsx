interface QuoteButtonProps {
  onClick: () => void;
}

export default function QuoteButton({ onClick }: QuoteButtonProps) {
  return (
    <div className="flex items-center justify-center">
      <button 
        onClick={onClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-10 px-20 rounded-2xl text-2xl leading-relaxed transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 border-2 border-blue-500 hover:border-blue-400"
        style={{ minHeight: '80px', minWidth: '280px' }}
      >
        <span className="block py-2 px-4">Get a Free Quote</span>
      </button>
    </div>
  );
}