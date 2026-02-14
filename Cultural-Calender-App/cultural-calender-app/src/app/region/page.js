"use client";
import { useState } from 'react';
import { festivals } from '../../utils/data';
import FestivalModal from '../../components/FestivalModal';

export default function RegionPage() {
  const [filter, setFilter] = useState('All');
  const [selectedFestival, setSelectedFestival] = useState(null);

  const filteredFestivals = filter === 'All' 
    ? festivals 
    : festivals.filter(f => f.region.toLowerCase() === filter.toLowerCase());

  return (
    <main>
        <header className="hero" style={{minHeight: "40vh", backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600')"}}>
            <div className="hero-content">
                <h1>Explore by Region</h1>
                <p>Journey through the diverse cultures of the world.</p>
            </div>
        </header>

        <section className="container" style={{padding: "4rem 5%"}}>
            <div className="cta-group" style={{marginBottom: "3rem", justifyContent: "center"}}>
                {['All', 'Asia', 'Europe', 'Americas', 'Africa'].map(region => (
                    <button 
                        key={region}
                        className={`btn btn-secondary region-btn ${filter === region ? 'active' : ''}`}
                        onClick={() => setFilter(region)}
                        style={{borderColor: "var(--primary)", color: "var(--text)"}}
                    >
                        {region}
                    </button>
                ))}
            </div>

            <div className="features" style={{gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", padding: 0, background: "transparent"}}>
                {filteredFestivals.map((fest, index) => (
                    <div key={index} className="feature-card" onClick={() => setSelectedFestival(fest)} style={{cursor: "pointer"}}>
                        <img src={fest.img} alt={fest.name} style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem'}} />
                        <h3>{fest.name}</h3>
                        <p><strong>Origin:</strong> {fest.origin}</p>
                        <p>{fest.description}</p>
                    </div>
                ))}
            </div>
        </section>

        <FestivalModal festival={selectedFestival} onClose={() => setSelectedFestival(null)} />
    </main>
  );
}