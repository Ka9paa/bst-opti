export function Hero() {
  return (
    <div className="bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl mb-6">
            Premium Graphic Packs for Designers
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Discover thousands of high-quality design assets, illustrations, and templates 
            to elevate your creative projects.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Explore Collection
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
              View Free Packs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
