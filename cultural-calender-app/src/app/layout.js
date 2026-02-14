import Navbar from '../components/Navbar'; // Import the new component
import './globals.css'; 

export const metadata = {
  title: 'Culturix | Home',
  description: 'Explore Culture Through Time & Emotion',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* Now handled by the component */}
        
        {children}

        <footer className="footer">
          <div className="footer-links">
            <a href="/regions">Regions</a>
            <a href="/about">Our Story</a>
          </div>
          <p>&copy; 2026 Culturix Hackathon Project. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}