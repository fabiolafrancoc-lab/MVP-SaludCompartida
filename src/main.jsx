import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Page3 from './page3.jsx'
import Page4 from './page4.jsx'
import Telemedicine from './telemedicine.jsx'
import Pharmacy from './pharmacy.jsx'
import Therapy from './therapy.jsx'
import Savings from './savings.jsx'
import Terms from './terms.jsx'
import Privacy from './privacy.jsx'
import Contact from './contact.jsx'
import Rating from './rating.jsx'
import Account from './account.jsx'
import Blog from './pages/Blog'
import Migrant from './migrant.jsx'
import MigrantContact from './migrantcontact.jsx'
import WhatsAppDemo from './pages/WhatsAppDemo.jsx'
import { UserProvider } from './contexts/UserContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/page3" element={<Page3 />} /> {/* 👈 Page3 (código entrada) */}
          <Route path="/page4" element={<Page4 />} /> {/* 👈 Dashboard */}
          <Route path="/migrant" element={<Migrant />} /> {/* 👈 Dashboard para Migrantes (USA2025) */}
          <Route path="/migrantcontact" element={<MigrantContact />} /> {/* 👈 Contacto para Migrantes */}
          <Route path="/telemedicine" element={<Telemedicine />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/therapy" element={<Therapy />} /> {/* 👈 Terapia Psicológica */}
          <Route path="/savings" element={<Savings />} /> {/* 👈 Mis Ahorros */}
          <Route path="/blog" element={<Blog />} /> {/* 👈 Blog de Salud */}
          <Route path="/terms" element={<Terms />} /> {/* 👈 Términos y Condiciones */}
          <Route path="/privacy" element={<Privacy />} /> {/* 👈 Aviso de Privacidad */}
          <Route path="/contact" element={<Contact />} /> {/* 👈 Contáctanos */}
          <Route path="/rating" element={<Rating />} /> {/* 👈 Calificación */}
          <Route path="/account" element={<Account />} /> {/* 👈 Mi Cuenta */}
          <Route path="/whatsapp-demo" element={<WhatsAppDemo />} /> {/* 👈 Demo Íconos WhatsApp */}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)