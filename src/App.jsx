import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import SaludCompartidaProblemStage from './components/BubblesProblemStage';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <TopNav showMenu={true} hideUser={true} />
      <SaludCompartidaProblemStage onComplete={() => navigate('/home')} />
      <Footer />
    </>
  );
}

export default App;
