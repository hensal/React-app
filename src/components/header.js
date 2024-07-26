import React, { useState } from 'react';
import './header.css';
import { FaChevronDown, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import blogImage from '../assets/images/blog.jpg';
import Footer from './footer.js';

const Header = () => {
  const names = ['Home', 'Category', 'Product', 'Contact', 'About Us', 'FAQ', 'Login'];

  const dropdownItems = [
    [],
    ['Shoe', 'Book', 'Food'],
    ['Product 1', 'Product 2', 'Product 3'],
    ['Contact 1', 'Contact 2', 'Contact 3'],
    ['About Us 1', 'About Us 2', 'About Us 3'],
    ['FAQ 1', 'FAQ 2', 'FAQ 3'],
    [],
  ];

  const [activeItem, setActiveItem] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveItem(index);
  };

  const handleMouseLeave = () => {
    setActiveItem(null);
  };

  return (
    <div>
      <div className="header">
        <div className="header-item">
          <img src={blogImage} alt="Blog" className="header-image" />
        </div>
        {names.map((name, index) => (
          <div
            key={index}
            className="header-item"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`/${name.toLowerCase().replace(/\s/g, '-')}`} className={activeItem === index ? 'active' : ''}>
              {index === names.length - 1 ? <FaUser className="person-icon" /> : null}
              {name}
              {index !== names.length - 1 && <FaChevronDown className="dropdown-icon" />}
            </Link>
            {index !== names.length - 1 && activeItem === index && (
              <div className="dropdown-content">
                {dropdownItems[index].map((item, i) => (
                 <Link key={i} to={`/${name.toLowerCase().replace(/\s/g, '-')}/${item.toLowerCase().replace(/\s/g, '-')}`}>
                 {item}
               </Link>               
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Header;
