"use client";

export default function FestivalModal({ festival, onClose }) {
  if (!festival) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>&times;</span>
        
        {/* Modal Hero Image */}
        <div className="modal-hero" style={{backgroundImage: `url('${festival.img}')`}}>
            <div className="modal-header-text">
                <h2 style={{fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", marginBottom: "0.5rem"}}>{festival.name}</h2>
                <span className={`festival-pill ${festival.mood}`} style={{marginRight: "10px"}}>{festival.mood}</span>
                <span style={{background: "white", color: "black", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "bold"}}>{festival.region.toUpperCase()}</span>
            </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
            <h3 style={{color: "var(--primary)", marginBottom: "0.5rem"}}>📖 About</h3>
            <p style={{marginBottom: "2rem", fontSize: "1.1rem"}}>{festival.description}</p>
            
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem"}}>
                <div style={{background: "rgba(0,0,0,0.03)", padding: "1rem", borderRadius: "8px", borderLeft: "4px solid var(--primary)"}}>
                    <h4 style={{marginBottom: "0.5rem"}}>🏛️ Origin</h4>
                    <p>{festival.origin}</p>
                </div>
                <div style={{background: "rgba(0,0,0,0.03)", padding: "1rem", borderRadius: "8px", borderLeft: "4px solid #e9c46a"}}>
                    <h4 style={{marginBottom: "0.5rem"}}>🍽️ Foods</h4>
                    <p>{festival.foods.join(', ')}</p>
                </div>
                <div style={{background: "rgba(0,0,0,0.03)", padding: "1rem", borderRadius: "8px", borderLeft: "4px solid #2a9d8f"}}>
                    <h4 style={{marginBottom: "0.5rem"}}>🎭 Symbolism</h4>
                    <p>{festival.symbolism}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}