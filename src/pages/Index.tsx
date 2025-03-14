
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Terminal from '@/components/Terminal';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10"
        >
          <motion.div 
            className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Backend Developer @ Kommo
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Sukhrob </span> 
            <span className="relative">
              Tokhirov
              <motion.span 
                className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Java, SQL, PHP developer crafting scalable backend architectures and efficient APIs with precision.
          </p>
          
          <Terminal initialCommand="whoami" />
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/projects">
              <motion.button
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                className="px-6 py-3 rounded-lg bg-transparent border border-white/10 hover:border-white/30 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                About Me
              </motion.button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            delay: 1.2,
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
