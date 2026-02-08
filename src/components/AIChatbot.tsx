import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const aiResponses = {
  greeting: "Hello! I'm Sahayak, your AI support assistant. I'm here to help you navigate our services and answer your questions about cancer care support. How can I assist you today?",
  financial: "For financial support, we provide assistance with medical expenses, treatment costs, and medication. Our team will review your application and connect you with our funding partners within 48 hours.",
  nutritional: "Our nutritional support program includes personalized diet plans, nutritional supplements, and guidance from certified dietitians. We focus on helping patients maintain strength during treatment.",
  emotional: "Emotional support is crucial during cancer treatment. We offer one-on-one counseling, support groups, and 24/7 helpline services. You're not alone in this journey.",
  how: "I can help you understand our services, guide you through the support request process, answer questions about cancer care, and connect you with the right resources. Feel free to ask me anything!",
  default: "I understand your concern. Our team specializes in gallbladder and biliary tract cancer care. Would you like to submit a support request? I can guide you through the process step by step.",
};

function classifyIntent(message: string): keyof typeof aiResponses {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return 'greeting';
  }
  if (lowerMessage.includes('financial') || lowerMessage.includes('money') || lowerMessage.includes('cost')) {
    return 'financial';
  }
  if (lowerMessage.includes('nutrition') || lowerMessage.includes('diet') || lowerMessage.includes('food')) {
    return 'nutritional';
  }
  if (lowerMessage.includes('emotional') || lowerMessage.includes('counseling') || lowerMessage.includes('mental')) {
    return 'emotional';
  }
  if (lowerMessage.includes('how') || lowerMessage.includes('what') || lowerMessage.includes('help')) {
    return 'how';
  }
  return 'default';
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addAIMessage(aiResponses.greeting);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  const streamText = async (text: string) => {
    setIsTyping(true);
    setStreamingText('');

    for (let i = 0; i <= text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      setStreamingText(text.slice(0, i));
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: text,
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);

    setStreamingText('');
    setIsTyping(false);
  };

  const addAIMessage = (text: string) => {
    streamText(text);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const intent = classifyIntent(inputValue);
      addAIMessage(aiResponses[intent]);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-4 bottom-4 w-full sm:w-96 h-[600px] z-50 flex flex-col backdrop-blur-xl bg-white/90 rounded-3xl shadow-2xl border border-white/40 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Sahayak v2.0</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                    <span className="text-teal-100 text-xs">AI Assistant Online</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-slate-50/30">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-orange-500 to-orange-600'
                        : 'bg-gradient-to-br from-teal-500 to-teal-600'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div>
                      <div className={`px-4 py-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
                          : 'bg-white/80 backdrop-blur-sm text-gray-800 shadow-sm border border-gray-100'
                      }`}>
                        {message.text}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 px-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-teal-500 to-teal-600">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm text-gray-800 shadow-sm border border-gray-100">
                      {streamingText}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block w-1 h-4 bg-teal-600 ml-1"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-white/80"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed right-6 bottom-6 z-50 flex items-center gap-3 px-4 py-3 rounded-full bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl hover:shadow-3xl transition-all"
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white"
            />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-gray-800">AI Assistant</div>
            <div className="text-xs text-gray-500">Ask me anything</div>
          </div>
          <MessageCircle className="w-5 h-5 text-teal-600" />
        </motion.button>
      )}
    </>
  );
}
