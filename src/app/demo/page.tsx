"use client";

import { useState } from "react";
import RecommendationResponse from "../components/RecommendationResponse";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  recommendationData?: any;
}

export default function DemoPage() {
  const [messages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm ALMA (Ask LLaMA Model Audio), your AI audio assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    },
    {
      id: "2",
      content:
        "Hi! Can you recommend some good earbuds for music listening? I have a budget of around 3 million IDR and I want something with good noise cancellation.",
      role: "user",
      timestamp: new Date(Date.now() - 240000), // 4 minutes ago
    },
    {
      id: "3",
      content:
        "I'd be happy to help you find the perfect earbuds for music listening! Let me analyze your preferences and provide personalized recommendations.",
      role: "assistant",
      timestamp: new Date(Date.now() - 180000), // 3 minutes ago
    },
    {
      id: "4",
      content:
        "Here are my personalized audio recommendations based on your preferences:",
      role: "assistant",
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
      recommendationData: {
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
            tier_rating: "S",
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
            tier_rating: "SS",
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
            tier_rating: "S",
          },
        ],
        reasoning:
          "Based on your budget of 3 million IDR and preference for music listening with noise cancellation, I've selected these three excellent options. The Sony LinkBuds Fit offers the best value within your budget with exceptional comfort and the same driver technology as the premium XM5. The Sennheiser Momentum True Wireless 4 provides authentic audiophile sound quality, while the Bose QuietComfort Earbuds excel in noise cancellation performance.\n\nAUDIO ANALYSIS:\nAll recommendations are optimized for music listening with excellent sound quality, comfort for extended use, and effective noise cancellation features.",
        confidence_score: 0.92,
        sources: [
          "Sennheiser Momentum True Wireless 4 specifications data",
          "Bose QuietComfort Earbuds specifications data",
          "Sony LinkBuds Fit specifications data",
          "Audio quality comparison studies",
          "Noise cancellation performance tests",
        ],
        // ear_analysis: undefined, // This will show the placeholder
        has_visual_proof: false,
      },
    },
    {
      id: "5",
      content:
        "Thank you! The Sony LinkBuds Fit looks perfect for my needs. I'll check out the Tokopedia link you provided.",
      role: "user",
      timestamp: new Date(Date.now() - 60000), // 1 minute ago
    },
    {
      id: "6",
      content:
        "You're very welcome! The Sony LinkBuds Fit is an excellent choice for music listening within your budget. The exceptional comfort and sound quality will definitely enhance your listening experience. Feel free to ask if you have any other questions about audio equipment!",
      role: "assistant",
      timestamp: new Date(Date.now() - 30000), // 30 seconds ago
    },
  ]);

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-2">ALMA Demo</h1>
          <p className="text-center text-base-content/70">
            This is how a real conversation with ALMA looks like
          </p>
        </div>

        <div className="space-y-4">
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
                <time className="text-xs opacity-50">
                  {message.timestamp.toLocaleTimeString()}
                </time>
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
        </div>
      </div>
    </div>
  );
}
