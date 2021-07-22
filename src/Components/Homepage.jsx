import React from 'react';
import Content from './Content';
import Header from './Header';
import '../App.css';

const Homepage = () => {
  return (
    <>
      <div className='header'>
        <Header />
      </div>
      <div>
        <Content />
      </div>
    </>
  );
};

export default Homepage;
