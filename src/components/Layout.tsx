
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import PageTransition from './PageTransition';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <PageTransition key={location.pathname}>
          {children}
        </PageTransition>
      </main>
      <footer className="p-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} | Sukhrob Tokhirov</p>
      </footer>
    </div>
  );
};

export default Layout;
