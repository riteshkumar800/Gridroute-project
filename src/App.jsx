import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import GridView from "./components/GridView";
import MapView from "./components/MapView";

function App() {
  const [gridSize, setGridSize] = useState(5);
  const [coordinates, setCoordinates] = useState([]); // ⛳ Start with empty
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [returnToStart, setReturnToStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleAddStop = () => {
    setCoordinates((prev) => [...prev, { x: 0, y: 0 }]);
  };

  const handleOptimize = async () => {
    const hasInvalid = coordinates.some(
      ({ x, y }) => !Number.isInteger(x) || !Number.isInteger(y)
    );

    if (hasInvalid || coordinates.length === 0) {
      alert("🚫 Please set at least a valid start and one stop.");
      return;
    }

    const start = [coordinates[0].x, coordinates[0].y];
    const stops = coordinates
      .slice(1)
      .filter(({ x, y }) => Number.isInteger(x) && Number.isInteger(y))
      .map(({ x, y }) => [x, y]);

    const payload = {
      grid: Array(gridSize)
        .fill()
        .map(() => Array(gridSize).fill(0)),
      start,
      stops,
      return_to_start: returnToStart,
    };

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/optimize-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Backend error ${response.status}: ${text}`);
      }

      const result = await response.json();
      setOptimizedRoute(result);
      setReplayKey((prev) => prev + 1);
    } catch (err) {
      console.error("❌ Optimization error:", err);
      alert("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  const toLatLng = ([x, y]) => ({
    lat: 28.6 + y * 0.01,
    lng: 77.2 + x * 0.01,
  });

  const fromLatLng = ({ lat, lng }) => ({
    x: Math.round((lng - 77.2) / 0.01),
    y: Math.round((lat - 28.6) / 0.01),
  });

  const handleMapClick = (lat, lng) => {
    const gridPoint = fromLatLng({ lat, lng });

    setCoordinates((prev) =>
      prev.length === 0 ? [gridPoint] : [...prev, gridPoint]
    );
  };

  const latLngRoute = optimizedRoute?.optimized_route?.map(toLatLng) || [];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 p-6 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-indigo-50 to-pink-50 text-gray-900"
      }`}
    >
      <Header />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Sidebar
          gridSize={gridSize}
          setGridSize={setGridSize}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          handleOptimize={handleOptimize}
          handleAddStop={handleAddStop}
          returnToStart={returnToStart}
          setReturnToStart={setReturnToStart}
        />

        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {showMap ? "🗺️ Map View" : "🧮 Grid Simulation"}
            </h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setShowMap((prev) => !prev)}
            >
              {showMap ? "Switch to Grid View" : "Switch to Map View"}
            </button>
          </div>

          {showMap ? (
            <MapView routeCoords={latLngRoute} onMapClick={handleMapClick} />
          ) : (
            <GridView
              key={replayKey}
              gridSize={gridSize}
              route={optimizedRoute?.optimized_route || []}
              returnToStart={returnToStart}
            />
          )}

          {loading && (
            <p className="text-blue-500 font-medium">
              🔄 Optimizing route...
            </p>
          )}

          {optimizedRoute && (
            <div className="bg-white dark:bg-gray-700 p-4 rounded shadow space-y-2">
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
                📍 Optimized Route Result
              </h2>
              <p>
                <strong>Total Distance:</strong>{" "}
                {optimizedRoute.total_distance.toFixed(2)}
              </p>
              <ul className="list-disc pl-5 text-sm">
                {optimizedRoute.optimized_route.map(([x, y], index) => (
                  <li key={index}>
                    Step {index + 1}: ({x}, {y})
                  </li>
                ))}
              </ul>
              {!showMap && (
                <button
                  onClick={handleReplay}
                  className="mt-3 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  🔁 Replay Animation
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
