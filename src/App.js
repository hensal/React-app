import React from 'react';
import './App.css';
import Header from './components/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Homes';
import Category from './components/Pages/Category';
import Product from './components/Pages/Product';
import Contact from './components/Pages/Contact';
import About from './components/Pages/AboutUs';
import FAQ from './components/Pages/Faq';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';

import Shoe from './components/Dropdowns/Shoe';
import Books from './components/Dropdowns/Book';
import Foods from './components/Dropdowns/Food';

function App() {
  return (
    <div className="App">
      <Router>          {/* In React Router v6, the <Route> component should be used within a <Routes> component.*/} 
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about-us" element={<About />} />     {/*Route path must be based on the name of the header items((-hyphen) is mendatory)*/} 
          <Route path="/faq" element={<FAQ />} />
           {/*Dropdown items)*/}
           <Route path="/shoe" element={<Shoe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

