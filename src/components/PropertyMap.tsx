import { useEffect, useRef } from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Property } from "@/types";

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY || "";
    let currentMarkers: maplibregl.Marker[] = [];

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/basic/style.json?key=${apiKey}`,
      center: [-74.5, 40],
      zoom: 9,
      maxZoom: 17,
      minZoom: 4
    });

    map.on('load', () => {
      // Clear any existing markers
      currentMarkers.forEach(marker => marker.remove());
      currentMarkers = [];

      // Add markers for properties
      properties.forEach((property) => {
        if (!property.coordinates) return;

        const coordString = property.coordinates.toString();
        const coords = coordString.split(",").map(Number);
        if (coords.length !== 2 || coords.some(isNaN)) return;

        const dot = document.createElement("div");
        dot.style.width = "10px";
        dot.style.height = "10px";
        dot.style.backgroundColor = "#FF4444";
        dot.style.borderRadius = "50%";
        dot.style.border = "2px solid white";

        const marker = new maplibregl.Marker(dot)
          .setLngLat([coords[0], coords[1]])
          .setPopup(
            new maplibregl.Popup({ closeButton: false })
              .setHTML(`<p class="font-bold">${property.title}</p>`)
          )
          .addTo(map);

        currentMarkers.push(marker);
      });

      map.addControl(
        new maplibregl.NavigationControl({ showCompass: false }), 
        "top-right"
      );
    });

    // Cleanup function
    return () => {
      currentMarkers.forEach(marker => marker.remove());
      map.remove();
    };
  }, [properties]); // Only re-run if properties change

  return (
    <div className="w-full h-[200px] rounded-md overflow-hidden shadow-sm">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};