"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import RecommendationResponse from "./components/RecommendationResponse";
import {
  api,
  RecommendationRequest,
  RecommendationResponse as ApiRecommendationResponse,
  ApiError,
} from "../lib/api";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  recommendationData?: ApiRecommendationResponse; // For structured recommendation responses
  error?: string; // For error messages
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
      content:
        "Hello! I'm ALMA (Ask LLaMA Model Audio), your AI audio assistant. How can I help you today?",
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
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      // Prepare API request parameters
      const request: RecommendationRequest = {
        query: currentMessage,
        budget_min: filterParams.minBudget
          ? parseFloat(filterParams.minBudget)
          : undefined,
        budget_max: filterParams.maxBudget
          ? parseFloat(filterParams.maxBudget)
          : undefined,
        use_case: filterParams.primaryUseCase,
        image: filterParams.earPhoto || undefined,
      };

      // Call the API
      const response = await api.getRecommendation(request);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Here are my personalized audio recommendations based on your preferences:",
        role: "assistant",
        timestamp: new Date(),
        recommendationData: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("API Error:", error);

      let errorMessage =
        "I'm sorry, I encountered an error while processing your request.";

      if (error instanceof ApiError) {
        if (error.status === 500) {
          errorMessage =
            "The server is currently experiencing issues. Please try again later.";
        } else if (error.status === 400) {
          errorMessage =
            "There was an issue with your request. Please check your input and try again.";
        } else if (error.status === 404) {
          errorMessage =
            "The recommendation service is not available. Please try again later.";
        }
      }

      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: errorMessage,
        role: "assistant",
        timestamp: new Date(),
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
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
        content:
          "Hello! I'm ALMA (Ask LLaMA Model Audio), your AI audio assistant. How can I help you today?",
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
      <div className="drawer-content flex flex-col h-screen">
        {/* Header */}
        <div className="navbar bg-base-200 flex-shrink-0">
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
            <h1 className="text-xl font-bold ml-4">ALMA</h1>
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
                {message.role === "user" ? "You" : "ALMA"}
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
                    : message.error
                    ? "chat-bubble-error"
                    : "chat-bubble-neutral"
                }`}
              >
                {message.content}
                {message.recommendationData && (
                  <div className="mt-4">
                    <RecommendationResponse {...message.recommendationData} />
                  </div>
                )}
                {message.error && (
                  <div className="mt-2 text-xs opacity-75">
                    Error: {message.error}
                  </div>
                )}
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
        <div className="p-4 border-t bg-base-100 flex-shrink-0">
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
