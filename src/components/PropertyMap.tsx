import { useEffect, useRef, useState } from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Property } from "@/types";

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapInstance) return;

    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY || "";
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/basic/style.json?key=${apiKey}`,
      center: [-74.5, 40],
      zoom: 9
    });

    map.on('load', () => {
      setMapInstance(map);
    });

    return () => {
      map.remove();
      setMapInstance(null);
    };
  }, []);

  // Handle markers separately
  useEffect(() => {
    if (!mapInstance) return;

    const markers: maplibregl.Marker[] = [];

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
          .addTo(mapInstance);

        markers.push(marker);
      } catch (error) {
        console.error("Error adding marker:", error);
      }
    });

    return () => {
      markers.forEach(marker => marker.remove());
    };
  }, [properties, mapInstance]);

  return (
    <div className="w-full h-[200px] rounded-md overflow-hidden shadow-sm">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};