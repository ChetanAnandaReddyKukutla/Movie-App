// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './css/App.css'
import MovieCard from './components/MovieCard'
import Favorite from './pages/Favorites';
import Home from './pages/Home'
import {Routes, Route} from "react-router-dom";
import { MovieProvider } from './contexts/MovieContext';
import NavBar from './components/NavBar';

function App() {
  return (
    <MovieProvider>
      <NavBar />
    
    <main className='main-content'>
      <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/Favorites' element={<Favorite />}  />
      </Routes>
    </main>
    </MovieProvider>
  );
}

export default App;
