interface BudgetInputProps {
  minBudget: string | null;
  maxBudget: string | null;
  onMinBudgetChange: (value: string | null) => void;
  onMaxBudgetChange: (value: string | null) => void;
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
            type="text"
            placeholder="0"
            className="input input-bordered join-item flex-1"
            value={minBudget || ""}
            onChange={(e) => {
              const value = e.target.value.trim();
              onMinBudgetChange(value === "" ? null : value);
            }}
            onKeyDown={(e) => {
              // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down
              if (
                [8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].indexOf(
                  e.keyCode
                ) !== -1 ||
                // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true)
              ) {
                return;
              }
              // Ensure that it is a number and stop the keypress
              if (
                (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
                (e.keyCode < 96 || e.keyCode > 105)
              ) {
                e.preventDefault();
              }
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
            type="text"
            placeholder="0"
            className="input input-bordered join-item flex-1"
            value={maxBudget || ""}
            onChange={(e) => {
              const value = e.target.value.trim();
              onMaxBudgetChange(value === "" ? null : value);
            }}
            onKeyDown={(e) => {
              // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down
              if (
                [8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].indexOf(
                  e.keyCode
                ) !== -1 ||
                // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true)
              ) {
                return;
              }
              // Ensure that it is a number and stop the keypress
              if (
                (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
                (e.keyCode < 96 || e.keyCode > 105)
              ) {
                e.preventDefault();
              }
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
