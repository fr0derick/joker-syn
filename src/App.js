import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JokerFinder from './components/JokerFinder';  // joker synergies finder
import DevTools from './components/DevTools';  // dev tools
import WarningModal from './components/WarningModal'; // Warning modal component

function App() {
  const [showModal, setShowModal] = useState(false);

  // check localstorage
  useEffect(() => {
    const doNotShowAgain = localStorage.getItem('hideWarningModal');
    if (!doNotShowAgain) {
      setShowModal(true);
    }
  }, []);

  // Close modal when the ok is pressed
  const closeModal = () => {
    setShowModal(false);
  };

  // Store the preference to not show the modal again
  const handleDoNotShowAgain = () => {
    localStorage.setItem('hideWarningModal', 'true');
  };

  return (
    <Router>
      <div className="App">
        {/* Warning modal */}
        <WarningModal
          show={showModal}
          onClose={closeModal}
          onDoNotShowAgain={handleDoNotShowAgain}
        />

        {/* Router will handle the navigation between pages */}
        <Routes>
          {/* JokerFinder page */}
          <Route exact path="/" element={<JokerFinder />} />
          
          {/* DevTools page */}
          <Route path="/dev-tools" element={<DevTools />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
