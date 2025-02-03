import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <span>© 2024 Aryan Jangir</span>
        <a 
          href="https://github.com/AryanJangir-zs/Blog-app" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          View Source Code
        </a>
        <a 
          href="https://react.dev/reference/react/useContext" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Official React Docs
        </a>
      </div>
    </footer>
  );
};

export default Footer; 