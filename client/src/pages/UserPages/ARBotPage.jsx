import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, X } from 'lucide-react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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", // Make sure to add your API key to .env file
  dangerouslyAllowBrowser: true // Only for development, handle API calls through backend in production
});

const ARBotPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to AR HUB", sender: 'bot' },
    { id: 2, text: "How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (input.trim()) {
      // Add user message
      const userMessage = { id: Date.now(), text: input, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);

      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              "role": "system",
              "content": `You are AR Hub's AI assistant. AR Hub is an Accessibility Resource Hub that provides assistive technologies and resources for people with disabilities. 

              Your key areas of expertise include:
              1. Screen readers (NVDA, JAWS, VoiceOver)
              2. Web accessibility guidelines (WCAG)
              3. Assistive technologies for various disabilities
              4. Audio books and text-to-speech solutions
              5. Accessibility evaluation tools
              6. Document accessibility
              7. Mobile accessibility
              8. Assistive hardware devices

              When answering:
              - Be concise but informative
              - Focus on practical solutions
              - Mention specific tools when relevant
              - Stay up-to-date with accessibility standards
              - Be supportive and understanding
              - Avoid technical jargon unless necessary
              - Provide step-by-step guidance when needed

              Remember that users may have various disabilities, so be clear and considerate in your responses.`
            },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            {
              "role": "user",
              "content": input
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        });

        const botMessage = {
          id: Date.now(),
          text: response.choices[0].message.content,
          sender: 'bot'
        };
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('OpenAI API Error:', error);
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
          sender: 'bot'
        }]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition duration-300"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-96 max-w-full flex flex-col h-[32rem]">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-xl font-bold">AR Bot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                    <span className="font-semibold">
                      {message.sender === 'user' ? 'You' : 'AR Bot'}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-lg p-3 max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={isTyping}
                className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARBotPage;