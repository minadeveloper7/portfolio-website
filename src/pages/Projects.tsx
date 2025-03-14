
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApiPlayground from '@/components/ApiPlayground';
import { 
  Server, Database, Globe, Lock, 
  Cloud, ArrowRight, Code, RefreshCw 
} from 'lucide-react';

interface Project {
  id: string | number;
  title: string;
  description: string;
  tech: string[];
  category: 'api' | 'microservices' | 'database' | 'frontend' | 'education';
  image: string;
  github?: string;
  demo?: string;
  icon: React.ReactNode;
}

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | number | null>(null);

  const projects: Project[] = [
    {
      id: "1",
      title: 'E-commerce API',
      description: 'A robust RESTful API for e-commerce applications with authentication, product management, and order processing',
      tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      category: 'api',
      image: 'https://images.unsplash.com/photo-1667297953668-28fde2f76d45?q=80&w=500&auto=format&fit=crop',
      github: 'https://github.com/yourusername/ecommerce-api',
      icon: <Server className="h-6 w-6" />
    },
    {
      id: "2",
      title: 'Online Education Platform',
      description: 'A full-stack application for online education with real-time updates',
      tech: ['Java', 'Spring', 'Spring Cloud', 'Liquibase', 'PostgreSQL'],
      category: 'education',
      image: 'https://images.unsplash.com/photo-1494059980473-813e73ee784b?q=80&w=500&auto=format&fit=crop',
      demo: 'https://online.pdp.uz',
      icon: <Globe className="h-6 w-6" />
    },
    {
      id: "3",
      title: 'Online Ticketing System',
      description: 'The Mandulis Ticketing System is an open-source issue and ticket management platform built using Spring Boot and React. It offers key functionalities such as ticket creation, assignment, prioritization, and collaboration tools.',
      tech: ['Java', 'Spring', 'JWT', 'PostgreSQL', 'Docker', 'JUnit', 'Kafka'],
      category: 'microservices',
      image: 'https://images.unsplash.com/photo-1654277061535-5161b3e28ad0?q=80&w=500&auto=format&fit=crop',
      github: 'https://github.com/stohirov/mandulis-ticketing-system',
      icon: <Database className="h-6 w-6" />
    }
  ];

  const filteredProjects = selectedCategory 
    ? projects.filter(project => project.category === selectedCategory)
    : projects;

  const categories = [
    { id: 'api', label: 'APIs', icon: <Server className="h-4 w-4" /> },
    { id: 'microservices', label: 'Microservices', icon: <RefreshCw className="h-4 w-4" /> },
    { id: 'database', label: 'Database', icon: <Database className="h-4 w-4" /> },
    { id: 'education', label: 'Education', icon: <Globe className="h-4 w-4" /> }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto pt-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <div className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-3">
          Projects
        </div>
        <h1 className="text-4xl font-bold mb-6">My Backend Projects</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A collection of my backend development work, APIs, and microservices.
        </p>
      </motion.div>

      {/* Filter Categories */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <motion.button
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            selectedCategory === null 
              ? 'bg-primary/10 border-primary/30 text-primary' 
              : 'bg-transparent border-white/10 text-muted-foreground hover:border-white/30'
          }`}
          onClick={() => setSelectedCategory(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All Projects
        </motion.button>
        
        {categories.map(category => (
          <motion.button
            key={category.id}
            className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 transition-all ${
              selectedCategory === category.id 
                ? 'bg-primary/10 border-primary/30 text-primary' 
                : 'bg-transparent border-white/10 text-muted-foreground hover:border-white/30'
            }`}
            onClick={() => setSelectedCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.icon}
            {category.label}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        layout
      >
        <AnimatePresence>
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-lg overflow-hidden border border-white/10 flex flex-col"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ 
                    transform: hoveredProject === project.id ? 'scale(1.05)' : 'scale(1)' 
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                
                <div className="absolute top-4 left-4 bg-background/70 backdrop-blur-sm p-2 rounded-full">
                  {project.icon}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-secondary/50 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Code className="h-4 w-4" />
                      <span>Code</span>
                    </a>
                  )}
                  
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                      <span>Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {/* API Playground Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-20"
      >
        <ApiPlayground />
      </motion.div>
    </div>
  );
};

export default Projects;
