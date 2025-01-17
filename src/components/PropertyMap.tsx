import { useEffect, useRef } from 'react';
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
    if (!mapContainer.current) return;

    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY || "";
    const markers: maplibregl.Marker[] = [];
    
    // Initialize map only if it doesn't exist
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/basic/style.json?key=${apiKey}`,
        center: [-74.5, 40],
        zoom: 9
      });
    }

    const addMarkers = () => {
      // Clear existing markers
      markers.forEach(marker => marker.remove());
      markers.length = 0;

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
            .addTo(map.current!);

          markers.push(marker);
        } catch (error) {
          console.error("Error adding marker:", error);
        }
      });
    };

    // Add markers when map is loaded
    if (map.current.loaded()) {
      addMarkers();
    } else {
      const loadHandler = () => {
        addMarkers();
        map.current?.off('load', loadHandler);
      };
      map.current.on('load', loadHandler);
    }

    // Cleanup function
    return () => {
      markers.forEach(marker => marker.remove());
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