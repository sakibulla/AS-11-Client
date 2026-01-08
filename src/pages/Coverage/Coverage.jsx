// src/pages/Coverage/Coverage.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import serviceCoverage from "../../data/serviceCoverage.json"; // <- import here

const Coverage = () => {
  const position = [23, 90]; // Bangladesh center

  return (
    <section className="w-full py-12 ">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">
            Service Coverage Map
          </h2>
          <p className="text-gray-600 mt-2">
            Explore the areas where our services are currently available.
          </p>
        </div>

        {/* Map */}
        <div className="rounded-xl overflow-hidden shadow-lg border">
          <MapContainer
            center={position}
            zoom={7}
            scrollWheelZoom={true}
            style={{ height: "450px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Markers */}
            {serviceCoverage.map((city, idx) => (
              <Marker key={idx} position={[city.latitude, city.longitude]}>
                <Popup>
                  <b>{city.city}</b>
                  <br />
                  District: {city.district}
                  <br />
                  Covered Areas: {city.covered_area.join(", ")}
                  <br />
                  <a
                    href={city.flowchart}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Flowchart
                  </a>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
