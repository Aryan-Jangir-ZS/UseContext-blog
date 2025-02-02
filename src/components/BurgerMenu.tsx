'use client';

import React, { useState } from 'react';

interface BurgerMenuProps {
  children: React.ReactNode;
}

const BurgerMenu = ({ children }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="burger-menu">
      <button 
        className={`burger-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`burger-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
      {isOpen && (
        <div 
          className="burger-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default BurgerMenu; 