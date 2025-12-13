// Backup del therapy.jsx anterior
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import TopNav from './components/TopNav';
import Footer from './components/Footer';

export default function Therapy() {
  const navigate = useNavigate();
  const [currentPhrase, setCurrentPhrase] = useState(0);

  const phrases = [
    { text: "Tu salud mental importa", color: "#FFFFFF" },
    { text: "Cuida tu mente, cuida tu vida", color: "#FFFFFF" },
    { text: "Terapia accesible para todos", color: "#FFFFFF" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <TopNav showMenu={true} hideUser={true} internalPage={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Content here was simplified version */}
      </main>

      <Footer />
    </div>
  );
}
