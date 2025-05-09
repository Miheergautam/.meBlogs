export default function ComingSoonPage() {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-neutral-800 via-red-900 to-neutral-800 text-white px-4">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Coming Soon</h1>
          <p className="text-lg font-light">We’re working hard to bring something amazing. Stay tuned!</p>
          <div className="mt-8">
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    );
  }
  