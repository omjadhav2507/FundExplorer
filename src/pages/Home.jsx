import React from 'react';
import { useParams } from 'react-router-dom';
import Calculator from './Calculator';
import Tracker from './Tracker';
import Comparison from './Comparison';




function Home() {

  const { section } = useParams();


  
  
  switch(section) {
    case 'calculator':
      return <Calculator />;
    case 'tracker':
      return <Tracker/>;
    case 'comparison':
      return <Comparison />;
    default:
      return <Default />;
  }
}

export default Home;
