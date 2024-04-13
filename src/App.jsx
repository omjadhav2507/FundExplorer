import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Hero from './components/Hero';
import Nav from './components/Nav';
import SIP from './pages/SIP';
import Lumpsum from './pages/Lumpsum';




function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Hero/>
        <Nav/>
        <Routes>
          <Route path='/:section' element={<Home />} />
          <Route path='/sip' element={<SIP/>}/>
          <Route path='/lumpsum' element={<Lumpsum/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

