// src/components/common/Header.js
import React, { useEffect } from 'react';
import './Header.css';

const Header = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 50) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="header">
      <h1>Space-Sync</h1>
    </header>
  );
};

export default Header;
