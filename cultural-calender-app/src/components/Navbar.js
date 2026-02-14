"use client"; // Required for onClick and useEffect

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [theme, setTheme] = useState('light');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav className="navbar">
      <div className="logo">Culturix</div>
      <ul className="nav-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/mood">Mood Explorer</Link></li>
        <li><Link href="/calendar">Cultural Calendar</Link></li>
        <li><Link href="/regions">Regions</Link></li>
        <li><Link href="/about">About</Link></li>
      </ul>
      <button 
        id="theme-toggle" 
        onClick={toggleTheme}
        aria-label="Toggle Dark Mode"
        style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '1.2rem' }}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </nav>
  );
}