import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { useMetaPixel } from './hooks/useMetaPixel'
// Sentry Error Monitoring
import '../sentry.client.config.js'
import LoginCodigo from './LoginCodigo.jsx'
import Page4 from './page4.jsx'
import Telemedicine from './telemedicine.jsx'
import Pharmacy from './pharmacy.jsx'
import Therapy from './therapy.jsx'
import Savings from './savings.jsx'
import Terms from './page-components/Terms.jsx'
import Privacy from './page-components/Privacy.jsx'
import TermsInternal from './page-components/TermsInternal.jsx'
import PrivacyInternal from './page-components/PrivacyInternal.jsx'
import PostTerms from './page-components/PostTerms.jsx'
import PostPrivacy from './page-components/PostPrivacy.jsx'
import ConfirmacionTerms from './page-components/ConfirmacionTerms.jsx'
import ConfirmacionPrivacy from './page-components/ConfirmacionPrivacy.jsx'
import PagoTerms from './page-components/PagoTerms.jsx'
import PagoPrivacy from './page-components/PagoPrivacy.jsx'
import Page3Terms from './page-components/Page3Terms.jsx'
import Page3Privacy from './page-components/Page3Privacy.jsx'
import Contact from './contact.jsx'
import Rating from './rating.jsx'
import Account from './account.jsx'
import Blog from './page-components/Blog'
import Migrant from './migrant.jsx'
import MigrantContact from './migrantcontact.jsx'
import WhatsAppDemo from './page-components/WhatsAppDemo.jsx'
import SubscriptionSuccess from './page-components/SubscriptionSuccess.jsx'
import Registro from './page-components/Registro.jsx'
import Pago from './page-components/Pago.jsx'
import Confirmacion from './page-components/Confirmacion.jsx'
import LandingBubblesSimple from './page-components/LandingBubblesSimple.jsx'
import LandingBubblesTikTok from './page-components/LandingBubblesTikTok.jsx'
import MicroLanding from './page-components/MicroLanding.jsx'
import QuienesSomos from './page-components/QuienesSomos.jsx'
import VisionMision from './page-components/VisionMision.jsx'
import NuestrosPilares from './page-components/NuestrosPilares.jsx'
import QuienesSomosInternal from './page-components/QuienesSomosInternal.jsx'
import VisionMisionInternal from './page-components/VisionMisionInternal.jsx'
import NuestrosPilaresInternal from './page-components/NuestrosPilaresInternal.jsx'
import BeneficiosDetallados from './page-components/BeneficiosDetallados.jsx'
import TelemedicinaPre from './page-components/TelemedicinaPre.jsx'
import FarmaciasPre from './page-components/FarmaciasPre.jsx'
import TerapiaPre from './page-components/TerapiaPre.jsx'
import MisAhorrosPre from './page-components/MisAhorrosPre.jsx'
import Contacto from './page-components/Contacto.jsx'
import CancelSubscription from './page-components/CancelSubscription.jsx'
import Home from './home.jsx'
import { UserProvider } from './contexts/UserContext'

// Componente que inicializa Meta Pixel
function App() {
  useMetaPixel(); // Inicializar pixel en toda la app
  
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* 👈 INICIO - Burbujas Presuscripción */}
      <Route path="/home" element={<Home />} /> {/* 👈 INICIO duplicado - Burbujas Presuscripción */}
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
      <Route path="/terms-internal" element={<TermsInternal />} /> {/* 👈 Términos y Condiciones (REGISTRO) */}
      <Route path="/privacy-internal" element={<PrivacyInternal />} /> {/* 👈 Aviso de Privacidad (REGISTRO) */}
      <Route path="/confirmacion-terms" element={<ConfirmacionTerms />} /> {/* 👈 Términos y Condiciones (CONFIRMACIÓN) */}
      <Route path="/confirmacion-privacy" element={<ConfirmacionPrivacy />} /> {/* 👈 Aviso de Privacidad (CONFIRMACIÓN) */}
      <Route path="/pago-terms" element={<PagoTerms />} /> {/* 👈 Términos y Condiciones (PAGO) */}
      <Route path="/pago-privacy" element={<PagoPrivacy />} /> {/* 👈 Aviso de Privacidad (PAGO) */}
      <Route path="/page3-terms" element={<Page3Terms />} /> {/* 👈 Términos y Condiciones (PAGE3) */}
      <Route path="/page3-privacy" element={<Page3Privacy />} /> {/* 👈 Aviso de Privacidad (PAGE3) */}
      <Route path="/post-terms" element={<PostTerms />} /> {/* 👈 Términos y Condiciones (POST-CONTRATACIÓN) */}
      <Route path="/post-privacy" element={<PostPrivacy />} /> {/* 👈 Aviso de Privacidad (POST-CONTRATACIÓN) */}
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
      <Route path="/quienes-somos-internal" element={<QuienesSomosInternal />} /> {/* 👈 Quiénes Somos (POST-SUSCRIPCIÓN) */}
      <Route path="/vision-mision" element={<VisionMision />} /> {/* 👈 Visión y Misión */}
      <Route path="/mision-y-valores" element={<VisionMision />} /> {/* 👈 Misión y Valores (alias) */}
      <Route path="/vision" element={<VisionMision />} /> {/* 👈 Visión (alias) */}
      <Route path="/vision-mision-internal" element={<VisionMisionInternal />} /> {/* 👈 Visión y Misión (POST-SUSCRIPCIÓN) */}
      <Route path="/nuestros-pilares" element={<NuestrosPilares />} /> {/* 👈 Nuestros Pilares */}
      <Route path="/pilares" element={<NuestrosPilares />} /> {/* 👈 Pilares (alias) */}
      <Route path="/nuestros-pilares-internal" element={<NuestrosPilaresInternal />} /> {/* 👈 Nuestros Pilares (POST-SUSCRIPCIÓN) */}
      <Route path="/beneficios" element={<BeneficiosDetallados />} /> {/* 👈 Beneficios Detallados */}
      <Route path="/telemedicina-info" element={<TelemedicinaPre />} /> {/* 👈 Telemedicina PRE */}
      <Route path="/farmacias-info" element={<FarmaciasPre />} /> {/* 👈 Farmacias PRE */}
      <Route path="/terapia-info" element={<TerapiaPre />} /> {/* 👈 Terapia PRE */}
      <Route path="/mis-ahorros-info" element={<MisAhorrosPre />} /> {/* 👈 Mis Ahorros PRE */}
      <Route path="/contacto" element={<Contacto />} /> {/* 👈 Contacto (nueva versión) */}
      <Route path="/cancel-subscription" element={<CancelSubscription />} /> {/* 👈 Cancelar Suscripción */}
    </Routes>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)