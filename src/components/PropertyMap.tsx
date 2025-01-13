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

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY || "";

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
      center: [-74.5, 40],
      zoom: 9,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    mapRef.current = map;

    // Cleanup function
    return () => {
      if (markersRef.current.length) {
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
      }
      map.remove();
      mapRef.current = null;
    };
  }, []); // Empty dependency array ensures map is initialized only once

  // Handle markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    properties.forEach((property) => {
      if (!property.coordinates) return;

      try {
        const coordinates = property.coordinates.toString().split(",").map(Number);
        if (coordinates.length !== 2 || coordinates.some(isNaN)) return;

        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = "url(/marker.png)";
        el.style.width = "32px";
        el.style.height = "32px";
        el.style.backgroundSize = "cover";

        const marker = new maplibregl.Marker(el)
          .setLngLat([coordinates[0], coordinates[1]])
          .setPopup(
            new maplibregl.Popup({ offset: 25 }).setHTML(
              `<h3>${property.title}</h3><p>$${property.price.toLocaleString()}</p>`
            )
          )
          .addTo(map);

        markersRef.current.push(marker);
      } catch (error) {
        console.error('Error adding marker:', error);
      }
    });
  }, [properties]); // Only re-run when properties change

  return <div ref={mapContainer} className="w-full h-full" />;
};