import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

export const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi! How can we help you today?', sender: 'bot', time: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const mockReplies = [
    "Thanks for reaching out! Our team will get back to you shortly.",
    "That's a great question! Let me connect you with our specialist.",
    "We'd love to help you with that. Can you provide more details?",
    "Our business hours are Mon-Fri, 9AM-6PM. We'll respond as soon as possible!",
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      time: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    setTimeout(() => {
      const reply = {
        id: messages.length + 2,
        text: mockReplies[Math.floor(Math.random() * mockReplies.length)],
        sender: 'bot',
        time: new Date()
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 z-50 flex h-[500px] w-[350px] flex-col rounded-2xl bg-dark-900 shadow-2xl"
          >
            <div className="flex items-center justify-between rounded-t-2xl bg-primary-600 p-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Live Chat</h3>
                  <p className="text-xs text-white/80">We're online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-dark-800 text-dark-200'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="border-t border-dark-800 p-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg bg-dark-800 px-4 py-2 min-h-[44px] text-sm text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary-600 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white transition-colors hover:bg-primary-700"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-40 flex h-14 w-14 min-h-[56px] min-w-[56px] items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-all hover:bg-primary-700 hover:shadow-xl"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>
    </>
  );
};
