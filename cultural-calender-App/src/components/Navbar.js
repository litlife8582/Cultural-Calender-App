"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className="navbar">
        <Link href="/" className="logo">Culturix</Link>
        <ul className="nav-links">
            <li><Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link href="/mood" className={pathname === '/mood' ? 'active' : ''}>Mood Explorer</Link></li>
            <li><Link href="/calendar" className={pathname === '/calendar' ? 'active' : ''}>Cultural Calendar</Link></li>
            <li><Link href="/region" className={pathname === '/region' ? 'active' : ''}>Regions</Link></li>
            <li><Link href="/about" className={pathname === '/about' ? 'active' : ''}>About</Link></li>
        </ul>
        <button id="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? '🌓' : '☀️'}
        </button>
    </nav>
  );
}