"use client";

import { useEffect } from 'react';

const ActiveSectionObserver = () => {
  useEffect(() => {
    const firstHeading = document.querySelector('.sidebar a.heading');
    if (firstHeading) {
      firstHeading.classList.add('active');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll('.sidebar a').forEach((link) => {
              link.classList.remove('active');
            });
            
            const id = entry.target.id;
            const correspondingLink = document.querySelector(`.sidebar a[href="#${id}"]`);
            if (correspondingLink) {
              correspondingLink.classList.add('active');
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px'
      }
    );

    document.querySelectorAll('h2[id], h3[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      document.querySelectorAll('.sidebar a').forEach((link) => {
        link.classList.remove('active');
      });
    };
  }, []);

  return null;
};

export default ActiveSectionObserver; 