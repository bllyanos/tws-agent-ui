"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface FilterParams {
  minBudget: string | null;
  maxBudget: string | null;
  primaryUseCase: string;
  earPhoto: File | null;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [filterParams, setFilterParams] = useState<FilterParams>({
    minBudget: null, // Empty by default
    maxBudget: null, // Empty by default
    primaryUseCase: "listening-music",
    earPhoto: null,
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I received your message: "${inputMessage}". Based on your budget range of ${formatCurrency(
          filterParams.minBudget
        )} - ${formatCurrency(
          filterParams.maxBudget
        )} and use case: ${filterParams.primaryUseCase.replace(
          "-",
          " "
        )}, I can help you find the perfect audio solution!`,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFilterParamsChange = (newParams: FilterParams) => {
    setFilterParams(newParams);
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: "1",
        content: "Hello! I'm your AI assistant. How can I help you today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ]);
    setInputMessage("");
  };

  const formatCurrency = (amount: string | null) => {
    if (!amount) return "Not set";
    const numAmount = parseFloat(amount) || 0;
    if (numAmount >= 1000000) {
      return `${(numAmount / 1000000).toFixed(1)}M IDR`;
    } else if (numAmount >= 1000) {
      return `${(numAmount / 1000).toFixed(0)}K IDR`;
    }
    return `${numAmount.toLocaleString("id-ID")} IDR`;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="drawer lg:drawer-open h-screen">
      <input id="filter-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main chat area */}
      <div className="drawer-content flex flex-col">
        {/* Header */}
        <div className="navbar bg-base-200">
          <div className="navbar-start">
            <label
              htmlFor="filter-drawer"
              className="btn btn-square btn-ghost lg:hidden"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <button
              className="btn btn-primary btn-sm ml-4"
              onClick={handleNewChat}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Chat
            </button>
            <h1 className="text-xl font-bold ml-4">Audio Assistant</h1>
          </div>
          <div className="navbar-end">
            <div className="badge badge-primary">
              Budget: {formatCurrency(filterParams.minBudget)} -{" "}
              {formatCurrency(filterParams.maxBudget)}
            </div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat ${
                message.role === "user" ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                  {message.role === "user" ? "U" : "AI"}
                </div>
              </div>
              <div className="chat-header">
                {message.role === "user" ? "You" : "Assistant"}
                {isClient && (
                  <time className="text-xs opacity-50">
                    {message.timestamp.toLocaleTimeString()}
                  </time>
                )}
              </div>
              <div
                className={`chat-bubble ${
                  message.role === "user"
                    ? "chat-bubble-primary"
                    : "chat-bubble-neutral"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                  AI
                </div>
              </div>
              <div className="chat-bubble chat-bubble-neutral">
                <span className="loading loading-dots loading-sm"></span>
              </div>
            </div>
          )}
        </div>

        {/* Message input */}
        <div className="p-4 border-t bg-base-100">
          <div className="flex gap-2">
            <textarea
              className="textarea textarea-bordered flex-1 resize-none"
              placeholder="Type your message here..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
              disabled={isLoading}
            />
            <button
              className="btn btn-primary"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filter sidebar */}
      <Sidebar
        filterParams={filterParams}
        onFilterParamsChange={handleFilterParamsChange}
      />
    </div>
  );
}
