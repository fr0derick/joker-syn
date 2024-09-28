import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JokerFinder from './components/JokerFinder';  // joker synergies finder
import DevTools from './components/DevTools';  // dev tools

function App() {
  return (
    <Router>
      <div className="App">
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
