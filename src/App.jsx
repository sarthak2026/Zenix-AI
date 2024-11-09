import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import LandingPage from './components/LandingPage';

const App = () => {
  const [showLandingPage, setShowLandingPage] = useState(true);

  const handleStart = () => {
    setShowLandingPage(false);
  };

  return (
    <>
      {showLandingPage ? (
        <LandingPage onStart={handleStart} />
      ) : (
        <div className="flex animate-fadeIn duration-1000">
          <Sidebar />
          <MainContent />
        </div>
      )}
    </>
  );
};

export default App;
