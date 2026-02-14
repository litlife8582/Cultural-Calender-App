export default function AboutPage() {
  return (
    <main>
        <header className="hero" style={{minHeight: "50vh", backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1600')"}}>
            <div className="hero-content">
                <h1>About Culturix</h1>
                <p>Bridging cultures, one festival at a time.</p>
            </div>
        </header>

        <section className="container" style={{padding: "5rem 5%"}}>
            <div style={{maxWidth: "800px", margin: "0 auto", textAlign: "center"}}>
                <h2 style={{fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", color: "var(--primary)", marginBottom: "2rem"}}>Our Mission</h2>
                <p style={{fontSize: "1.2rem", lineHeight: "1.8", marginBottom: "3rem"}}>
                    Culturix is dedicated to preserving and sharing the rich tapestry of global traditions. We believe that understanding the "Cultural DNA" of festivals — their origins, foods, and moods — helps connect people across borders and generations.
                </p>
            </div>
            {/* Features Grid copied from HTML */}
            <div className="features">
                <div className="feature-card">
                    <h3>🌍 Global Reach</h3>
                    <p>Curating festivals from every continent to showcase diversity.</p>
                </div>
                <div className="feature-card">
                    <h3>📚 Educational</h3>
                    <p>Providing deep insights into the history and symbolism of traditions.</p>
                </div>
                <div className="feature-card">
                    <h3>🤝 Community</h3>
                    <p>Building a community of culture enthusiasts and explorers.</p>
                </div>
            </div>
        </section>
    </main>
  );
}