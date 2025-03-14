
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TechStack from '@/components/TechStack';
import { Calendar, Code, User, Award } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const timelineData: TimelineItem[] = [
    {
      year: '2018',
      title: 'Started Coding Journey',
      description: 'Began learning JavaScript and built my first web applications',
      icon: <Code className="h-5 w-5" />
    },
    {
      year: '2019',
      title: 'Computer Science Degree',
      description: 'Graduated with a degree in Computer Science, focusing on backend development',
      icon: <Award className="h-5 w-5" />
    },
    {
      year: '2020',
      title: 'First Developer Role',
      description: 'Joined a startup as a Backend Developer working with Node.js and MongoDB',
      icon: <User className="h-5 w-5" />
    },
    {
      year: '2021',
      title: 'Advanced to Senior Developer',
      description: 'Promoted to Senior Backend Developer, leading architecture decisions',
      icon: <Award className="h-5 w-5" />
    },
    {
      year: '2022',
      title: 'Microservices Migration',
      description: 'Led a team to migrate monolithic architecture to microservices',
      icon: <Code className="h-5 w-5" />
    },
    {
      year: '2023',
      title: 'Tech Lead',
      description: 'Became Tech Lead for backend infrastructure, mentoring junior developers',
      icon: <User className="h-5 w-5" />
    },
    {
      year: 'Present',
      title: 'Freelance & Open Source',
      description: 'Working on freelance projects and contributing to open source',
      icon: <Calendar className="h-5 w-5" />
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto pt-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <div className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-3">
          About Me
        </div>
        <h1 className="text-4xl font-bold mb-6">My Journey as a Developer</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          From curious beginner to experienced backend developer. Here's how I got here.
        </p>
      </motion.div>

      {/* Timeline Section */}
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={controls}
        className="relative mb-20"
      >
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
        
        {timelineData.map((item, index) => (
          <motion.div 
            key={index}
            variants={item}
            className={`relative flex flex-col md:flex-row items-start mb-12 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
              <div className="glass p-6 rounded-lg border border-white/10 h-full">
                <div className="text-primary font-mono font-bold mb-2">{item.year}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
            
            <div className="absolute left-0 md:left-1/2 w-16 h-16 bg-secondary rounded-full flex items-center justify-center border-4 border-background transform -translate-y-1/2 md:-translate-x-1/2">
              <div className="bg-primary/10 p-2 rounded-full">
                {item.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Tech Stack Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-20"
      >
        <TechStack />
      </motion.div>
      
      {/* Personal Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass rounded-lg p-8 mb-20 border border-white/10"
      >
        <h2 className="text-2xl font-bold mb-6">Beyond the Code</h2>
        <p className="text-muted-foreground mb-4">
          When I'm not building backend systems or optimizing databases, you'll find me exploring the outdoors, reading about system design, or experimenting with new programming languages. I believe in continuous learning and solving real-world problems through elegant code.
        </p>
        <p className="text-muted-foreground">
          I'm passionate about creating software that's not only functional but also maintainable and scalable. My approach combines technical expertise with a focus on simplicity and user needs.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
