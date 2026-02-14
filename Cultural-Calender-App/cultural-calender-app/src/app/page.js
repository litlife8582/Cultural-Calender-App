import Link from 'next/link';
import Navbar from '../components/Navbar'; // Adjust path if needed

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-br from-black to-gray-900 text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600')] opacity-20 bg-cover bg-center"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">
            Culturix
          </h1>
          <h2 className="text-2xl md:text-3xl mb-6 font-light">
            Explore Culture Through Time & Emotion
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Discover the "Cultural DNA" of festivals worldwide. From ancient rituals to modern celebrations, navigate the heritage of humanity through moods and regions.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/calendar" className="px-8 py-3 bg-red-700 hover:bg-red-800 text-white rounded-full font-bold transition-all transform hover:scale-105">
              Explore Calendar
            </Link>
            <Link href="/mood" className="px-8 py-3 border border-white hover:bg-white hover:text-black rounded-full font-bold transition-all">
              Find Your Mood
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-red-500 transition-colors">
            <div className="text-4xl mb-4">🧬</div>
            <h3 className="text-xl font-bold mb-2">Cultural DNA</h3>
            <p className="opacity-70">Deep dive into the origins, food, and symbolism behind every tradition.</p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-red-500 transition-colors">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="text-xl font-bold mb-2">Mood Mapping</h3>
            <p className="opacity-70">Filter experiences by how you feel: Spiritual, Celebratory, or Harvest-bound.</p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-red-500 transition-colors">
            <div className="text-4xl mb-4">⏳</div>
            <h3 className="text-xl font-bold mb-2">Real-time Tracking</h3>
            <p className="opacity-70">Stay updated with live countdowns to major global cultural events.</p>
          </div>
        </div>
      </section>
    </main>
  );
}