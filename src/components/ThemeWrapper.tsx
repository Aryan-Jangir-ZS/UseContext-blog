'use client';

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Footer from './Footer';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleThemeChange = (newTheme: string) => {
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      if (systemTheme !== theme) {
        toggleTheme();
      }
      localStorage.setItem('theme', 'system');
    } else if (newTheme !== theme) {
      toggleTheme();
      localStorage.setItem('theme', newTheme);
    }
    setShowDropdown(false);
  };


  return (
    <body className={theme}>
      <header>
        <div className="header-title">Deep Dive: useContext</div>
        <div className="theme-toggle">
          <button onClick={handleToggleClick}>
            {theme === 'light' ? '☀️' : '🌙'}
          </button>
          <div className={`dropdown ${showDropdown ? 'show' : ''}`}>
            <a onClick={() => handleThemeChange('light')}>Light</a>
            <a onClick={() => handleThemeChange('dark')}>Dark</a>
            <a onClick={() => handleThemeChange('system')}>System</a>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <Footer />
    </body>
  );
};

export default ThemeWrapper; 