import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import HeroSection from './Components/HeroSection/HeroSection';
import Programs from './Components/Programs/Programs';
import Explore from './Components/Explore/Explore';
import Footer from './Components/Footer/Footer';

const App = () => {
  return (
      <div>
        <Navbar/>
        <HeroSection/>
        <Explore/>
        <div className="container">
          <Programs/>
        </div>
        <Footer/>
      </div>
  );
};

export default App;
