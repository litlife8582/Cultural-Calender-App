import Link from 'next/link';

export default function Home() {
  return (
    <main>
        <header className="hero">
            <div className="hero-content">
                <h1>Culturix</h1>
                <p>Explore Culture Through Time & Emotion</p>
                <div className="hero-description">
                    <p>Discover the "Cultural DNA" of festivals worldwide. From ancient rituals to modern celebrations, navigate heritage through moods and regions.</p>
                </div>
                <div className="cta-group">
                    <Link href="/calendar" className="btn btn-primary">Explore Calendar</Link>
                    <Link href="/mood" className="btn btn-secondary">Find Your Mood</Link>
                </div>
            </div>
        </header>

        <section className="features">
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