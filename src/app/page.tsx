"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import RecommendationResponse from "./components/RecommendationResponse";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  recommendationData?: any; // For structured recommendation responses
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

  const getExampleRecommendationData = () => {
    return {
      recommendations: [
        {
          rank: 1,
          brand: "Sony",
          model: "LinkBuds Fit",
          price: 2799000,
          key_features: [
            "Exceptional fitting",
            "Same high-quality driver as XM5",
            "Advanced ANC technology",
          ],
          why_recommended:
            "The Sony LinkBuds Fit is recommended for its exceptional comfort and fitting, making it suitable for long listening sessions and extended wear. It features the same high-quality driver and ANC technology as the Sony XM5, ensuring excellent sound quality and noise cancellation.",
          pros: [
            "Sony's lightest and most comfortable earbuds",
            "Exceptional fitting",
            "Excellent resolution, clarity, and staging",
            "Better microphone performance than XM5",
          ],
          cons: [
            "ANC allows some treble frequencies to pass through",
            "Feature set can be overwhelming",
          ],
          purchase_links: {
            Tokopedia:
              "https://www.tokopedia.com/sony-center-official/sony-wf-ls910n-linkbuds-fit-truly-wireless-earbuds-with-noise-canceling-black-9c537",
            Shopee: "https://shopee.co.id/product/371353896/27364735345",
            "Tiktok Shop":
              "https://shop-id.tokopedia.com/view/product/1730811847233275332",
          },
        },
        {
          rank: 2,
          brand: "Sennheiser",
          model: "Momentum True Wireless 4",
          price: 3999000,
          key_features: [
            "Authentic Sennheiser signature sound",
            "Great depth, imaging, and separation",
            "Major battery upgrade",
          ],
          why_recommended:
            "The Sennheiser Momentum True Wireless 4 is recommended for its authentic Sennheiser signature sound and significant battery life improvements. It offers great depth, imaging, and separation, making it ideal for audiophile listening.",
          pros: [
            "Authentic Sennheiser signature sound in TWS format",
            "Great depth, imaging, and separation",
            "Sweet and deep sub-bass response",
            "Stellar mids and clarity performance",
          ],
          cons: [
            "Soundstage not as open as competitors",
            "Less spacious than Huawei/Samsung alternatives",
          ],
          purchase_links: {
            Tokopedia:
              "https://www.tokopedia.com/sennheiser-consumer-hearing-id/sennheiser-momentum-true-wireless-4-earbuds-black-copper-c7d92",
            Shopee:
              "https://shopee.co.id/SENNHEISER-Momentum-True-Wireless-4-Earbuds-i.450998050.23089975997",
            "Tiktok Shop": "https://vt.tokopedia.com/t/ZSHtWRa9rbNPr-JP0Ku/",
          },
        },
        {
          rank: 3,
          brand: "Bose",
          model: "QuietComfort Earbuds",
          price: 2549000,
          key_features: [
            "Excellent default tuning",
            "Luxurious sound presentation",
            "Unmatched ANC performance",
          ],
          why_recommended:
            "The Bose QuietComfort Earbuds are recommended for their excellent default tuning and outstanding ANC performance. They offer a luxurious sound presentation and satisfy both casual and audiophile listeners.",
          pros: [
            "Excellent default tuning with good timbre",
            "Luxurious and grand sound presentation",
            "Deep and satisfying bass response",
            "Unmatched ANC performance at price point",
          ],
          cons: [
            "No aptX codec support",
            "Treble clarity could be better for sensitive listeners",
          ],
          purchase_links: {
            Tokopedia:
              "https://www.tokopedia.com/bose/bose-quietcomfort-earbuds-anc-noise-cancelling-tws-earphone-1730244414894998920",
            Shopee: "https://shopee.co.id/product/173892094/29013893251",
            "Tiktok Shop":
              "https://shop-id.tokopedia.com/view/product/1730244454765528456",
          },
        },
      ],
      reasoning:
        "Based on the image, the user has average-sized ears. The Sony LinkBuds Fit is recommended first due to its exceptional comfort and fitting. The Sennheiser Momentum True Wireless 4 is recommended for its authentic Sennheiser sound and improved battery life. The Bose QuietComfort Earbuds are recommended for their excellent sound quality and outstanding ANC performance.\n\n🎯 VISUAL EAR ANALYSIS:\nBased on your ear photo, I measured your ear canal diameter as 7.2mm. The annotated image shows exactly how the recommended TWS will fit your ear.",
      confidence_score: 0.85,
      sources: [
        "Sennheiser Momentum True Wireless 4 specifications data",
        "Edifier Stax Spirit S3 specifications data",
        "Bose QuietComfort Earbuds specifications data",
        "Sony LinkBuds Fit specifications data",
        "Samsung Galaxy Buds 3 Pro specifications data",
      ],
      ear_analysis: {
        measurements: {
          ear_canal_diameter_mm: 7.2,
          concha_width_mm: 14.5,
          concha_depth_mm: 9.8,
          overall_ear_height_mm: 63.0,
          overall_ear_width_mm: 36.0,
          size_category: "Medium",
          coordinates: {
            ear_bounding_box: {
              top_left: [436, 786],
              bottom_right: [531, 951],
              center: [483, 869],
            },
            head_bounding_box: {
              top_left: [273, 596],
              bottom_right: [709, 1134],
              center: [491, 865],
            },
            ear_canal_center: [493, 869],
            concha_boundary: [
              [479, 858],
              [507, 858],
              [507, 880],
              [479, 880],
            ],
            measurement_lines: [
              {
                from: [478, 869],
                to: [508, 869],
                label: "canal_diameter",
                description: "Ear canal opening width",
              },
              {
                from: [479, 859],
                to: [507, 859],
                label: "concha_width",
                description: "Concha bowl width",
              },
              {
                from: [517, 786],
                to: [517, 951],
                label: "ear_height",
                description: "Overall ear height",
              },
            ],
            key_landmarks: {
              ear_lobe: [455, 951],
              ear_top: [464, 786],
              tragus: [502, 885],
            },
          },
          confidence: "high",
          notes: "Ear detected with 0.07 confidence",
        },
        recommendations: [
          {
            tws_id: "bose_quietcomfort_earbuds",
            brand: "Bose",
            model: "QuietComfort Earbuds",
            type: "earbud",
            fit_score: 90.0,
            fit_reason:
              "Your ear canal diameter (7.2mm) fits well within this Medium TWS range (6.0-8.0mm)",
            physical_dimensions: {
              earbud: {
                length_mm: 30.5,
                width_mm: 17.3,
                weight_grams: 6.0,
                has_stem: false,
              },
              case: {
                length_mm: 66.3,
                width_mm: 59.4,
                height_mm: 26.7,
                weight_grams: 60.0,
              },
              fit_size: "Medium",
              ear_canal_diameter_range: { min_mm: 6.0, max_mm: 8.0 },
            },
            price: 2549000.0,
            tier_rating: "S",
          },
        ],
        annotated_image: "base64 code",
        analysis_confidence: "high",
      },
      has_visual_proof: true,
    };
  };

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

    // Simulate AI response with recommendation data
    setTimeout(() => {
      const isRecommendationRequest =
        inputMessage.toLowerCase().includes("recommend") ||
        inputMessage.toLowerCase().includes("suggest") ||
        inputMessage.toLowerCase().includes("audio") ||
        inputMessage.toLowerCase().includes("earbuds");

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: isRecommendationRequest
          ? "Here are my personalized audio recommendations based on your preferences:"
          : `I received your message: "${inputMessage}". Based on your budget range of ${formatCurrency(
              filterParams.minBudget
            )} - ${formatCurrency(
              filterParams.maxBudget
            )} and use case: ${filterParams.primaryUseCase.replace(
              "-",
              " "
            )}, I can help you find the perfect audio solution!`,
        role: "assistant",
        timestamp: new Date(),
        recommendationData: isRecommendationRequest
          ? getExampleRecommendationData()
          : undefined,
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
                    : "chat-bubble-neutral"
                }`}
              >
                {message.content}
                {message.recommendationData && (
                  <div className="mt-4">
                    <RecommendationResponse {...message.recommendationData} />
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
