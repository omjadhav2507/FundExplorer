import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Hero from './components/Hero';
import Nav from './components/Nav';
import SIP from './pages/SIP';
import Lumpsum from './pages/Lumpsum';
import FundDetail from './pages/FundDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Hero/>
        <Nav/>
        <Routes>
          {/* Default route to render Home with Calculator */}
          <Route path="/" element={<Home section="calculator" />} />
          {/* Route for other sections */}
          <Route path='/:section' element={<Home />} />
          <Route path='/sip' element={<SIP/>}/>
          <Route path='/lumpsum' element={<Lumpsum/>}/>
          <Route path='/fund/:name' element={<FundDetail/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;


