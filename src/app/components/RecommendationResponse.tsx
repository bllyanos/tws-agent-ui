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

      {/* Visual Ear Analysis Display */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-4">
          <h4 className="card-title text-sm mb-4">
            👂 Visual Ear Analysis & Measurements
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Annotated Image (150px width) */}
            <div className="space-y-2">
              <div className="relative w-[150px] mx-auto">
                {ear_analysis.annotated_image &&
                ear_analysis.annotated_image.length > 100 &&
                ear_analysis.annotated_image !== "base64 code" ? (
                  <img
                    src={ear_analysis.annotated_image}
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

            {/* Right Column - How to Read Analysis Legend */}
            <div className="space-y-2">
              <h5 className="font-medium text-sm">How to Read Analysis</h5>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-purple-500"></div>
                  <span>🟣 Head Bounding Box</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-yellow-500"></div>
                  <span>🟡 Ear Bounding Box</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-500"></div>
                  <span>🔵 Headphone Line</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-500"></div>
                  <span>🟢 Earbud Line</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-400"></div>
                  <span>🟢 Measurement Lines</span>
                </div>
              </div>

              {/* Measurements Summary */}
              <div className="pt-4 border-t border-base-300">
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span>👂 Ear Canal:</span>
                    <span className="font-medium">
                      {ear_analysis.measurements.ear_canal_diameter_mm}mm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>📏 Concha:</span>
                    <span className="font-medium">
                      {ear_analysis.measurements.concha_width_mm}mm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>📊 Size:</span>
                    <span className="font-medium">
                      {ear_analysis.measurements.size_category}
                    </span>
                  </div>
                </div>
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

      {/* Ear-Specific Fit Analysis */}
      {ear_analysis.recommendations &&
        ear_analysis.recommendations.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-lg font-bold">🎯 Ear-Specific Fit Analysis</h4>
            {ear_analysis.recommendations.map((fitRec, index) => (
              <div
                key={fitRec.tws_id || `fit-rec-${index}`}
                className="collapse collapse-arrow bg-base-100 shadow-sm"
              >
                <input type="checkbox" defaultChecked={index === 0} />
                <div className="collapse-title text-lg font-medium">
                  <div className="flex items-center justify-between">
                    <span>
                      #{index + 1} {fitRec.brand || "Unknown"}{" "}
                      {fitRec.model || "Model"}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-primary">
                        {formatCurrency(fitRec.price || 0)}
                      </span>
                      <div
                        className={`badge ${getTierColor(
                          fitRec.tier_rating || "A"
                        )}`}
                      >
                        {fitRec.tier_rating || "A"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="space-y-4 pt-2">
                    {/* Fit Score and Reason */}
                    <div>
                      <h5 className="font-medium text-sm mb-2">
                        Why Recommended
                      </h5>
                      <p className="text-sm text-base-content/80">
                        {fitRec.fit_reason || "No reason provided"}
                      </p>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h5 className="font-medium text-sm mb-2">Key Features</h5>
                      <div className="flex flex-wrap gap-1">
                        <span className="badge badge-outline badge-sm">
                          Fit Score: {fitRec.fit_score || 0}/100
                        </span>
                        <span className="badge badge-outline badge-sm">
                          Type: {fitRec.type || "N/A"}
                        </span>
                        <span className="badge badge-outline badge-sm">
                          Size: {fitRec.physical_dimensions?.fit_size || "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-sm mb-2 text-success">
                          Pros
                        </h5>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-start gap-2">
                            <span className="text-success">✓</span>
                            <span>Perfect fit for your ear measurements</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-success">✓</span>
                            <span>
                              High fit score: {fitRec.fit_score || 0}/100
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-success">✓</span>
                            <span>Optimized for your ear canal size</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-2 text-error">
                          Considerations
                        </h5>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-start gap-2">
                            <span className="text-error">•</span>
                            <span>Based on ear measurements only</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-error">•</span>
                            <span>May need to test comfort in person</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Physical Specifications */}
                    <div>
                      <h5 className="font-medium text-sm mb-2">
                        Physical Specifications
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="space-y-1">
                            {fitRec.physical_dimensions?.earbud ? (
                              <>
                                <div>
                                  <span className="font-medium">
                                    Earbud Size:
                                  </span>{" "}
                                  {fitRec.physical_dimensions.earbud
                                    .length_mm || "N/A"}
                                  mm ×{" "}
                                  {fitRec.physical_dimensions.earbud.width_mm ||
                                    "N/A"}
                                  mm
                                </div>
                                <div>
                                  <span className="font-medium">Weight:</span>{" "}
                                  {fitRec.physical_dimensions.earbud
                                    .weight_grams || "N/A"}
                                  g
                                </div>
                                <div>
                                  <span className="font-medium">Has Stem:</span>{" "}
                                  {fitRec.physical_dimensions.earbud.has_stem
                                    ? "Yes"
                                    : "No"}
                                </div>
                              </>
                            ) : fitRec.physical_dimensions?.headphone ? (
                              <>
                                <div>
                                  <span className="font-medium">
                                    Headphone Size:
                                  </span>{" "}
                                  {fitRec.physical_dimensions.headphone
                                    .length_mm || "N/A"}
                                  mm ×{" "}
                                  {fitRec.physical_dimensions.headphone
                                    .width_mm || "N/A"}
                                  mm
                                </div>
                                <div>
                                  <span className="font-medium">Weight:</span>{" "}
                                  {fitRec.physical_dimensions.headphone
                                    .weight_grams || "N/A"}
                                  g
                                </div>
                                <div>
                                  <span className="font-medium">Depth:</span>{" "}
                                  {fitRec.physical_dimensions.headphone
                                    .depth_mm || "N/A"}
                                  mm
                                </div>
                              </>
                            ) : (
                              <div>No physical dimensions available</div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="space-y-1">
                            <div>
                              <span className="font-medium">Canal Range:</span>{" "}
                              {fitRec.physical_dimensions
                                ?.ear_canal_diameter_range?.min_mm || "N/A"}
                              mm -{" "}
                              {fitRec.physical_dimensions
                                ?.ear_canal_diameter_range?.max_mm || "N/A"}
                              mm
                            </div>
                            <div>
                              <span className="font-medium">Fit Size:</span>{" "}
                              {fitRec.physical_dimensions?.fit_size || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Type:</span>{" "}
                              {fitRec.type || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Purchase Links */}
                    <div>
                      <h5 className="font-medium text-sm mb-2">Where to Buy</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-base-content/60">
                          Purchase links not available for fit-specific
                          recommendations
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
