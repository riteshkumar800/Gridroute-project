import React, { useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";

const mapContainerStyle = {
  height: "400px",
  width: "100%",
  borderRadius: "12px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function MapView({ routeCoords = [], onMapClick }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);

  const [center, setCenter] = useState(null); // Start with null — no Delhi fallback
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  const handleClick = useCallback(
    (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      if (!userHasInteracted) {
        setCenter({ lat, lng });
        setUserHasInteracted(true);
      }

      if (onMapClick) onMapClick(lat, lng);
    },
    [onMapClick, userHasInteracted]
  );

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onMapIdle = () => {
    if (mapRef.current && userHasInteracted) {
      const newCenter = mapRef.current.getCenter();
      setCenter({
        lat: newCenter.lat(),
        lng: newCenter.lng(),
      });
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCenter({ lat, lng });
          setUserHasInteracted(true);
          if (onMapClick) onMapClick(lat, lng);
        },
        (err) => {
          alert("❌ Location error: " + err.message);
        }
      );
    } else {
      alert("❌ Geolocation not supported.");
    }
  };

  if (loadError) return <div className="text-red-600">❌ Error loading Google Maps</div>;
  if (!isLoaded) return <div className="text-blue-600">🗺️ Loading map...</div>;
  if (!center) {
    return (
      <div className="space-y-2">
        <button
          onClick={handleUseMyLocation}
          className="mb-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          📍 Use My Location
        </button>
        <p className="text-gray-600">👆 Click on the map or use GPS to set start point.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleUseMyLocation}
        className="mb-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        📍 Use My Location
      </button>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={handleClick}
        onLoad={onMapLoad}
        onIdle={onMapIdle}
      >
        {routeCoords.map((pos, idx) => (
          <Marker
            key={idx}
            position={pos}
            label={{
              text:
                idx === 0
                  ? "Start"
                  : idx === routeCoords.length - 1
                  ? "End"
                  : `${idx}`,
              fontSize: "12px",
              fontWeight: "bold",
            }}
            icon={{
              url:
                idx === 0
                  ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                  : idx === routeCoords.length - 1
                  ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                  : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        ))}

        {routeCoords.length > 1 && (
          <Polyline
            path={routeCoords}
            options={{
              strokeColor: "#3b82f6",
              strokeOpacity: 0.9,
              strokeWeight: 4,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default MapView;
