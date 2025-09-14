"use client";

import { useState, useEffect } from "react";
import BudgetInput from "./BudgetInput";

interface FilterParams {
  minBudget: number;
  maxBudget: number;
  primaryUseCase: string;
  earPhoto: File | null;
}

interface SidebarProps {
  filterParams: FilterParams;
  onFilterParamsChange: (params: FilterParams) => void;
}

export default function Sidebar({
  filterParams,
  onFilterParamsChange,
}: SidebarProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const updateFilterParam = (
    key: keyof FilterParams,
    value: number | string | File | null
  ) => {
    const updatedParams = {
      ...filterParams,
      [key]: value,
    };
    onFilterParamsChange(updatedParams);
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

  const handleReset = () => {
    // Clean up image preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    onFilterParamsChange({
      minBudget: 0,
      maxBudget: 0,
      primaryUseCase: "listening-music",
      earPhoto: null,
    });
  };

  // Cleanup object URL on component unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
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
          {/* Budget Inputs */}
          <BudgetInput
            minBudget={filterParams.minBudget}
            maxBudget={filterParams.maxBudget}
            onMinBudgetChange={(value) => updateFilterParam("minBudget", value)}
            onMaxBudgetChange={(value) => updateFilterParam("maxBudget", value)}
          />

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
              onClick={handleReset}
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
  );
}
