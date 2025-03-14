
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TerminalProps {
  initialCommand?: string;
}

interface TerminalLine {
  prompt: string;
  text: string;
  isCommand: boolean;
  isTyping?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ initialCommand = 'whoami' }) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    whoami: "John Doe - Full Stack Developer specializing in backend technologies",
    skills: [
      "TypeScript/JavaScript, Python, Go, Java",
      "Node.js, Express, NestJS, Django, Flask",
      "MongoDB, PostgreSQL, Redis, Elasticsearch",
      "Docker, Kubernetes, AWS, GCP",
      "CI/CD, Microservices, RESTful APIs, GraphQL"
    ],
    projects: "Type 'projects' to view my portfolio",
    help: "Available commands: whoami, skills, projects, contact, clear, help",
    contact: "Email: john.doe@example.com\nGitHub: github.com/johndoe\nLinkedIn: linkedin.com/in/johndoe",
    clear: "Clearing terminal...",
    '*': "Command not found. Type 'help' for available commands."
  };

  const addLine = (prompt: string, text: string, isCommand: boolean, isTyping = false) => {
    setLines(prev => [...prev, { prompt, text, isCommand, isTyping }]);
  };

  const processCommand = async (cmd: string) => {
    setIsProcessing(true);
    addLine('$ ', cmd, true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const command = cmd.trim().toLowerCase();
    
    if (command === 'clear') {
      setLines([]);
    } else if (command in commands) {
      if (Array.isArray(commands[command as keyof typeof commands])) {
        const items = commands[command as keyof typeof commands] as string[];
        addLine('> ', items.join('\n'), false);
      } else {
        addLine('> ', commands[command as keyof typeof commands] as string, false);
      }
    } else {
      addLine('> ', commands['*'] as string, false);
    }
    
    setIsProcessing(false);
    setCurrentInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() && !isProcessing) {
      processCommand(currentInput);
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Auto-scroll to bottom when lines change
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Process initial command on mount
  useEffect(() => {
    if (initialCommand) {
      processCommand(initialCommand);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Typewriter effect for new lines
  useEffect(() => {
    const typingLines = lines.filter(line => line.isTyping);
    if (typingLines.length > 0) {
      const lastTypingLine = typingLines[typingLines.length - 1];
      const fullText = lastTypingLine.text;
      let i = 0;
      
      const typeNextChar = () => {
        if (i < fullText.length) {
          setLines(prevLines => 
            prevLines.map((line, idx) => 
              idx === prevLines.length - 1
                ? { ...line, text: fullText.substring(0, i + 1) }
                : line
            )
          );
          i++;
          setTimeout(typeNextChar, 30);
        } else {
          setLines(prevLines => 
            prevLines.map((line, idx) => 
              idx === prevLines.length - 1
                ? { ...line, isTyping: false }
                : line
            )
          );
        }
      };
      
      typeNextChar();
    }
  }, [lines]);

  return (
    <motion.div 
      className="terminal-container w-full max-w-3xl mx-auto rounded-lg shadow-lg overflow-hidden border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={focusInput}
    >
      <div className="flex items-center justify-between p-2 bg-black/50 border-b border-white/10">
        <div className="flex items-center space-x-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-400">terminal@portfolio</div>
        <div className="w-16"></div>
      </div>
      
      <div 
        ref={terminalRef} 
        className="p-4 h-80 overflow-y-auto bg-gray-900/95 backdrop-blur-sm"
      >
        {lines.map((line, index) => (
          <div key={index} className="terminal-line">
            <span className="terminal-prompt">{line.prompt}</span>
            <span className="terminal-output whitespace-pre-line">{line.text}</span>
            {line.isTyping && <span className="typing-cursor"></span>}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="terminal-line mt-2">
          <span className="terminal-prompt">$ </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className="bg-transparent outline-none terminal-output w-full"
            disabled={isProcessing}
            autoFocus
          />
        </form>
      </div>
    </motion.div>
  );
};

export default Terminal;
