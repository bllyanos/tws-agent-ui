"use client";

import { RecommendationResponse as RecommendationResponseType } from "../../lib/api";

interface RecommendationResponseProps extends RecommendationResponseType {}

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

      {/* Ear Analysis with Annotated Image */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-4">
          <h4 className="card-title text-sm mb-4">Ear Analysis</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Annotated Image */}
            <div className="space-y-2">
              <h5 className="font-medium text-sm">Annotated Ear Photo</h5>
              <div className="relative">
                {ear_analysis.annotated_image &&
                ear_analysis.annotated_image !== "base64 code" ? (
                  <img
                    src={`data:image/jpeg;base64,${ear_analysis.annotated_image}`}
                    alt="Annotated ear analysis"
                    className="w-full h-auto rounded-lg border border-base-300"
                  />
                ) : (
                  // Placeholder image when base64 data is not available
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIHJ4PSIxMCIgZmlsbD0iI0U1RTdFQiIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjQwIiBmaWxsPSIjRDFENUQ5Ii8+CjxjaXJjbGUgY3g9IjE4MCIgY3k9IjEwMCIgcj0iMTUiIGZpbGw9IiNEMUQ1RDkiLz4KPGNpcmNsZSBjeD0iMjIwIiBjeT0iMTAwIiByPSIxNSIgZmlsbD0iI0QxRDVENyIvPgo8cGF0aCBkPSJNMTgwIDE0MEMyMDAgMTYwIDIwMCAxNjAgMjAwIDE2MEMyMDAgMTYwIDIwMCAxNjAgMjIwIDE0MCIgc3Ryb2tlPSIjRDFENUQ5IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8dGV4dCB4PSIyMDAiIHk9IjI0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FYXIgQW5hbHlzaXMgUGxhY2Vob2xkZXI8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMjYwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIHdpbGwgYXBwZWFyIGhlcmU8L3RleHQ+Cjwvc3ZnPgo="
                    alt="Ear analysis placeholder"
                    className="w-full h-auto rounded-lg border border-base-300"
                  />
                )}
              </div>
            </div>

            {/* Right Column - Analysis Summary */}
            <div className="space-y-2">
              <h5 className="font-medium text-sm">Analysis Summary</h5>
              <div className="space-y-3">
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
                    <span className="font-medium">Concha Width:</span>{" "}
                    {ear_analysis.measurements.concha_width_mm}mm
                  </div>
                  <div>
                    <span className="font-medium">Concha Depth:</span>{" "}
                    {ear_analysis.measurements.concha_depth_mm}mm
                  </div>
                  <div>
                    <span className="font-medium">Ear Height:</span>{" "}
                    {ear_analysis.measurements.overall_ear_height_mm}mm
                  </div>
                  <div>
                    <span className="font-medium">Ear Width:</span>{" "}
                    {ear_analysis.measurements.overall_ear_width_mm}mm
                  </div>
                </div>

                <div className="pt-2 border-t border-base-300">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">Detection Confidence:</span>
                    <div className="badge badge-sm badge-success">
                      {ear_analysis.measurements.confidence}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="font-medium">Analysis Quality:</span>
                    <div className="badge badge-sm badge-info">
                      {ear_analysis.analysis_confidence}
                    </div>
                  </div>
                </div>

                {ear_analysis.measurements.notes && (
                  <div className="pt-2 border-t border-base-300">
                    <p className="text-xs text-base-content/60">
                      <span className="font-medium">Notes:</span>{" "}
                      {ear_analysis.measurements.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Collapsible */}
      <div className="space-y-2">
        {recommendations.map((rec, index) => (
          <div
            key={rec.rank}
            className="collapse collapse-arrow bg-base-100 shadow-sm"
          >
            <input type="checkbox" defaultChecked={index === 0} />
            <div className="collapse-title text-lg font-medium">
              <div className="flex items-center justify-between">
                <span>
                  #{rec.rank} {rec.brand} {rec.model}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">
                    {formatCurrency(rec.price)}
                  </span>
                  <div
                    className={`badge ${getTierColor(rec.tier_rating || "A")}`}
                  >
                    {rec.tier_rating || "A"}
                  </div>
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
