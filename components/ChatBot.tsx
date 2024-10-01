'use client';

import React, { useState, useCallback } from 'react';
import { useEditorStore } from '@/store/editorStore';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatBot: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { code, setCode } = useEditorStore();

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage], code }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);

      // Apply changes to the code if suggested
      if (data.response) {
        setCode(data.response);
        console.log(code);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error processing your request.' }]);
    }
  }, [input, messages, code, setCode]);

  return (
    <div className="fixed right-5 bottom-5 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col">
      <div className="p-3 border-b flex justify-between items-center">
        <span className="font-bold">ChatBot</span>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>
      <div className="flex-1 overflow-auto p-3">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className="font-bold">{msg.role === 'user' ? 'You: ' : 'Assistant: '}</span>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="p-3 border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="flex-1 border rounded-l-md px-2 py-1"
            placeholder="Type your message..."
          />
          <button 
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-1 rounded-r-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};