import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Mail, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    toast({
      title: "Message sent!",
      description: "I'll get back to you as soon as possible.",
    });
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  const socialLinks = [
    { 
      name: 'Email',
      icon: <Mail className="h-5 w-5" />,
      link: 'mailto:john.doe@example.com',
    },
    { 
      name: 'GitHub',
      icon: <Github className="h-5 w-5" />,
      link: 'https://github.com/johndoe',
    },
    { 
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      link: 'https://linkedin.com/in/johndoe',
    },
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
          Contact
        </div>
        <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Interested in working together? Feel free to reach out through the form below or via social media.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass rounded-lg p-8 border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-secondary/50 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-secondary/50 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-secondary/50 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-secondary/50 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-colors resize-none"
              />
            </div>
            
            <motion.button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting || submitted}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : submitted ? (
                <>
                  <Check className="h-5 w-5" />
                  Sent Successfully
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col justify-between"
        >
          <div className="glass rounded-lg p-8 border border-white/10 mb-6">
            <h2 className="text-2xl font-bold mb-6">Connect</h2>
            <p className="text-muted-foreground mb-8">
              Feel free to reach out if you're looking for a backend developer, have a question, or just want to connect.
            </p>
            
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-md border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                >
                  <div className="p-2 rounded-full bg-primary/10">
                    {link.icon}
                  </div>
                  <span>{link.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="glass rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Office Hours</h2>
            <p className="text-muted-foreground mb-4">
              I typically respond to inquiries within 24 hours.
            </p>
            <div className="font-mono text-sm">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span>Monday - Friday</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span>Saturday</span>
                <span>By appointment</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
