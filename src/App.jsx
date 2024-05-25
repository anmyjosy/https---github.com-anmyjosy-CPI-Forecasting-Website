import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import HeroSection from './Components/HeroSection/HeroSection';
import Programs from './Components/Programs/Programs';
import Explore from './Components/Explore/Explore';
import Footer from './Components/Footer/Footer';
import { AuthProvider } from 'C:/Users/asus/Desktop/castfore/AuthContext.jsx'; // Import AuthProvider

const App = () => {
  return (
    <AuthProvider> {/* Wrap your entire application with AuthProvider */}
      <div>
        <Navbar/>
        <HeroSection/>
        <Explore/>
        <div className="container">
          <Programs/>
        </div>
        <Footer/>
      </div>
    </AuthProvider>
  );
};

export default App;
