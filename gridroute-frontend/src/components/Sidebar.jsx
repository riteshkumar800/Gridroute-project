import React from "react";

function Sidebar({
  gridSize,
  setGridSize,
  coordinates,
  setCoordinates,
  handleOptimize,
  handleAddStop,
  returnToStart,
  setReturnToStart,
}) {
  const handleCoordinateChange = (index, axis, value) => {
    const num = parseInt(value);
    const updated = [...coordinates];
    if (!isNaN(num)) {
      updated[index][axis] = Math.max(0, Math.min(gridSize - 1, num));
    } else {
      updated[index][axis] = ""; // blank if not a number
    }
    setCoordinates(updated);
  };

  const isValidCoordinates = coordinates.every(
    ({ x, y }) => Number.isInteger(x) && Number.isInteger(y)
  );

  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-semibold">🧭 Grid Configuration</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Grid Size:</label>
        <input
          type="number"
          value={gridSize}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val) && val > 0) setGridSize(val);
          }}
          min={1}
          className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Coordinates:</label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {coordinates.map((coord, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="number"
                className="border rounded px-2 py-1 w-1/2 bg-white dark:bg-gray-700 dark:border-gray-600"
                value={coord.x}
                placeholder="X"
                min={0}
                max={gridSize - 1}
                onChange={(e) => handleCoordinateChange(i, "x", e.target.value)}
              />
              <input
                type="number"
                className="border rounded px-2 py-1 w-1/2 bg-white dark:bg-gray-700 dark:border-gray-600"
                value={coord.y}
                placeholder="Y"
                min={0}
                max={gridSize - 1}
                onChange={(e) => handleCoordinateChange(i, "y", e.target.value)}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleAddStop}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
        >
          ➕ Add Stop
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={returnToStart}
          onChange={(e) => setReturnToStart(e.target.checked)}
        />
        <label className="text-sm">Return to Start</label>
      </div>

      <button
        onClick={handleOptimize}
        disabled={!isValidCoordinates}
        className={`w-full py-2 rounded text-white ${
          isValidCoordinates
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        🚀 Optimize Route
      </button>
    </div>
  );
}

export default Sidebar;
