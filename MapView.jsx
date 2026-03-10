import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MapView({ location, address }) {
  const defaultCenter = [20, 0];
  const defaultZoom = 2;

  const center = location
    ? [location.latitude, location.longitude]
    : defaultCenter;
  const zoom = location ? 15 : defaultZoom;

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden relative z-0">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{
          height: "500px",
          width: "100%",
          position: "relative",
          zIndex: 0,
        }}
        key={
          location ? `${location.latitude}-${location.longitude}` : "default"
        }
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {location && (
          <>
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>
                <div className="text-sm">
                  <strong>📍 Your Location</strong>
                  <br />
                  {address || "Loading address..."}
                  <br />
                  <span className="text-gray-600">
                    Accuracy: ±{Math.round(location.accuracy)}m
                  </span>
                </div>
              </Popup>
            </Marker>

            <Circle
              center={[location.latitude, location.longitude]}
              radius={location.accuracy}
              pathOptions={{
                fillColor: "#10b981",
                fillOpacity: 0.2,
                color: "#10b981",
                weight: 2,
              }}
            />
          </>
        )}
      </MapContainer>
    </div>
  );
}

export default MapView;
