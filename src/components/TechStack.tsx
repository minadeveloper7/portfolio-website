
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Server, Cloud, Code, 
  Globe, Layers, GitBranch, Workflow 
} from 'lucide-react';

interface TechCategory {
  name: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>('Backend');

  const techCategories: TechCategory[] = [
    {
      name: 'Backend',
      icon: <Server className="w-6 h-6" />,
      skills: ['Java', 'PHP', 'Spring Framework', 'Symfony', 'Quarkus', 'High-load projects'],
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/50'
    },
    {
      name: 'Databases',
      icon: <Database className="w-6 h-6" />,
      skills: ['PostgreSQL', 'SQL', 'Liquibase', 'Database Migrations', 'MySQL', 'H2', 'Redis', 'MongoDB'],
      color: 'bg-green-500/20 text-green-400 border-green-500/50'
    },
    {
      name: 'DevOps',
      icon: <Workflow className="w-6 h-6" />,
      skills: ['K8s', 'Grafana', 'Prometheus', 'Nginx', 'Docker', 'Apache Kafka'],
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/50'
    },
    {
      name: 'Programming',
      icon: <Code className="w-6 h-6" />,
      skills: ['Java', 'PHP', 'SQL', 'Go', 'JavaScript'],
      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
    },
    {
      name: 'Architecture',
      icon: <Layers className="w-6 h-6" />,
      skills: ['Microservices', 'REST APIs', 'System Design', 'Load Balancer'],
      color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50'
    },
    {
      name: 'Human Languages',
      icon: <Globe className="w-6 h-6" />,
      skills: ['English (Full Professional)', 'Russian (Full Professional)', 'Arabic (Limited Working)'],
      color: 'bg-pink-500/20 text-pink-400 border-pink-500/50'
    }
  ];

  const SkillBubble: React.FC<{ skill: string; index: number }> = ({ skill, index }) => (
    <motion.div 
      className="inline-block px-3 py-1.5 text-sm font-medium rounded-full bg-secondary border border-white/5 hover:border-primary/50 transition-colors"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.2, 
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {skill}
    </motion.div>
  );

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-8 text-center">Tech Stack</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {techCategories.map((category) => (
          <motion.button
            key={category.name}
            className={`relative p-4 rounded-lg border transition-all ${
              activeCategory === category.name 
                ? category.color 
                : 'bg-secondary/50 text-foreground/80 border-white/5'
            } flex flex-col items-center justify-center gap-2 cursor-pointer`}
            onClick={() => setActiveCategory(category.name)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {category.icon}
            <span className="font-medium">{category.name}</span>
            {activeCategory === category.name && (
              <motion.div 
                className="absolute -bottom-1 left-1/2 w-2 h-2 bg-primary rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layoutId="activeTechIndicator"
                style={{ translateX: '-50%' }}
              />
            )}
          </motion.button>
        ))}
      </div>
      
      <motion.div 
        className="glass rounded-lg p-6 min-h-[200px]"
        layout
        transition={{ duration: 0.3 }}
      >
        {techCategories
          .filter(category => category.name === activeCategory)
          .map(category => (
            <motion.div 
              key={category.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${category.color.split(' ')[0]} ${category.color.split(' ')[1]}`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => (
                  <SkillBubble key={skill} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default TechStack;
