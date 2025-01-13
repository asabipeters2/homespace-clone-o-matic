import { useEffect, useRef } from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Property } from "@/types";

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    // Clean up function to remove markers and map
    const cleanup = () => {
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };

    // Initialize map if container exists and map doesn't
    if (mapContainer.current && !mapRef.current) {
      const apiKey = import.meta.env.VITE_MAPTILER_API_KEY || "";
      
      try {
        const map = new maplibregl.Map({
          container: mapContainer.current,
          style: `https://api.maptiler.com/maps/basic/style.json?key=${apiKey}`,
          center: [-74.5, 40],
          zoom: 9
        });

        map.on('load', () => {
          // Remove existing markers
          markersRef.current.forEach(marker => marker.remove());
          markersRef.current = [];

          // Add new markers
          properties.forEach((property) => {
            if (!property.coordinates) return;

            try {
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

              markersRef.current.push(marker);
            } catch (error) {
              console.error("Error adding marker:", error);
            }
          });
        });

        mapRef.current = map;
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    }

    // Cleanup on unmount
    return cleanup;
  }, [properties]);

  return (
    <div className="w-full h-[200px] rounded-md overflow-hidden shadow-sm">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};