import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

interface ChatMessage {
  _id: string;
  sender: "User" | "Bot";
  message: string;
  timestamp: string;
}

interface ConversationResponse {
  message: string;
  conversation: {
    _id: string;
    userId: string;
    messages: ChatMessage[];
  };
}

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getCookie = (name: string) => {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`))
      ?.split('=')[1];
  };

  const token = getCookie('token');

  useEffect(() => {
    fetchConversation();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversation = async () => {
    try {
      const response = await fetch('http://localhost:4444/api/users/chatbot/message', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to fetch conversation history');

      const data = await response.json();
      if (data.conversation && data.conversation.messages) {
        setMessages(data.conversation.messages);
      }
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const tempUserMessage: ChatMessage = {
      _id: Date.now().toString(),
      sender: "User",
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, tempUserMessage]);
    setNewMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4444/api/users/chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ message: tempUserMessage.message })
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data: ConversationResponse = await response.json();
      if (data.conversation && data.conversation.messages) {
        const latestMessages = data.conversation.messages.slice(-2);
        setMessages(prev => {
          const withoutTemp = prev.filter(msg => msg._id !== tempUserMessage._id);
          return [...withoutTemp, ...latestMessages];
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (text: string) => {
    const formattedText = text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/\*\s+(.+)/g, '<li>$1</li>')
      .replace(/<li>/g, '<ul><li>')
      .replace(/<\/li>/g, '</li></ul>')
      .replace(/<\/ul><ul>/g, '');

    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  return (
    <div className="h-screen flex flex-col p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">AI Health Assistant</h1>

      <div className="flex flex-col flex-1 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
          {messages.map(message => (
            <div
              key={message._id}
              className={`flex ${message.sender === "User" ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-lg px-3 py-2 md:px-4 md:py-3 text-sm md:text-base ${
                  message.sender === "User"
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-white'
                }`}
              >
                {formatMessage(message.message)}
                <span className="text-xs text-gray-400 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-white rounded-lg p-3 md:p-4 max-w-[75%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-3 md:p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask about your medications..."
              className="flex-1 bg-gray-700 rounded-lg px-3 md:px-4 py-2 focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`rounded-lg px-3 py-2 md:px-4 md:py-2 ${
                isLoading ? 'bg-gray-600' : 'bg-purple-600 hover:bg-purple-700'
              }`}
              disabled={isLoading}
            >
              <Send className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
