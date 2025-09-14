"use client";

import { useState } from "react";

interface Recommendation {
  rank: number;
  brand: string;
  model: string;
  price: number;
  key_features: string[];
  why_recommended: string;
  pros: string[];
  cons: string[];
  purchase_links: {
    Tokopedia?: string;
    Shopee?: string;
    "Tiktok Shop"?: string;
  };
}

interface EarAnalysis {
  measurements: {
    ear_canal_diameter_mm: number;
    concha_width_mm: number;
    concha_depth_mm: number;
    overall_ear_height_mm: number;
    overall_ear_width_mm: number;
    size_category: string;
    coordinates: {
      ear_bounding_box: {
        top_left: number[];
        bottom_right: number[];
        center: number[];
      };
      head_bounding_box: {
        top_left: number[];
        bottom_right: number[];
        center: number[];
      };
      ear_canal_center: number[];
      concha_boundary: number[][];
      measurement_lines: Array<{
        from: number[];
        to: number[];
        label: string;
        description: string;
      }>;
      key_landmarks: {
        ear_lobe: number[];
        ear_top: number[];
        tragus: number[];
      };
    };
    confidence: string;
    notes: string;
  };
  recommendations: Array<{
    tws_id: string;
    brand: string;
    model: string;
    type: string;
    fit_score: number;
    fit_reason: string;
    physical_dimensions: {
      earbud: {
        length_mm: number;
        width_mm: number;
        weight_grams: number;
        has_stem: boolean;
      };
      case: {
        length_mm: number;
        width_mm: number;
        height_mm: number;
        weight_grams: number;
      };
      fit_size: string;
      ear_canal_diameter_range: {
        min_mm: number;
        max_mm: number;
      };
    };
    price: number;
    tier_rating: string;
  }>;
  annotated_image: string;
  analysis_confidence: string;
}

interface RecommendationResponseProps {
  recommendations: Recommendation[];
  reasoning: string;
  confidence_score: number;
  sources: string[];
  ear_analysis: EarAnalysis;
  has_visual_proof: boolean;
}

export default function RecommendationResponse({
  recommendations,
  reasoning,
  confidence_score,
  sources,
  ear_analysis,
  has_visual_proof,
}: RecommendationResponseProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M IDR`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K IDR`;
    }
    return `${amount.toLocaleString("id-ID")} IDR`;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "SS":
        return "badge-error";
      case "S":
        return "badge-warning";
      case "A":
        return "badge-success";
      case "B":
        return "badge-info";
      default:
        return "badge-neutral";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with confidence score */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Audio Recommendations</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/70">Confidence:</span>
          <div className="badge badge-primary">
            {Math.round(confidence_score * 100)}%
          </div>
        </div>
      </div>

      {/* Visual proof indicator */}
      {has_visual_proof && (
        <div className="alert alert-info">
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span>Analysis includes visual ear measurements</span>
        </div>
      )}

      {/* Ear Analysis Summary */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-4">
          <h4 className="card-title text-sm">Ear Analysis Summary</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="font-medium">Canal Diameter:</span>{" "}
              {ear_analysis.measurements.ear_canal_diameter_mm}mm
            </div>
            <div>
              <span className="font-medium">Size Category:</span>{" "}
              {ear_analysis.measurements.size_category}
            </div>
            <div>
              <span className="font-medium">Confidence:</span>{" "}
              {ear_analysis.measurements.confidence}
            </div>
            <div>
              <span className="font-medium">Analysis:</span>{" "}
              {ear_analysis.analysis_confidence}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Accordion */}
      <div className="space-y-2">
        {recommendations.map((rec, index) => (
          <div
            key={rec.rank}
            className="collapse collapse-arrow bg-base-100 shadow-sm"
          >
            <input
              type="radio"
              name="recommendations-accordion"
              defaultChecked={index === 0}
            />
            <div className="collapse-title text-lg font-medium">
              <div className="flex items-center justify-between">
                <span>
                  #{rec.rank} {rec.brand} {rec.model}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">
                    {formatCurrency(rec.price)}
                  </span>
                  <div className={`badge ${getTierColor("S")}`}>S</div>
                </div>
              </div>
            </div>
            <div className="collapse-content">
              <div className="space-y-4 pt-2">
                {/* Why Recommended */}
                <div>
                  <h5 className="font-medium text-sm mb-2">Why Recommended</h5>
                  <p className="text-sm text-base-content/80">
                    {rec.why_recommended}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h5 className="font-medium text-sm mb-2">Key Features</h5>
                  <div className="flex flex-wrap gap-1">
                    {rec.key_features.map((feature, idx) => (
                      <span key={idx} className="badge badge-outline badge-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2 text-success">
                      Pros
                    </h5>
                    <ul className="text-sm space-y-1">
                      {rec.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-success">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm mb-2 text-error">
                      Cons
                    </h5>
                    <ul className="text-sm space-y-1">
                      {rec.cons.map((con, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-error">✗</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Purchase Links */}
                <div>
                  <h5 className="font-medium text-sm mb-2">Where to Buy</h5>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(rec.purchase_links).map(
                      ([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline"
                        >
                          {platform}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reasoning */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-4">
          <h4 className="card-title text-sm">Analysis Reasoning</h4>
          <p className="text-sm text-base-content/80">{reasoning}</p>
        </div>
      </div>

      {/* Sources */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-4">
          <h4 className="card-title text-sm">Sources</h4>
          <ul className="text-xs space-y-1">
            {sources.map((source, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{source}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
