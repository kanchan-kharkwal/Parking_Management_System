// src/components/common/Footer.js
import React, { useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('.footer');
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        footer.classList.remove('hidden');
      } else {
        footer.classList.add('hidden');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className="footer hidden">
      <p>&copy; 2024 Space-Sync. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
