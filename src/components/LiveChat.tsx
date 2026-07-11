import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, ShieldCheck } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { ROOMS } from '../data/mockData';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

export const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { setSearchParams } = useBooking();

  const initialBotMessage = {
    id: 'init-1',
    sender: 'bot' as const,
    text: "Hello! Welcome to M&J Luxurious Guest House. I am your digital concierge. How can I assist you with your stay in Douala today?",
    timestamp: new Date(),
  };

  useEffect(() => {
    setMessages([initialBotMessage]);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const quickReplies = [
    { text: "What are your room rates?", id: "q-1" },
    { text: "Do you have constant power?", id: "q-2" },
    { text: "How do I book a room?", id: "q-3" },
    { text: "What attractions are nearby?", id: "q-4" },
  ];

  const getBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    if (text.includes('rate') || text.includes('price') || text.includes('cost') || text.includes('room')) {
      const roomPrices = ROOMS.map(r => `${r.name}: ${r.price.toLocaleString()} XAF`).join('\n• ');
      return `Our current room rates per night are:\n• ${roomPrices}\n\nAll bookings include a complementary breakfast!`;
    }
    if (text.includes('power') || text.includes('light') || text.includes('electricity') || text.includes('generator') || text.includes('outage')) {
      return "Yes! M&J Luxurious Guest House is equipped with a high-capacity, automatic-switch standby diesel generator and a private water borehole system. You will enjoy 100% constant power, heating, and water throughout your stay.";
    }
    if (text.includes('book') || text.includes('reserve') || text.includes('payment') || text.includes('checkout')) {
      return "You can book directly on our website! Browse our Suites page, choose your dates, fill in your guest details, and complete payment securely via MTN Mobile Money, Orange Money, or Credit Card. You will receive an instant confirmation ticket.";
    }
    if (text.includes('attraction') || text.includes('visit') || text.includes('nearby') || text.includes('mountain') || text.includes('beach')) {
      return "We are ideally located close to the Wouri River & Bonabéri Bridge (8 km). Doual'art Gallery is only about 6 km away. You can explore details on our Location page!";
    }
    if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('greetings')) {
      return "Hi there! Feel free to ask me about room availability, rates, power backup systems, or location details in Douala.";
    }
    return "Thank you for reaching out! I'm best at answering questions about room rates, bookings, amenities (like our constant power generator), and local attractions in Douala. You can also chat directly with our front desk using the WhatsApp button on the bottom left.";
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: getBotResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputVal);
  };

  return (
    <div id="live-chat-widget" className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          id="chat-toggle-btn"
          onClick={() => setIsOpen(true)}
          className="bg-gold hover:bg-gold-dark text-cream-light p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold hover:scale-105 group"
          aria-label="Open concierge support chat"
        >
          <span className="absolute inset-0 rounded-full bg-gold/40 -z-10 animate-ping group-hover:animate-none"></span>
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-14 bg-charcoal text-cream-light text-xs font-medium px-2.5 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-gold/15">
            Concierge Chat
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          id="chat-window"
          className="bg-cream-light w-[350px] max-w-[calc(100vw-2rem)] h-[480px] rounded-2xl shadow-2xl flex flex-col border border-gold/20 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {/* Header */}
          <div className="bg-charcoal text-cream-light px-4 py-3 flex items-center justify-between border-b border-gold/15">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gold/25 flex items-center justify-center border border-gold/40 text-gold">
                <User className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm font-semibold tracking-wide">Concierge Assistant</span>
                <span className="text-[10px] text-sage font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#25D366]" /> Online | M&J Luxurious Guest House
                </span>
              </div>
            </div>
            <button
              id="chat-close-btn"
              onClick={() => setIsOpen(false)}
              className="text-cream-dark hover:text-gold transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3.5 bg-cream-light/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gold text-cream-light rounded-br-none'
                      : 'bg-cream border border-gold/15 text-charcoal rounded-bl-none whitespace-pre-line'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-cream border border-gold/10 text-charcoal-light rounded-2xl rounded-bl-none px-3.5 py-2 text-xs flex items-center gap-1 shadow-sm">
                  <span>Assistant is writing</span>
                  <span className="flex gap-0.5 mt-0.5">
                    <span className="w-1 h-1 bg-gold rounded-full animate-bounce delay-75"></span>
                    <span className="w-1 h-1 bg-gold rounded-full animate-bounce delay-150"></span>
                    <span className="w-1 h-1 bg-gold rounded-full animate-bounce delay-300"></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 py-2 bg-cream/30 border-t border-gold/5 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply.id}
                  onClick={() => handleSendMessage(reply.text)}
                  className="bg-cream border border-gold/25 hover:border-gold text-charcoal-light hover:text-gold text-xs px-2.5 py-1.5 rounded-full transition-all text-left shadow-sm"
                >
                  {reply.text}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-gold/15 bg-cream flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask a question..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-grow bg-cream-light border border-gold/15 text-charcoal placeholder-charcoal-light/40 px-3.5 py-2 text-sm rounded-full focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="bg-gold hover:bg-gold-dark text-cream-light p-2 rounded-full transition-all shadow-sm shrink-0 disabled:bg-gold/45"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
