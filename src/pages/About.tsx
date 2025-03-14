
import React, { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TechStack from '@/components/TechStack';
import { Calendar, Code, User, Award, GraduationCap, Server } from 'lucide-react';

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
      year: '2021',
      title: 'PDP Academy',
      description: 'Computer Software Engineering (November 2021 - September 2022)',
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      year: '2022',
      title: 'PDP IT University',
      description: 'Started Bachelor of Computer Science degree, expected to graduate in July 2026',
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      year: '2022',
      title: 'ECMA Software Development',
      description: 'Java Backend Developer working with Spring Boot and microservices architecture',
      icon: <Server className="h-5 w-5" />
    },
    {
      year: '2024',
      title: 'Pearson Certification',
      description: 'Received BTEC International Level 3 Foundation Diploma in Information Technology',
      icon: <Award className="h-5 w-5" />
    },
    {
      year: '2024',
      title: 'Kommo',
      description: 'Backend Developer integrating WhatsApp Cloud API and working with K8s, Grafana, Prometheus, and Nginx',
      icon: <Code className="h-5 w-5" />
    },
    {
      year: 'Present',
      title: 'Continuous Growth',
      description: 'Continuously improving my skills in Java, PHP, SQL, and cloud technologies',
      icon: <User className="h-5 w-5" />
    }
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item: Variants = {
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
          From dedicated student to experienced backend developer. Here's my professional path in Tashkent, Uzbekistan.
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
        
        {timelineData.map((timelineItem, index) => (
          <motion.div 
            key={index}
            variants={item}
            className={`relative flex flex-col md:flex-row items-start mb-12 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
              <div className="glass p-6 rounded-lg border border-white/10 h-full">
                <div className="text-primary font-mono font-bold mb-2">{timelineItem.year}</div>
                <h3 className="text-xl font-bold mb-2">{timelineItem.title}</h3>
                <p className="text-muted-foreground">{timelineItem.description}</p>
              </div>
            </div>
            
            <div className="absolute left-0 md:left-1/2 w-16 h-16 bg-secondary rounded-full flex items-center justify-center border-4 border-background transform -translate-y-1/2 md:-translate-x-1/2">
              <div className="bg-primary/10 p-2 rounded-full">
                {timelineItem.icon}
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
          As a Backend Developer at Kommo, I leverage my skills in Java, PHP, and Spring Cloud to create robust and scalable backend solutions. With over 1.5 years of experience in this role, I have previously worked as a Java Backend Developer at ECMA Software Development.
        </p>
        <p className="text-muted-foreground">
          I'm currently pursuing a Bachelor of Science in Computer Science from PDP IT University, expected to graduate in July 2026. My passion for software engineering drives me to continuously learn new technologies and improve my coding skills. I am always eager to collaborate with other developers and contribute to the success of the team.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
