import React, { useEffect, useState } from "react";
import { stateWiseCrops } from "../../Dataset/StateWiseCrops";

function InfoPanel({ location, address }) {
  const [state, setState] = useState("");

  useEffect(() => {
    const addressParts = address.split(", ");

    const extractedState = addressParts[addressParts.length - 2];
    const matchedState = stateWiseCrops.find(
      (item) => item.state === extractedState
    );
    setState(matchedState ? matchedState.state : "No Data");
  }, []);

  if (!location) return null;

  return (
    <div className="p-8 animate-slideIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📊 Location Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-indigo-600 text-xs font-bold uppercase tracking-wide mb-2">
            🌐 Latitude
          </h3>
          <p className="text-gray-800 text-lg font-semibold break-words">
            {location.latitude.toFixed(6)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-purple-600 text-xs font-bold uppercase tracking-wide mb-2">
            🌐 Longitude
          </h3>
          <p className="text-gray-800 text-lg font-semibold break-words">
            {location.longitude.toFixed(6)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-pink-600 text-xs font-bold uppercase tracking-wide mb-2">
            🎯 Accuracy
          </h3>
          <p className="text-gray-800 text-lg font-semibold">
            ±{Math.round(location.accuracy)} meters
          </p>
        </div>

        <div className="md:col-span-3 bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-green-600 text-xs font-bold uppercase tracking-wide mb-2">
            📮 Address
          </h3>
          <p className="text-gray-800 text-base font-semibold break-words">
            {address || "Loading address..."}
          </p>
        </div>

        <div className="md:col-span-3 bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-green-600 text-xs font-bold uppercase tracking-wide mb-2">
            🌾 Favourable Crops
          </h3>
          <p>
            {stateWiseCrops.filter((item) => item.state === state)[0]
              ? stateWiseCrops.filter((item) => item.state === state)[0].crops
              : "No Data"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoPanel;
