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
    
    // Initialize map
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/basic/style.json?key=${apiKey}`,
        center: [-74.5, 40],
        zoom: 9
      });
    }

    // Store markers locally
    const markers: maplibregl.Marker[] = [];

    // Function to add markers
    const addMarkersToMap = () => {
      // Remove existing markers
      while (markers.length) {
        markers.pop()?.remove();
      }

      // Add new markers
      properties.forEach((property) => {
        if (!property.coordinates) return;

        try {
          const coordString = property.coordinates.toString();
          const coords = coordString.split(",").map(Number);
          
          if (coords.length !== 2 || coords.some(isNaN)) return;

          const markerElement = document.createElement("div");
          markerElement.style.width = "10px";
          markerElement.style.height = "10px";
          markerElement.style.backgroundColor = "#FF4444";
          markerElement.style.borderRadius = "50%";
          markerElement.style.border = "2px solid white";

          const marker = new maplibregl.Marker(markerElement)
            .setLngLat([coords[0], coords[1]])
            .setPopup(
              new maplibregl.Popup({ closeButton: false })
                .setHTML(`<p class="font-bold">${property.title}</p>`)
            );

          marker.addTo(map.current!);
          markers.push(marker);
        } catch (error) {
          console.error("Error adding marker:", error);
        }
      });
    };

    // Add markers when map is loaded
    if (map.current.loaded()) {
      addMarkersToMap();
    } else {
      map.current.once('load', addMarkersToMap);
    }

    // Cleanup function
    return () => {
      // Remove all markers
      while (markers.length) {
        markers.pop()?.remove();
      }
      
      // Remove map instance
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