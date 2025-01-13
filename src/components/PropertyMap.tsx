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
  const markers = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY || "";

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/basic/style.json?key=${apiKey}`,
        center: [-74.5, 40],
        zoom: 9,
        maxZoom: 17,
        minZoom: 4
      });

      const addMarkers = () => {
        // Clear existing markers
        markers.current.forEach(marker => marker.remove());
        markers.current = [];

        properties.forEach((property) => {
          if (!property.coordinates) return;

          try {
            const coords = property.coordinates.toString().split(",").map(Number);
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
              );

            marker.addTo(map.current!);
            markers.current.push(marker);
          } catch (err) {
            console.error("Error adding marker:", err);
          }
        });
      };

      map.current.on('load', () => {
        addMarkers();
        
        map.current?.addControl(
          new maplibregl.NavigationControl({ showCompass: false }), 
          "top-right"
        );
      });

    } catch (err) {
      console.error("Error initializing map:", err);
    }

    return () => {
      // Clean up markers
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      
      // Remove map
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