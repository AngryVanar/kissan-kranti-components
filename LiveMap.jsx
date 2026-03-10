import React, { useState } from "react";
import MapView from "./MapView";
import InfoPanel from "./InfoPanel";

function LiveMap() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getLocation = () => {
    setError("");
    setLoading(true);

    if (!navigator.geolocation) {
      setError("🚫 Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
        setLocation(locationData);
        getAddress(locationData.latitude, locationData.longitude);
      },
      (err) => {
        setLoading(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError(
              "🚫 You denied the request for location access. Please allow location permission in your browser settings."
            );
            break;
          case err.POSITION_UNAVAILABLE:
            setError(
              "📡 Location information is unavailable. Please check your device settings."
            );
            break;
          case err.TIMEOUT:
            setError(
              "⏱️ The request to get your location timed out. Please try again."
            );
            break;
          default:
            setError("❌ An unknown error occurred. Please try again.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const getAddress = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "LocationTrackerApp/1.0",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setLoading(false);

      if (data.display_name) {
        setAddress(data.display_name);
      } else if (data.error) {
        setAddress("❌ Address not found for this location");
      } else {
        setAddress("📍 Address details unavailable");
      }
    } catch (err) {
      setLoading(false);
      setAddress(
        "⚠️ Unable to fetch address. Please check your internet connection."
      );
      console.error("Error fetching address:", err);
    }
  };

  return (
    <div className="min-h-[50vh] my-10 max-w-7xl mx-auto bg-white text-black rounded-3xl shadow-2xl overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 py-5 px-6 flex items-center justify-center gap-4 flex-wrap">
        <p className="font-semibold text-lg">
          Fetch Your Location to know about suitable crops to grow
        </p>

        <button
          onClick={getLocation}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          Fetch Location
        </button>

        {loading && (
          <span className="text-green-600 font-medium animate-pulse">
            Fetching location...
          </span>
        )}
      </div>

      <MapView location={location} address={address} />

      {error && (
        <div className="mx-6 my-5 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 font-medium">
          {error}
        </div>
      )}

      {location && <InfoPanel location={location} address={address} />}
    </div>
  );
}

export default LiveMap;
