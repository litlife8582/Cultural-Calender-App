import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* HERO SECTION */}
      <header className="hero">
        <div className="hero-content">
          <h1>Culturix</h1>
          <p>Explore Culture Through Time & Emotion</p>
          <div className="hero-description">
            <p>Discover the "Cultural DNA" of festivals worldwide. From ancient rituals to modern celebrations, navigate the heritage of humanity through moods and regions.</p>
          </div>
          <div className="hero-buttons">
            <Link href="/calendar" className="cta-btn primary-btn">
              Explore Calendar
            </Link>
            <Link href="/mood" className="cta-btn secondary-btn">
              Find Your Mood
            </Link>
          </div>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="features container">
        <div className="feature-card">
          <h3>🧬 Cultural DNA</h3>
          <p>Deep dive into the origins, food, and symbolism behind every tradition.</p>
        </div>
        <div className="feature-card">
          <h3>🎭 Mood Mapping</h3>
          <p>Filter experiences by how you feel: Spiritual, Celebratory, or Harvest-bound.</p>
        </div>
        <div className="feature-card">
          <h3>⏳ Real-time Tracking</h3>
          <p>Stay updated with live countdowns to major global cultural events.</p>
        </div>
      </section>
    </main>
  );
}