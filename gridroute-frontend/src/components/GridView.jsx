import React, { useEffect, useState } from "react";

function GridView({ gridSize, route, returnToStart }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setCurrentStep(0);
    if (route && route.length > 0) {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        if (step > route.length) {
          clearInterval(interval);
        } else {
          setCurrentStep(step);
        }
      }, 400);
      return () => clearInterval(interval);
    }
  }, [route]);

  const routeMap = new Map(
    route?.slice(0, currentStep)?.map(([x, y], idx) => [`${x},${y}`, idx + 1]) || []
  );

  const getCellContent = (x, y) => {
    const key = `${x},${y}`;
    const step = routeMap.get(key);
    if (step === 1) return "🟢";
    if (step === routeMap.size && routeMap.size > 1) return "🔴";
    return step || "";
  };

  if (!route || route.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow-md border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800">📍 Optimized Route View</h2>
        <p className="text-gray-500 mt-2">No route to display.</p>
      </div>
    );
  }

  const allCoords = route;
  const xs = allCoords.map(([x]) => x);
  const ys = allCoords.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const cellSize = 40;
  const drawX = (x) => (x - minX) * cellSize + cellSize / 2;
  const drawY = (y) => (y - minY) * cellSize + cellSize / 2;
  const width = (maxX - minX + 1) * cellSize;
  const height = (maxY - minY + 1) * cellSize;

  return (
    <div className="bg-white p-4 rounded shadow-md border border-gray-300 overflow-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        📍 Optimized Route View
      </h2>

      <div className="relative inline-block">
        {/* Grid cells */}
        <div
          className="absolute top-0 left-0 grid gap-0.5"
          style={{
            gridTemplateColumns: `repeat(${maxX - minX + 1}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${maxY - minY + 1}, ${cellSize}px)`,
          }}
        >
          {Array.from({ length: (maxX - minX + 1) * (maxY - minY + 1) }, (_, i) => {
            const x = (i % (maxX - minX + 1)) + minX;
            const y = Math.floor(i / (maxX - minX + 1)) + minY;
            const key = `${x},${y}`;
            const step = routeMap.get(key);
            const isInRoute = step !== undefined;

            let bg = "bg-gray-100";
            if (step === 1) bg = "bg-green-500";
            else if (step === routeMap.size) bg = "bg-red-500";
            else if (isInRoute) bg = "bg-yellow-400";

            return (
              <div
                key={key}
                className={`w-10 h-10 flex items-center justify-center text-sm font-semibold text-white border border-gray-400 ${bg}`}
              >
                {getCellContent(x, y)}
              </div>
            );
          })}
        </div>

        {/* SVG arrows */}
        <svg
          width={width}
          height={height}
          className="block absolute top-0 left-0 pointer-events-none"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 Z" fill="green" />
            </marker>
          </defs>

          {route.slice(0, currentStep - 1).map((from, idx) => {
            const to = route[idx + 1];
            if (!to) return null;
            const [x1, y1] = from;
            const [x2, y2] = to;

            return (
              <line
                key={idx}
                x1={drawX(x1)}
                y1={drawY(y1)}
                x2={drawX(x2)}
                y2={drawY(y2)}
                stroke="green"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default GridView;
