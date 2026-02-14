import Navbar from '../components/Navbar'; 
import "./globals.css"; 

export const metadata = {
  title: "Culturix | Home",
  description: "Explore Culture Through Time & Emotion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}