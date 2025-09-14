interface BudgetInputProps {
  minBudget: number;
  maxBudget: number;
  onMinBudgetChange: (value: number) => void;
  onMaxBudgetChange: (value: number) => void;
}

export default function BudgetInput({
  minBudget,
  maxBudget,
  onMinBudgetChange,
  onMaxBudgetChange,
}: BudgetInputProps) {
  return (
    <div className="space-y-4">
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
            value={minBudget}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              onMinBudgetChange(value);
            }}
          />
          <span className="join-item bg-base-300 px-4 flex items-center text-sm">
            IDR
          </span>
        </div>
        <div className="label">
          <span className="label-text-alt">Enter minimum budget amount</span>
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
            value={maxBudget}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              onMaxBudgetChange(value);
            }}
          />
          <span className="join-item bg-base-300 px-4 flex items-center text-sm">
            IDR
          </span>
        </div>
        <div className="label">
          <span className="label-text-alt">Enter maximum budget amount</span>
        </div>
      </div>
    </div>
  );
}
