// TWS Recommendation API Utility
// Based on the API examples from api-example.sh

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Types based on the API response structure
export interface Recommendation {
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
  tier_rating?: string;
}

export interface EarAnalysis {
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

export interface RecommendationResponse {
  recommendations: Recommendation[];
  reasoning: string;
  confidence_score: number;
  sources: string[];
  ear_analysis: EarAnalysis;
  has_visual_proof: boolean;
}

export interface EarAnalysisResponse {
  measurements: EarAnalysis["measurements"];
  recommendations: EarAnalysis["recommendations"];
  annotated_image: string;
  analysis_confidence: string;
}

export interface HealthResponse {
  status: string;
  message: string;
  timestamp: string;
}

export interface DebugTestResponse {
  test_data: any;
  status: string;
}

// Request types
export interface RecommendationRequest {
  query: string;
  budget_min?: number;
  budget_max?: number;
  use_case?: string;
  image?: File;
}

export interface EarAnalysisRequest {
  image: File;
}

// API Error class
export class ApiError extends Error {
  constructor(message: string, public status: number, public response?: any) {
    super(message);
    this.name = "ApiError";
  }
}

// Utility functions
export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M IDR`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}K IDR`;
  }
  return `${amount.toLocaleString("id-ID")} IDR`;
};

export const getTierColor = (tier: string): string => {
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

// API functions
export const api = {
  // Health check
  async healthCheck(): Promise<HealthResponse> {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) {
      throw new ApiError(
        `Health check failed: ${response.statusText}`,
        response.status
      );
    }

    return response.json();
  },

  // Get recommendation
  async getRecommendation(
    request: RecommendationRequest
  ): Promise<RecommendationResponse> {
    const formData = new FormData();

    formData.append("query", request.query);

    if (request.budget_min !== undefined) {
      formData.append("budget_min", request.budget_min.toString());
    }

    if (request.budget_max !== undefined) {
      formData.append("budget_max", request.budget_max.toString());
    }

    if (request.use_case) {
      formData.append("use_case", request.use_case);
    }

    if (request.image) {
      formData.append("image", request.image);
    }

    const response = await fetch(`${API_BASE_URL}/recommend`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(
        `Recommendation request failed: ${response.statusText}`,
        response.status,
        errorText
      );
    }

    return response.json();
  },

  // Analyze ear
  async analyzeEar(request: EarAnalysisRequest): Promise<EarAnalysisResponse> {
    const formData = new FormData();
    formData.append("image", request.image);

    const response = await fetch(`${API_BASE_URL}/analyze-ear`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(
        `Ear analysis request failed: ${response.statusText}`,
        response.status,
        errorText
      );
    }

    return response.json();
  },

  // Debug test recommendation
  async debugTestRecommendation(): Promise<DebugTestResponse> {
    const response = await fetch(`${API_BASE_URL}/debug/test-recommendation`);

    if (!response.ok) {
      throw new ApiError(
        `Debug test failed: ${response.statusText}`,
        response.status
      );
    }

    return response.json();
  },
};

// Convenience functions for common use cases
export const recommendationApi = {
  // Basic recommendation without image
  async getBasicRecommendation(
    query: string,
    budgetMax?: number,
    useCase?: string
  ): Promise<RecommendationResponse> {
    return api.getRecommendation({
      query,
      budget_max: budgetMax,
      use_case: useCase,
    });
  },

  // Recommendation with budget range
  async getRecommendationWithBudget(
    query: string,
    budgetMin: number,
    budgetMax: number,
    useCase?: string
  ): Promise<RecommendationResponse> {
    return api.getRecommendation({
      query,
      budget_min: budgetMin,
      budget_max: budgetMax,
      use_case: useCase,
    });
  },

  // Recommendation with image
  async getRecommendationWithImage(
    query: string,
    image: File,
    budgetMax?: number,
    useCase?: string
  ): Promise<RecommendationResponse> {
    return api.getRecommendation({
      query,
      image,
      budget_max: budgetMax,
      use_case: useCase,
    });
  },

  // Gaming recommendation
  async getGamingRecommendation(
    query: string,
    budgetMax: number = 300
  ): Promise<RecommendationResponse> {
    return api.getRecommendation({
      query,
      budget_max: budgetMax,
      use_case: "gaming",
    });
  },

  // Fitness recommendation
  async getFitnessRecommendation(
    query: string,
    budgetMin: number = 80,
    budgetMax: number = 250
  ): Promise<RecommendationResponse> {
    return api.getRecommendation({
      query,
      budget_min: budgetMin,
      budget_max: budgetMax,
      use_case: "fitness",
    });
  },

  // Office recommendation
  async getOfficeRecommendation(
    query: string,
    budgetMax: number = 350
  ): Promise<RecommendationResponse> {
    return api.getRecommendation({
      query,
      budget_max: budgetMax,
      use_case: "office",
    });
  },

  // Travel recommendation
  async getTravelRecommendation(
    query: string,
    budgetMin: number = 200,
    budgetMax: number = 500
  ): Promise<RecommendationResponse> {
    return api.getRecommendation({
      query,
      budget_min: budgetMin,
      budget_max: budgetMax,
      use_case: "travel",
    });
  },

  // Audiophile recommendation
  async getAudiophileRecommendation(
    query: string,
    budgetMin: number = 150,
    budgetMax: number = 400
  ): Promise<RecommendationResponse> {
    return api.getRecommendation({
      query,
      budget_min: budgetMin,
      budget_max: budgetMax,
      use_case: "audiophile",
    });
  },

  // Commuting recommendation
  async getCommutingRecommendation(
    query: string,
    budgetMax: number = 200
  ): Promise<RecommendationResponse> {
    return api.getRecommendation({
      query,
      budget_max: budgetMax,
      use_case: "commuting",
    });
  },
};

// Hook for React components (if needed)
export const useRecommendationApi = () => {
  return {
    api,
    recommendationApi,
    formatCurrency,
    getTierColor,
  };
};

export default api;
