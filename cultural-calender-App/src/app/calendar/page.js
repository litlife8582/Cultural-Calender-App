"use client";
import { useState, useEffect } from 'react';
import { festivals } from '../../utils/data';
import FestivalModal from '../../components/FestivalModal';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [nextFest, setNextFest] = useState(null);
  const [selectedFestival, setSelectedFestival] = useState(null);

  // Countdown Logic
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      // Find the next festival in the future
      const futureFests = festivals
        .map(f => ({ ...f, dateObj: new Date(f.date) }))
        .filter(f => f.dateObj > now)
        .sort((a, b) => a.dateObj - b.dateObj);

      if (futureFests.length > 0) {
        const target = futureFests[0];
        setNextFest(target);
        const diff = target.dateObj - now;
        
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    const timer = setInterval(calculateTime, 1000);
    calculateTime();
    return () => clearInterval(timer);
  }, []);

  // Calendar Grid Logic
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); 
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null); // Empty slots
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const handleMonthChange = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  return (
    <main>
        <div className="hero" style={{minHeight: "40vh"}}>
            <div className="hero-content">
                <h1>Cultural Calendar</h1>
                <p>Track global festivities in real-time.</p>
            </div>
        </div>

        <div className="container" style={{maxWidth: "1200px", margin: "-5rem auto 3rem", padding: "0 5%", position: "relative", zIndex: 2}}>
            {/* Countdown Widget */}
            <div className="countdown-widget">
                <div className="countdown-bg"></div>
                <h2 style={{fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", textTransform: "uppercase"}}>Upcoming Festival</h2>
                <div style={{fontSize: "3rem", fontWeight: 700, marginBottom: "1rem"}}>
                    {nextFest ? nextFest.name : "Loading..."}
                </div>
                <div className="timer-grid">
                    <div className="time-box"><span className="time-val">{timeLeft.days}</span><span className="time-label">Days</span></div>
                    <div className="time-box"><span className="time-val">{timeLeft.hours}</span><span className="time-label">Hrs</span></div>
                    <div className="time-box"><span className="time-val">{timeLeft.minutes}</span><span className="time-label">Min</span></div>
                    <div className="time-box"><span className="time-val">{timeLeft.seconds}</span><span className="time-label">Sec</span></div>
                </div>
            </div>

            {/* Calendar Controls */}
            <div className="calendar-wrapper">
                <div className="calendar-header-nav">
                    <button className="btn btn-secondary" onClick={() => handleMonthChange(-1)} style={{borderColor: "var(--text)", color: "var(--text)"}}>←</button>
                    <h2 style={{fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "var(--primary)"}}>
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button className="btn btn-secondary" onClick={() => handleMonthChange(1)} style={{borderColor: "var(--text)", color: "var(--text)"}}>→</button>
                </div>
                
                {/* Calendar Grid */}
                <div className="calendar-grid">
                    {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                        <div key={d} className="day-header">{d}</div>
                    ))}
                    
                    {getDaysInMonth().map((day, idx) => {
                        if (!day) return <div key={idx} className="calendar-day empty"></div>;
                        
                        // Check for festival on this day
                        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                        const daysFestival = festivals.find(f => f.date === dateStr);

                        return (
                            <div 
                                key={idx} 
                                className={`calendar-day ${daysFestival ? 'has-festival' : ''}`}
                                onClick={() => daysFestival && setSelectedFestival(daysFestival)} // Click handling
                                style={{cursor: daysFestival ? 'pointer' : 'default'}}
                            >
                                <span className="day-number">{day}</span>
                                {daysFestival && (
                                    <span className={`festival-pill ${daysFestival.mood}`}>{daysFestival.name}</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        {/* The Modal */}
        <FestivalModal festival={selectedFestival} onClose={() => setSelectedFestival(null)} />
    </main>
  );
}