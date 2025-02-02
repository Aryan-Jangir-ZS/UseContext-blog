'use client';

import React from 'react';

const Sidebar = () => {
  return (
    <nav className="sidebar" role="navigation" aria-label="Table of Contents">
      <a href="#why-care" className="heading">Why Should You Care?</a>
      
      <a href="#using-usecontext" className="heading">Passing Data Deeply with useContext</a>
      <a href="#how-it-works" className="subheading">How It Works</a>
      <a href="#getting-context-value" className="subheading">Getting the Context Value</a>      
      <a href="#updating-context" className="heading">Updating Context</a>
      <a href="#default-values" className="heading">Setting a Default Value for Context</a>
      <a href="#how-to-set-default" className="subheading">How to Set a Default Value</a>
      <a href="#why-use-default" className="subheading">Why Use a Default Value</a>
      <a href="#common-pitfalls" className="heading">Common Pitfalls</a>
      <a href="#overriding-context" className="heading">Overriding Context</a>
      
      <a href="#avoiding-rerenders" className="heading">Avoiding Unnecessary Re-Renders</a>
      <a href="#the-problem" className="subheading">The Problem</a>
      <a href="#the-solution" className="subheading">The Solution</a>
      <a href="#why-it-works" className="subheading">Why This Works</a>
      
      <a href="#troubleshooting" className="heading">Troubleshooting</a>
    </nav>
  );
};

export default Sidebar; 