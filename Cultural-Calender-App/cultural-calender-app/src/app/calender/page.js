"use client"; // Required for interactivity

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar'; // Adjust path if needed

// --- THE DATA ---
const festivalsDatabase = {
  "01-01": { name: "New Year's Day", region: "global", mood: "celebratory", description: "Global celebration of the new year with fireworks and festivities.", origin: "Ancient Roman festival of Janus.", foods: ["Champagne", "Grapes"], symbolism: "New beginnings, hope", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800" },
  "01-06": { name: "Epiphany", region: "europe", mood: "spiritual", description: "Christian feast celebrating the visit of the Magi.", origin: "Early Christian tradition.", foods: ["King cake"], symbolism: "Revelation, wisdom", image: "https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=800" },
  "01-14": { name: "Pongal", region: "asia", mood: "harvest", description: "Tamil harvest festival dedicated to the Sun God.", origin: "Ancient Dravidian celebration over 2000 years old.", foods: ["Sweet Pongal", "Sugarcane"], symbolism: "Thanksgiving, prosperity", image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800" },
  "02-14": { name: "Valentine's Day", region: "global", mood: "celebratory", description: "Celebration of love and affection.", origin: "Roman Lupercalia festival.", foods: ["Chocolate", "Wine"], symbolism: "Love, romance", image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800" },
  "03-01": { name: "Holi", region: "asia", mood: "celebratory", description: "Hindu festival of colors celebrating spring.", origin: "Ancient Hindu tradition.", foods: ["Gujiya", "Thandai"], symbolism: "Joy, color, renewal", image: "https://images.unsplash.com/photo-1583391733975-5e8c0b944d49?w=800" },
  "03-17": { name: "St. Patrick's Day", region: "europe", mood: "celebratory", description: "Irish cultural celebration.", origin: "5th century Irish saint.", foods: ["Corned beef", "Cabbage"], symbolism: "Irish heritage, luck", image: "https://images.unsplash.com/photo-1489925814383-8ed3bb92e865?w=800" },
  "04-13": { name: "Songkran", region: "asia", mood: "celebratory", description: "Thai New Year with water festival.", origin: "Traditional Thai celebration.", foods: ["Khao chae", "Thai sweets"], symbolism: "Cleansing, blessing", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800" },
  "05-05": { name: "Cinco de Mayo", region: "americas", mood: "celebratory", description: "Mexican victory celebration.", origin: "Battle of Puebla 1862.", foods: ["Tacos", "Mole"], symbolism: "Pride, victory", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800" },
  "08-15": { name: "Independence Day India", region: "asia", mood: "celebratory", description: "Indian independence from Britain.", origin: "Independence 1947.", foods: ["Tricolor sweets", "Ladoos"], symbolism: "Freedom, sovereignty", image: "https://images.unsplash.com/photo-1597059719746-f3b8fbb1c3ba?w=800" },
  "10-31": { name: "Halloween", region: "global", mood: "celebratory", description: "Celtic harvest festival.", origin: "Ancient Samhain festival.", foods: ["Candy", "Pumpkin pie"], symbolism: "Spirits, harvest", image: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=800" },
  "11-01": { name: "Day of the Dead", region: "americas", mood: "remembrance", description: "Mexican celebration honoring deceased.", origin: "Ancient Aztec tradition.", foods: ["Pan de muerto", "Sugar skulls"], symbolism: "Remembrance, life", image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800" },
  "11-11": { name: "Diwali", region: "asia", mood: "celebratory", description: "Hindu festival of lights.", origin: "Ancient Hindu celebration.", foods: ["Ladoos", "Barfi"], symbolism: "Light over darkness", image: "https://images.unsplash.com/photo-1606563557299-74c2f13c2369?w=800" },
  "12-25": { name: "Christmas", region: "global", mood: "celebratory", description: "Christian celebration of Jesus' birth.", origin: "4th century Christian tradition.", foods: ["Roast turkey", "Plum cake"], symbolism: "Joy, giving, peace", image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800" },
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterMood, setFilterMood] = useState('all');
  const [selectedFestival, setSelectedFestival] = useState(null);
  
  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [nextFestivalName, setNextFestivalName] = useState("Loading...");

  // --- COUNTDOWN LOGIC ---
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let nextDate = null;
      let nextFest = null;
      
      const sortedKeys = Object.keys(festivalsDatabase).sort();

      // Find next festival
      for (let key of sortedKeys) {
        const [m, d] = key.split('-').map(Number);
        const festDate = new Date(currentYear, m - 1, d);
        if (festDate >= now) {
          nextDate = festDate;
          nextFest = festivalsDatabase[key];
          break;
        }
      }

      // If no more festivals this year, loop to start of next year
      if (!nextFest) {
        const [m, d] = sortedKeys[0].split('-').map(Number);
        nextDate = new Date(currentYear + 1, m - 1, d);
        nextFest = festivalsDatabase[sortedKeys[0]];
      }

      setNextFestivalName(nextFest.name);

      const diff = nextDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        });
      }
    };

    const timer = setInterval(calculateTime, 1000);
    calculateTime(); // Run immediately

    return () => clearInterval(timer);
  }, []);

  // --- CALENDAR GRID LOGIC ---
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
    
    const days = [];
    
    // Empty slots for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push({ type: 'empty', key: `empty-${i}` });
    }

    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateKey = `${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const festival = festivalsDatabase[dateKey];
      
      // Apply filters
      let showFestival = false;
      if (festival) {
        const matchRegion = filterRegion === 'all' || festival.region === filterRegion;
        const matchMood = filterMood === 'all' || festival.mood === filterMood;
        if (matchRegion && matchMood) showFestival = true;
      }

      days.push({
        type: 'day',
        day: d,
        festival: showFestival ? festival : null,
        isToday: new Date().toDateString() === new Date(year, month, d).toDateString(),
        key: `day-${d}`
      });
    }
    return days;
  };

  const calendarDays = getDaysInMonth(currentDate);

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  return (
    <>
      <Navbar /> {/* Reusing your Navbar component */}

      <div className="calendar-hero">
        <h1>Cultural Calendar</h1>
      </div>

      <div className="filters-section">
        <div className="filters">
          <select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}>
            <option value="all">All Regions</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="americas">Americas</option>
            <option value="africa">Africa</option>
            <option value="global">Global</option>
          </select>

          <select value={filterMood} onChange={(e) => setFilterMood(e.target.value)}>
            <option value="all">All Moods</option>
            <option value="spiritual">Spiritual</option>
            <option value="celebratory">Celebratory</option>
            <option value="harvest">Harvest</option>
            <option value="remembrance">Remembrance</option>
          </select>

          <button onClick={() => setCurrentDate(new Date())}>📍 Today</button>
        </div>

        <div className="filter-status">
            Showing {filterMood === 'all' ? '' : filterMood} festivals {filterRegion === 'all' ? '' : `in ${filterRegion}`}
        </div>

        {/* COUNTDOWN TIMER */}
        <div className="countdown-container">
            <div style={{textAlign: 'center'}}>
                <h2>⏰ Next Festival</h2>
                <div className="countdown-festival">{nextFestivalName}</div>
            </div>
            <div className="countdown-timer">
                {Object.entries(timeLeft).map(([label, value]) => (
                    <div key={label} className="time-box">
                        <span className="number">{String(value).padStart(2, '0')}</span>
                        <span className="label" style={{textTransform: 'capitalize'}}>{label}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* CALENDAR GRID */}
      <div className="calendar-wrapper">
        <div className="calendar-nav">
            <button onClick={() => handleMonthChange(-1)}>←</button>
            <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            <button onClick={() => handleMonthChange(1)}>→</button>
        </div>

        <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="day-header">{day}</div>
            ))}
            
            {calendarDays.map((item) => (
                <div 
                    key={item.key} 
                    className={`calendar-day ${item.type === 'empty' ? 'empty' : ''} ${item.isToday ? 'today' : ''} ${item.festival ? 'has-festival' : ''}`}
                    onClick={() => item.festival && setSelectedFestival(item.festival)}
                >
                    {item.type === 'day' && (
                        <>
                            <div className="day-number">{item.day}</div>
                            {item.festival && (
                                <>
                                    <div className="festival-name">{item.festival.name}</div>
                                    <span className="festival-tag">{item.festival.mood}</span>
                                </>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedFestival && (
        <div className="modal-overlay" onClick={() => setSelectedFestival(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="modal-close" onClick={() => setSelectedFestival(null)}>×</span>
                
                <div className="modal-hero" style={{backgroundImage: `url('${selectedFestival.image}')`}}>
                    <div className="modal-header-text">
                        <h2>{selectedFestival.name}</h2>
                        <span className="festival-tag">{selectedFestival.region.toUpperCase()}</span>
                    </div>
                </div>

                <div className="modal-body">
                    <h3>📖 About</h3>
                    <p>{selectedFestival.description}</p>
                    <br />
                    <h3>🧬 Cultural DNA</h3>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '10px'}}>
                        <div style={{background: 'rgba(212,175,55,0.1)', padding: '15px', borderRadius: '8px'}}>
                            <h4>🏛️ Origin</h4>
                            <p>{selectedFestival.origin}</p>
                        </div>
                        <div style={{background: 'rgba(212,175,55,0.1)', padding: '15px', borderRadius: '8px'}}>
                            <h4>🍽️ Foods</h4>
                            <p>{selectedFestival.foods.join(', ')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
}