import { useEffect, useRef, useState } from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Property } from "@/types";

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const markers = useRef<maplibregl.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY || "";

    const initMap = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
      center: [-74.5, 40],
      zoom: 9,
    });

    initMap.addControl(new maplibregl.NavigationControl(), "top-right");
    
    // Wait for map to load before setting it
    initMap.on('load', () => {
      setMap(initMap);
    });

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      initMap.remove();
    };
  }, []);

  // Handle markers separately after map is initialized
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    properties.forEach((property) => {
      if (!property.coordinates) return;

      try {
        const coords = property.coordinates.toString().split(",").map(Number);
        if (coords.length !== 2 || coords.some(isNaN)) return;

        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = "url(/marker.png)";
        el.style.width = "32px";
        el.style.height = "32px";
        el.style.backgroundSize = "cover";

        const marker = new maplibregl.Marker(el)
          .setLngLat([coords[0], coords[1]])
          .setPopup(
            new maplibregl.Popup({ offset: 25 }).setHTML(
              `<h3>${property.title}</h3><p>$${property.price.toLocaleString()}</p>`
            )
          )
          .addTo(map);

        markers.current.push(marker);
      } catch (error) {
        console.error('Error adding marker:', error);
      }
    });

    // Cleanup markers when properties change
    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
    };
  }, [map, properties]);

  return <div ref={mapContainer} className="w-full h-full" />;
};