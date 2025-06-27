import { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Trash2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '@/hooks/use-chat';
import { formatDistanceToNow } from 'date-fns';

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isTyping, sendMessage, clearMessages } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-80 bg-white flex flex-col border-l border-slate-200">
      {/* Chat Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Bot className="text-white w-3 h-3" />
          </div>
          <div>
            <h3 className="font-medium text-slate-900">AI Assistant</h3>
            <p className="text-xs text-slate-500">Ask about your document</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${message.isUser ? 'justify-end' : ''}`}
          >
            {message.isUser ? (
              <>
                <div className="flex-1 text-right">
                  <div className="bg-primary text-white rounded-lg px-3 py-2 text-sm inline-block max-w-xs">
                    <p>{message.content}</p>
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">
                    {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                  </span>
                </div>
                <div className="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="text-white w-3 h-3" />
                </div>
              </>
            ) : (
              <>
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="text-white w-3 h-3" />
                </div>
                <div className="flex-1">
                  <div className="bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-700">
                    <p>{message.content}</p>
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">
                    {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Bot className="text-white w-3 h-3" />
            </div>
            <div className="flex-1">
              <div className="bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-700">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="border-t border-slate-200 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question about the document..."
              className="w-full pr-10 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isTyping}
            />
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-primary transition-colors p-1 h-6 w-6"
            >
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </form>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Info className="w-3 h-3" />
            <span>AI responses are generated</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearMessages}
            className="text-slate-400 hover:text-slate-600 p-1 h-6 w-6"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
