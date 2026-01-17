'use client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMetaPixel } from './hooks/useMetaPixel';
import { UserProvider } from './contexts/UserContext';

// Importar todos los componentes
import LoginCodigo from './LoginCodigo.jsx';
import Page4 from './page4.jsx';
import Telemedicine from './telemedicine.jsx';
import Pharmacy from './pharmacy.jsx';
import Therapy from './therapy.jsx';
import Savings from './savings.jsx';
import Terms from './views/Terms.jsx';
import Privacy from './views/Privacy.jsx';
import TermsInternal from './views/TermsInternal.jsx';
import PrivacyInternal from './views/PrivacyInternal.jsx';
import PostTerms from './views/PostTerms.jsx';
import PostPrivacy from './views/PostPrivacy.jsx';
import ConfirmacionTerms from './views/ConfirmacionTerms.jsx';
import ConfirmacionPrivacy from './views/ConfirmacionPrivacy.jsx';
import PagoTerms from './views/PagoTerms.jsx';
import PagoPrivacy from './views/PagoPrivacy.jsx';
import Page3Terms from './views/Page3Terms.jsx';
import Page3Privacy from './views/Page3Privacy.jsx';
import Contact from './contact.jsx';
import Rating from './rating.jsx';
import Account from './account.jsx';
import Blog from './views/Blog';
import Migrant from './migrant.jsx';
import MigrantContact from './migrantcontact.jsx';
import WhatsAppDemo from './views/WhatsAppDemo.jsx';
import SubscriptionSuccess from './views/SubscriptionSuccess.jsx';
import Registro from './views/Registro.jsx';
import Pago from './views/Pago.jsx';
import Confirmacion from './views/Confirmacion.jsx';
import LandingBubblesSimple from './views/LandingBubblesSimple.jsx';
import LandingBubblesTikTok from './views/LandingBubblesTikTok.jsx';
import MicroLanding from './views/MicroLanding.jsx';
import QuienesSomos from './views/QuienesSomos.jsx';
import QuienesSomosInternal from './views/QuienesSomosInternal.jsx';
import VisionMision from './views/VisionMision.jsx';
import VisionMisionInternal from './views/VisionMisionInternal.jsx';
// import AICompanion from './views/AICompanion.jsx'; // TODO: Create this file
// import AICompanionInternal from './views/AICompanionInternal.jsx'; // TODO: Create this file
// import DepositPayment from './views/DepositPayment.jsx'; // TODO: Create this file
import MisAhorrosPre from './views/MisAhorrosPre.jsx';
import Contacto from './views/Contacto.jsx';
import CancelSubscription from './views/CancelSubscription.jsx';
import Home from './home.jsx';

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
      {/* TODO: Create these components */}
      {/* <Route path="/ai-companion" element={<AICompanion />} /> */}
      {/* <Route path="/ai-companion-internal" element={<AICompanionInternal />} /> */}
      {/* <Route path="/deposit-payment" element={<DepositPayment />} /> */}
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
