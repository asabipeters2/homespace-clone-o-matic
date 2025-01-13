import { useEffect, useRef } from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Property } from "@/types";

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY || "";

    try {
      const initMap = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/basic/style.json?key=${apiKey}`,
        center: [-74.5, 40],
        zoom: 9,
        maxZoom: 17,
        minZoom: 4
      });

      initMap.on('load', () => {
        map.current = initMap;
        
        // Add markers only after map is loaded
        properties.forEach((property) => {
          if (!property.coordinates) return;

          try {
            const coords = property.coordinates.toString().split(",").map(Number);
            if (coords.length !== 2 || coords.some(isNaN)) return;

            // Create a simple dot marker
            const dot = document.createElement("div");
            dot.style.width = "10px";
            dot.style.height = "10px";
            dot.style.backgroundColor = "#FF4444";
            dot.style.borderRadius = "50%";
            dot.style.border = "2px solid white";

            new maplibregl.Marker(dot)
              .setLngLat([coords[0], coords[1]])
              .setPopup(
                new maplibregl.Popup({ closeButton: false })
                  .setHTML(`<p class="font-bold">${property.title}</p>`)
              )
              .addTo(initMap);
          } catch (err) {
            console.error("Error adding marker:", err);
          }
        });

        // Add minimal controls
        initMap.addControl(
          new maplibregl.NavigationControl({ showCompass: false }), 
          "top-right"
        );
      });

      initMap.on('error', (e) => {
        console.error("Map error:", e);
      });

    } catch (err) {
      console.error("Error initializing map:", err);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [properties]);

  return (
    <div className="w-full h-[200px] rounded-md overflow-hidden shadow-sm">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};