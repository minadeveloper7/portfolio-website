
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApiPlayground from '@/components/ApiPlayground';
import { 
  Server, Database, Globe, Lock, 
  Cloud, ArrowRight, Code, RefreshCw 
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: 'api' | 'microservices' | 'database' | 'frontend';
  image: string;
  github?: string;
  demo?: string;
  icon: React.ReactNode;
}

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-commerce API',
      description: 'A RESTful API for e-commerce applications with user authentication, product management, and order processing.',
      tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      category: 'api',
      image: 'https://images.unsplash.com/photo-1667297953668-28fde2f76d45?q=80&w=500&auto=format&fit=crop',
      github: 'https://github.com/johndoe/ecommerce-api',
      icon: <Server className="h-6 w-6" />
    },
    {
      id: 2,
      title: 'Real-time Chat Microservice',
      description: 'A scalable chat service using WebSockets and Redis pub/sub for real-time messaging applications.',
      tech: ['WebSockets', 'Redis', 'Node.js', 'Docker'],
      category: 'microservices',
      image: 'https://images.unsplash.com/photo-1494059980473-813e73ee784b?q=80&w=500&auto=format&fit=crop',
      github: 'https://github.com/johndoe/chat-microservice',
      demo: 'https://chat-demo.example.com',
      icon: <RefreshCw className="h-6 w-6" />
    },
    {
      id: 3,
      title: 'Database Migration Tool',
      description: 'A tool for seamless migrations between different database systems with data validation and transformation.',
      tech: ['Python', 'PostgreSQL', 'MongoDB', 'SQLAlchemy'],
      category: 'database',
      image: 'https://images.unsplash.com/photo-1654277061535-5161b3e28ad0?q=80&w=500&auto=format&fit=crop',
      github: 'https://github.com/johndoe/db-migration-tool',
      icon: <Database className="h-6 w-6" />
    },
    {
      id: 4,
      title: 'Authentication Microservice',
      description: 'A secure authentication service supporting OAuth, JWT, and multi-factor authentication.',
      tech: ['Node.js', 'Express', 'JWT', 'OAuth'],
      category: 'microservices',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=500&auto=format&fit=crop',
      github: 'https://github.com/johndoe/auth-service',
      icon: <Lock className="h-6 w-6" />
    },
    {
      id: 5,
      title: 'Content Delivery API',
      description: 'A high-performance API for content delivery with caching and image optimization.',
      tech: ['Go', 'Redis', 'AWS S3', 'Docker'],
      category: 'api',
      image: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=500&auto=format&fit=crop',
      github: 'https://github.com/johndoe/content-api',
      icon: <Cloud className="h-6 w-6" />
    },
    {
      id: 6,
      title: 'Developer Portfolio Site',
      description: 'A minimalist developer portfolio showcasing backend development skills with interactive elements.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      category: 'frontend',
      image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=500&auto=format&fit=crop',
      github: 'https://github.com/johndoe/portfolio',
      demo: 'https://johndoe.dev',
      icon: <Globe className="h-6 w-6" />
    }
  ];

  const filteredProjects = selectedCategory 
    ? projects.filter(project => project.category === selectedCategory)
    : projects;

  const categories = [
    { id: 'api', label: 'APIs', icon: <Server className="h-4 w-4" /> },
    { id: 'microservices', label: 'Microservices', icon: <RefreshCw className="h-4 w-4" /> },
    { id: 'database', label: 'Database', icon: <Database className="h-4 w-4" /> },
    { id: 'frontend', label: 'Frontend', icon: <Globe className="h-4 w-4" /> }
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
