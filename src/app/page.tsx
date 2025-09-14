"use client";

import { useState, useEffect } from "react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface FilterParams {
  minBudget: number;
  maxBudget: number;
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
    minBudget: 0, // 0 IDR default
    maxBudget: 0, // 0 IDR default
    primaryUseCase: "listening-music",
    earPhoto: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const updateFilterParam = (
    key: keyof FilterParams,
    value: number | string | File | null
  ) => {
    setFilterParams((prev) => ({
      ...prev,
      [key]: value,
    }));
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    // Clean up previous image preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    // Create new preview URL if file is selected
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }

    updateFilterParam("earPhoto", file);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M IDR`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K IDR`;
    }
    return `${amount.toLocaleString("id-ID")} IDR`;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cleanup object URL on component unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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
      <div className="drawer-side">
        <label htmlFor="filter-drawer" className="drawer-overlay"></label>
        <div className="min-h-full w-80 bg-base-200 p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Audio Preferences</h2>
            <label
              htmlFor="filter-drawer"
              className="btn btn-sm btn-circle btn-ghost lg:hidden"
            >
              ✕
            </label>
          </div>

          <div className="space-y-6">
            {/* Min Budget Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Min Budget</span>
              </label>
              <div className="join w-full">
                <input
                  type="number"
                  placeholder="0"
                  className="input input-bordered join-item flex-1"
                  value={filterParams.minBudget}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    updateFilterParam("minBudget", value);
                  }}
                />
                <span className="join-item bg-base-300 px-4 flex items-center text-sm">
                  IDR
                </span>
              </div>
              <div className="label">
                <span className="label-text-alt">
                  Enter minimum budget amount
                </span>
              </div>
            </div>

            {/* Max Budget Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Max Budget</span>
              </label>
              <div className="join w-full">
                <input
                  type="number"
                  placeholder="0"
                  className="input input-bordered join-item flex-1"
                  value={filterParams.maxBudget}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    updateFilterParam("maxBudget", value);
                  }}
                />
                <span className="join-item bg-base-300 px-4 flex items-center text-sm">
                  IDR
                </span>
              </div>
              <div className="label">
                <span className="label-text-alt">
                  Enter maximum budget amount
                </span>
              </div>
            </div>

            {/* Primary Use Case */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Primary Use Case</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filterParams.primaryUseCase}
                onChange={(e) =>
                  updateFilterParam("primaryUseCase", e.target.value)
                }
              >
                <option value="listening-music">Listening Music</option>
                <option value="commuting">Commuting</option>
                <option value="professional-audio">Professional Audio</option>
                <option value="gaming">Gaming</option>
                <option value="fitness-sports">Fitness & Sports</option>
                <option value="video-calls">Video Calls</option>
                <option value="noise-cancellation">Noise Cancellation</option>
                <option value="studio-recording">Studio Recording</option>
              </select>
            </div>

            {/* Ear Photo Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Your Ear Photo</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
                onChange={handleFileUpload}
              />
              {filterParams.earPhoto && (
                <div className="mt-2 space-y-2">
                  <div className="alert alert-info">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm">
                      File selected: {filterParams.earPhoto.name}
                    </span>
                  </div>
                  {imagePreview && (
                    <div className="card bg-base-100 shadow-sm">
                      <div className="card-body p-3">
                        <h4 className="card-title text-sm">Preview</h4>
                        <div className="flex justify-center">
                          <img
                            src={imagePreview}
                            alt="Ear photo preview"
                            className="max-w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="label">
                <span className="label-text-alt">
                  Upload a photo of your ear for personalized recommendations
                </span>
              </div>
            </div>

            {/* Reset Button */}
            <div className="pt-4">
              <button
                className="btn btn-outline btn-sm w-full"
                onClick={() => {
                  // Clean up image preview URL
                  if (imagePreview) {
                    URL.revokeObjectURL(imagePreview);
                  }
                  setImagePreview(null);
                  setFilterParams({
                    minBudget: 0,
                    maxBudget: 0,
                    primaryUseCase: "listening-music",
                    earPhoto: null,
                  });
                }}
              >
                Reset to Defaults
              </button>
            </div>

            {/* Current Settings Summary */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body p-4">
                <h3 className="card-title text-sm">Current Preferences</h3>
                <div className="text-xs space-y-1">
                  <div>
                    Budget: {formatCurrency(filterParams.minBudget)} -{" "}
                    {formatCurrency(filterParams.maxBudget)}
                  </div>
                  <div>
                    Use Case: {filterParams.primaryUseCase.replace("-", " ")}
                  </div>
                  <div>
                    Ear Photo:{" "}
                    {filterParams.earPhoto ? "Uploaded" : "Not uploaded"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
