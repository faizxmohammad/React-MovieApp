import logo from './logo.svg';
import './App.css';
import React, { Component }  from 'react';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import {Switch,Route, BrowserRouter,Routes} from 'react-router-dom';

function App() {
  return (
    // <>
    // <Navbar></Navbar>
    // <Banner></Banner>
    // <Movies></Movies>
    // </>
    <BrowserRouter>
      <Navbar/>
      <Routes>
      
      <Route exact path="/" element={<HomePage/>}/>
      <Route exact path="/favourites" element={<Favourite/>}/>
      
      </Routes>
    
    </BrowserRouter>
  );
}




function HomePage() {
  return (
    <>
      <Banner />
      <Movies />
    </>
  );
}

export default App;
