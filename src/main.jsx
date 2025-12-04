import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import LoginCodigo from './LoginCodigo.jsx'
import Page4 from './page4.jsx'
import Telemedicine from './telemedicine.jsx'
import Pharmacy from './pharmacy.jsx'
import Therapy from './therapy.jsx'
import Savings from './savings.jsx'
import Terms from './pages/Terms.jsx'
import Privacy from './pages/Privacy.jsx'
import Contact from './contact.jsx'
import Rating from './rating.jsx'
import Account from './account.jsx'
import Blog from './pages/Blog'
import Migrant from './migrant.jsx'
import MigrantContact from './migrantcontact.jsx'
import WhatsAppDemo from './pages/WhatsAppDemo.jsx'
import SubscriptionSuccess from './pages/SubscriptionSuccess.jsx'
import Registro from './pages/Registro.jsx'
import Pago from './pages/Pago.jsx'
import Confirmacion from './pages/Confirmacion.jsx'
import LandingBubblesSimple from './pages/LandingBubblesSimple.jsx'
import LandingBubblesTikTok from './pages/LandingBubblesTikTok.jsx'
import MicroLanding from './pages/MicroLanding.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import VisionMision from './pages/VisionMision.jsx'
import NuestrosPilares from './pages/NuestrosPilares.jsx'
import BeneficiosDetallados from './pages/BeneficiosDetallados.jsx'
import Contacto from './pages/Contacto.jsx'
import CancelSubscription from './pages/CancelSubscription.jsx'
import Home from './home.jsx'
import { UserProvider } from './contexts/UserContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> {/* 👈 INICIO - Burbujas Presuscripción */}
          <Route path="/page3" element={<LoginCodigo />} /> {/* 👈 Login con Código de Acceso */}
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
          <Route path="/subscription-success" element={<SubscriptionSuccess />} /> {/* 👈 Éxito Pago */}
          <Route path="/registro" element={<Registro />} /> {/* 👈 Registro inicial */}
          <Route path="/pago" element={<Pago />} /> {/* 👈 Página de Pago */}
          <Route path="/confirmacion" element={<Confirmacion />} /> {/* 👈 Comprobante de Suscripción */}
          <Route path="/instagram" element={<LandingBubblesSimple />} /> {/* 👈 Landing Instagram/Facebook */}
          <Route path="/facebook" element={<LandingBubblesSimple />} /> {/* 👈 Landing Facebook (mismo que IG) */}
          <Route path="/tiktok" element={<LandingBubblesTikTok />} /> {/* 👈 Landing TikTok (8-10s) */}
          <Route path="/como-funciona" element={<MicroLanding />} /> {/* 👈 Micro-landing demo */}
          <Route path="/quienes-somos" element={<QuienesSomos />} /> {/* 👈 Quiénes Somos */}
          <Route path="/about" element={<QuienesSomos />} /> {/* 👈 About Us (alias) */}
          <Route path="/vision-mision" element={<VisionMision />} /> {/* 👈 Visión y Misión */}
          <Route path="/mision-y-valores" element={<VisionMision />} /> {/* 👈 Misión y Valores (alias) */}
          <Route path="/vision" element={<VisionMision />} /> {/* 👈 Visión (alias) */}
          <Route path="/nuestros-pilares" element={<NuestrosPilares />} /> {/* 👈 Nuestros Pilares */}
          <Route path="/pilares" element={<NuestrosPilares />} /> {/* 👈 Pilares (alias) */}
          <Route path="/beneficios" element={<BeneficiosDetallados />} /> {/* 👈 Beneficios Detallados */}
          <Route path="/contacto" element={<Contacto />} /> {/* 👈 Contacto (nueva versión) */}
          <Route path="/cancel-subscription" element={<CancelSubscription />} /> {/* 👈 Cancelar Suscripción */}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)