"use client";

import { useState, useEffect } from 'react';

const festivalsDatabase = {
  "01-01": { name: "New Year's Day", region: "global", mood: "celebratory", description: "Global celebration of the new year with fireworks and festivities.", origin: "Ancient Roman festival of Janus.", foods: ["Champagne", "Grapes"], symbolism: "New beginnings, hope", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800" },
  "01-06": { name: "Epiphany", region: "europe", mood: "spiritual", description: "Christian feast celebrating the visit of the Magi.", origin: "Early Christian tradition.", foods: ["King cake"], symbolism: "Revelation, wisdom", image: "https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=800" },
  "01-14": { name: "Pongal", region: "asia", mood: "harvest", description: "Tamil harvest festival dedicated to the Sun God.", origin: "Ancient Dravidian celebration.", foods: ["Sweet Pongal", "Sugarcane"], symbolism: "Thanksgiving, prosperity", image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800" },
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
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [nextFestivalName, setNextFestivalName] = useState("Loading...");

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let nextDate = null;
      let nextFest = null;
      
      const sortedKeys = Object.keys(festivalsDatabase).sort();

      for (let key of sortedKeys) {
        const [m, d] = key.split('-').map(Number);
        const festDate = new Date(currentYear, m - 1, d);
        if (festDate >= now) {
          nextDate = festDate;
          nextFest = festivalsDatabase[key];
          break;
        }
      }

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
    calculateTime();
    return () => clearInterval(timer);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push({ type: 'empty', key: `empty-${i}` });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateKey = `${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const festival = festivalsDatabase[dateKey];
      
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

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const calendarDays = getDaysInMonth(currentDate);

  return (
    <>

      <div className="calendar-hero">
        <h1>Cultural Calendar</h1>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <div className="countdown-container text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Next Up: {nextFestivalName}</h2>
          <div className="flex justify-center gap-6 text-xl">
            <div><span className="block text-4xl font-bold">{timeLeft.days}</span> Days</div>
            <div><span className="block text-4xl font-bold">{timeLeft.hours}</span> Hrs</div>
            <div><span className="block text-4xl font-bold">{timeLeft.minutes}</span> Min</div>
            <div><span className="block text-4xl font-bold">{timeLeft.seconds}</span> Sec</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-4">
            <select className="p-2 rounded border bg-transparent" value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}>
              <option value="all">All Regions</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="americas">Americas</option>
              <option value="global">Global</option>
            </select>
            <select className="p-2 rounded border bg-transparent" value={filterMood} onChange={(e) => setFilterMood(e.target.value)}>
              <option value="all">All Moods</option>
              <option value="spiritual">Spiritual</option>
              <option value="celebratory">Celebratory</option>
              <option value="harvest">Harvest</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => handleMonthChange(-1)} className="p-2">←</button>
            <h2 className="text-2xl font-semibold">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <button onClick={() => handleMonthChange(1)} className="p-2">→</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-bold p-2 opacity-50">{day}</div>
          ))}
          {calendarDays.map((item) => (
            <div 
              key={item.key} 
              onClick={() => item.festival && setSelectedFestival(item.festival)}
              className={`min-h-[120px] border rounded-lg p-2 transition-all 
                ${item.type === 'empty' ? 'bg-transparent border-none' : 'hover:border-yellow-500 cursor-pointer'}
                ${item.isToday ? 'border-blue-500 bg-blue-50/10' : ''}
                ${item.festival ? 'bg-yellow-500/10 border-yellow-500/50' : ''}`}
            >
              <span className="text-sm font-semibold">{item.day}</span>
              {item.festival && (
                <div className="mt-2 text-xs font-bold text-yellow-600 truncate">
                  ✨ {item.festival.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedFestival && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full overflow-hidden relative">
            <button 
              onClick={() => setSelectedFestival(null)}
              className="absolute top-4 right-4 text-2xl z-10 text-white bg-black/20 rounded-full w-10 h-10"
            >
              ×
            </button>
            <img src={selectedFestival.image} alt={selectedFestival.name} className="w-full h-64 object-cover" />
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-2">{selectedFestival.name}</h2>
              <p className="text-yellow-600 font-semibold mb-4 capitalize">{selectedFestival.region} • {selectedFestival.mood}</p>
              <p className="mb-6 opacity-80">{selectedFestival.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-bold">Traditions</h4>
                  <p>{selectedFestival.symbolism}</p>
                </div>
                <div>
                  <h4 className="font-bold">Foods</h4>
                  <p>{selectedFestival.foods.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}