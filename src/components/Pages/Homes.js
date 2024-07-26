import React from 'react';
import codingImage from '../../assets/images/coding.jpg';

const Home = () => {
  return (
    <div className="image-with-text-container">
      <img src={codingImage} alt="Coding" className="coding-image" />
      <div className="overlay-text">Welcome to My Blog</div>
    </div>
  );
};

export default Home;

