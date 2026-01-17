'use client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMetaPixel } from '../src/hooks/useMetaPixel';
import { UserProvider } from '../src/contexts/UserContext';

// Importar todos los componentes
import LoginCodigo from '../src/LoginCodigo.jsx';
import Page4 from '../src/page4.jsx';
import Telemedicine from '../src/telemedicine.jsx';
import Pharmacy from '../src/pharmacy.jsx';
import Therapy from '../src/therapy.jsx';
import Savings from '../src/savings.jsx';
import Terms from '../src/pages/Terms.jsx';
import Privacy from '../src/pages/Privacy.jsx';
import TermsInternal from '../src/pages/TermsInternal.jsx';
import PrivacyInternal from '../src/pages/PrivacyInternal.jsx';
import PostTerms from '../src/pages/PostTerms.jsx';
import PostPrivacy from '../src/pages/PostPrivacy.jsx';
import ConfirmacionTerms from '../src/pages/ConfirmacionTerms.jsx';
import ConfirmacionPrivacy from '../src/pages/ConfirmacionPrivacy.jsx';
import PagoTerms from '../src/pages/PagoTerms.jsx';
import PagoPrivacy from '../src/pages/PagoPrivacy.jsx';
import Page3Terms from '../src/pages/Page3Terms.jsx';
import Page3Privacy from '../src/pages/Page3Privacy.jsx';
import Contact from '../src/contact.jsx';
import Rating from '../src/rating.jsx';
import Account from '../src/account.jsx';
import Blog from '../src/pages/Blog';
import Migrant from '../src/migrant.jsx';
import MigrantContact from '../src/migrantcontact.jsx';
import WhatsAppDemo from '../src/pages/WhatsAppDemo.jsx';
import SubscriptionSuccess from '../src/pages/SubscriptionSuccess.jsx';
import Registro from '../src/Registro.jsx';
import Pago from '../src/Pago.jsx';
import Confirmacion from '../src/Confirmacion.jsx';
import LandingBubblesSimple from '../src/pages/LandingBubblesSimple.jsx';
import LandingBubblesTikTok from '../src/pages/LandingBubblesTikTok.jsx';
import MicroLanding from '../src/pages/MicroLanding.jsx';
import QuienesSomos from '../src/pages/QuienesSomos.jsx';
import QuienesSomosInternal from '../src/pages/QuienesSomosInternal.jsx';
import VisionMision from '../src/pages/VisionMision.jsx';
import VisionMisionInternal from '../src/pages/VisionMisionInternal.jsx';
import AICompanion from '../src/pages/AICompanion.jsx';
import AICompanionInternal from '../src/pages/AICompanionInternal.jsx';
import DepositPayment from '../src/pages/DepositPayment.jsx';
import MisAhorrosPre from '../src/pages/MisAhorrosPre.jsx';
import Contacto from '../src/pages/Contacto.jsx';
import CancelSubscription from '../src/pages/CancelSubscription.jsx';
import Home from '../src/home.jsx';

function App() {
  useMetaPixel(); // Inicializar Meta Pixel en toda la app
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/page3" element={<LoginCodigo />} />
      <Route path="/page4" element={<Page4 />} />
      <Route path="/migrant" element={<Migrant />} />
      <Route path="/migrantcontact" element={<MigrantContact />} />
      <Route path="/telemedicine" element={<Telemedicine />} />
      <Route path="/pharmacy" element={<Pharmacy />} />
      <Route path="/therapy" element={<Therapy />} />
      <Route path="/savings" element={<Savings />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms-internal" element={<TermsInternal />} />
      <Route path="/privacy-internal" element={<PrivacyInternal />} />
      <Route path="/confirmacion-terms" element={<ConfirmacionTerms />} />
      <Route path="/confirmacion-privacy" element={<ConfirmacionPrivacy />} />
      <Route path="/pago-terms" element={<PagoTerms />} />
      <Route path="/pago-privacy" element={<PagoPrivacy />} />
      <Route path="/page3-terms" element={<Page3Terms />} />
      <Route path="/page3-privacy" element={<Page3Privacy />} />
      <Route path="/post-terms" element={<PostTerms />} />
      <Route path="/post-privacy" element={<PostPrivacy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/rating" element={<Rating />} />
      <Route path="/account" element={<Account />} />
      <Route path="/whatsapp-demo" element={<WhatsAppDemo />} />
      <Route path="/subscription-success" element={<SubscriptionSuccess />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/pago" element={<Pago />} />
      <Route path="/confirmacion" element={<Confirmacion />} />
      <Route path="/instagram" element={<LandingBubblesSimple />} />
      <Route path="/facebook" element={<LandingBubblesSimple />} />
      <Route path="/tiktok" element={<LandingBubblesTikTok />} />
      <Route path="/como-funciona" element={<MicroLanding />} />
      <Route path="/quienes-somos" element={<QuienesSomos />} />
      <Route path="/about" element={<QuienesSomos />} />
      <Route path="/quienes-somos-internal" element={<QuienesSomosInternal />} />
      <Route path="/vision-mision" element={<VisionMision />} />
      <Route path="/vision-mision-internal" element={<VisionMisionInternal />} />
      <Route path="/ai-companion" element={<AICompanion />} />
      <Route path="/ai-companion-internal" element={<AICompanionInternal />} />
      <Route path="/deposit-payment" element={<DepositPayment />} />
      <Route path="/mis-ahorros-pre" element={<MisAhorrosPre />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/cancel-subscription" element={<CancelSubscription />} />
    </Routes>
  );
}

export default function ClientRouter() {
  return (
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  );
}
