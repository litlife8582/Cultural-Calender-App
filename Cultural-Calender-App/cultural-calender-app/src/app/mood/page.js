"use client";
import { useState } from 'react';
import { festivals } from '../../utils/data';
import FestivalModal from '../../components/FestivalModal'; // Import the modal

export default function MoodPage() {
  const [filter, setFilter] = useState('All');
  const [selectedFestival, setSelectedFestival] = useState(null); // State for modal

  const filteredFestivals = filter === 'All' 
    ? festivals 
    : festivals.filter(f => f.mood.toLowerCase() === filter.toLowerCase());

  return (
    <main>
        <header className="hero" style={{minHeight: "40vh"}}>
            <div className="hero-content">
                <h1>Find Your Vibe</h1>
                <p>Discover festivals based on how you feel today.</p>
            </div>
        </header>

        <section className="container" style={{padding: "4rem 5%"}}>
            {/* Filters */}
            <div className="cta-group" style={{marginBottom: "3rem", justifyContent: "center"}}>
                {['All', 'Celebration', 'Spiritual', 'Harvest', 'Family'].map(mood => (
                    <button 
                        key={mood}
                        className={`btn btn-secondary mood-btn ${filter === mood ? 'active' : ''}`}
                        style={{borderColor: "var(--primary)", color: "var(--text)"}}
                        onClick={() => setFilter(mood)}
                    >
                        {mood}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="features" style={{gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", padding: 0, background: "transparent"}}>
                {filteredFestivals.map((fest, index) => (
                    <div key={index} className="feature-card" onClick={() => setSelectedFestival(fest)} style={{cursor: "pointer"}}>
                        <img src={fest.img} alt={fest.name} style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem'}} />
                        <h3>{fest.name}</h3>
                        <span className={`festival-pill ${fest.mood}`}>{fest.mood}</span>
                        <p style={{marginTop: '1rem'}}>{fest.description}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* The Modal */}
        <FestivalModal festival={selectedFestival} onClose={() => setSelectedFestival(null)} />
    </main>
  );
}