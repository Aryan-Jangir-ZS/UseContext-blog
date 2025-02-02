import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import '../styles/globals.css'; 
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeWrapper from '@/components/ThemeWrapper';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'React useContext Hook Guide | Complete Tutorial',
  description: 'A comprehensive guide to using React\'s useContext Hook. Learn about context management, best practices, performance optimization, and common pitfalls.',
  keywords: 'React, useContext, React Hooks, Context API, React Tutorial, State Management',
  authors: [{ name: 'Aryan Jangir' }],
  openGraph: {
    title: 'React useContext Hook Guide',
    description: 'Master React\'s useContext Hook with our comprehensive guide',
    type: 'article',
    url: 'https://your-domain.com/blog/usecontext-guide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'React useContext Hook Guide',
    description: 'Master React\'s useContext Hook with our comprehensive guide',
  }
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Understanding useContext in React</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <ThemeProvider>
        <ThemeWrapper>{children}</ThemeWrapper>
      </ThemeProvider>
    </html>
  );
};

export default RootLayout;
