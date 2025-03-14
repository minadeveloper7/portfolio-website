
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Code, Copy, Check } from 'lucide-react';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  requestBody?: string;
  response: string;
}

const ApiPlayground: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseVisible, setResponseVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints: Endpoint[] = [
    {
      method: 'GET',
      path: '/api/projects',
      description: 'Fetch all projects',
      response: JSON.stringify({
        success: true,
        data: [
          { id: 1, name: 'E-commerce API', tech: ['Node.js', 'Express', 'MongoDB'] },
          { id: 2, name: 'Real-time Chat', tech: ['Socket.io', 'Redis', 'React'] },
          { id: 3, name: 'Analytics Dashboard', tech: ['Python', 'FastAPI', 'PostgreSQL'] }
        ]
      }, null, 2)
    },
    {
      method: 'GET',
      path: '/api/projects/:id',
      description: 'Fetch a specific project',
      response: JSON.stringify({
        success: true,
        data: {
          id: 1,
          name: 'E-commerce API',
          description: 'A scalable REST API for e-commerce applications',
          tech: ['Node.js', 'Express', 'MongoDB'],
          features: ['User authentication', 'Product catalog', 'Order management', 'Payment processing'],
          github: 'https://github.com/johndoe/ecommerce-api'
        }
      }, null, 2)
    },
    {
      method: 'POST',
      path: '/api/contact',
      description: 'Send a contact message',
      requestBody: JSON.stringify({
        name: 'Your Name',
        email: 'your.email@example.com',
        message: 'Hello, I would like to discuss a project!'
      }, null, 2),
      response: JSON.stringify({
        success: true,
        message: 'Message sent successfully!',
        ticketId: 'MSG-12345'
      }, null, 2)
    },
    {
      method: 'PUT',
      path: '/api/user/preferences',
      description: 'Update user preferences',
      requestBody: JSON.stringify({
        theme: 'dark',
        notifications: {
          email: true,
          push: false
        }
      }, null, 2),
      response: JSON.stringify({
        success: true,
        data: {
          userId: 'usr_123',
          preferences: {
            theme: 'dark',
            notifications: {
              email: true,
              push: false
            }
          },
          updatedAt: '2023-06-15T14:22:34Z'
        }
      }, null, 2)
    }
  ];

  const handleEndpointSelect = (endpoint: Endpoint) => {
    setSelectedEndpoint(endpoint);
    setResponseVisible(false);
  };

  const handleExecute = () => {
    if (!selectedEndpoint) return;
    
    setIsLoading(true);
    setResponseVisible(false);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setResponseVisible(true);
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'POST': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'PUT': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'DELETE': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">API Playground</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h3 className="text-lg font-medium mb-3">Endpoints</h3>
          
          <div className="space-y-2">
            {endpoints.map((endpoint) => (
              <motion.button
                key={endpoint.path}
                className={`w-full p-3 rounded-lg border text-left transition-all ${
                  selectedEndpoint?.path === endpoint.path
                    ? 'glass border-primary/50'
                    : 'bg-secondary/50 border-white/5 hover:bg-secondary'
                }`}
                onClick={() => handleEndpointSelect(endpoint)}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${getMethodColor(endpoint.method)}`}>
                      {endpoint.method}
                    </span>
                    <span className="font-mono text-sm truncate">{endpoint.path}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">{endpoint.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {selectedEndpoint ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${getMethodColor(selectedEndpoint.method)}`}>
                    {selectedEndpoint.method}
                  </span>
                  <code className="font-mono text-sm bg-background/50 px-2 py-1 rounded">
                    {selectedEndpoint.path}
                  </code>
                </div>
                
                <motion.button
                  className="flex items-center space-x-1 py-1 px-3 rounded-md bg-primary/10 text-sm hover:bg-primary/20 transition-colors"
                  onClick={handleExecute}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  <span>Execute</span>
                </motion.button>
              </div>
              
              {selectedEndpoint.requestBody && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Request Body</h4>
                    <button 
                      className="text-xs flex items-center space-x-1 text-muted-foreground hover:text-foreground"
                      onClick={() => copyToClipboard(selectedEndpoint.requestBody!)}
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="relative glass rounded-md overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-8 flex items-center px-3 border-b border-white/5">
                      <Code className="w-4 h-4 text-muted-foreground" />
                      <span className="ml-2 text-xs text-muted-foreground">JSON</span>
                    </div>
                    <pre className="p-3 pt-10 text-xs font-mono text-foreground/80 overflow-x-auto">
                      {selectedEndpoint.requestBody}
                    </pre>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Response</h4>
                  {responseVisible && (
                    <button 
                      className="text-xs flex items-center space-x-1 text-muted-foreground hover:text-foreground"
                      onClick={() => copyToClipboard(selectedEndpoint.response)}
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  )}
                </div>
                <div className="relative glass rounded-md overflow-hidden min-h-[200px] flex items-center justify-center">
                  {responseVisible ? (
                    <>
                      <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-3 border-b border-white/5">
                        <div className="flex items-center">
                          <Code className="w-4 h-4 text-muted-foreground" />
                          <span className="ml-2 text-xs text-muted-foreground">JSON</span>
                        </div>
                        <div className="text-xs text-green-400">200 OK</div>
                      </div>
                      <motion.pre 
                        className="p-3 pt-10 text-xs font-mono text-foreground/80 overflow-x-auto w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {selectedEndpoint.response}
                      </motion.pre>
                    </>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      {isLoading ? 'Fetching response...' : 'Click "Execute" to see the response'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center border border-dashed border-white/10 rounded-lg p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-secondary mb-4">
                  <Code className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">Select an endpoint</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose an API endpoint from the list to try it out
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiPlayground;
