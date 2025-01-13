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
  const markersRef = useRef<maplibregl.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map) return;

    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY || "";
    
    const initializedMap = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
      center: [-74.5, 40],
      zoom: 9,
    });

    initializedMap.on('load', () => {
      setMap(initializedMap);
      initializedMap.addControl(new maplibregl.NavigationControl(), "top-right");
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      initializedMap.remove();
    };
  }, []);

  // Handle markers separately
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    properties.forEach((property) => {
      if (property.coordinates) {
        try {
          const coordinates = property.coordinates.toString().split(",");
          const el = document.createElement("div");
          el.className = "marker";
          el.style.backgroundImage = "url(/marker.png)";
          el.style.width = "32px";
          el.style.height = "32px";
          el.style.backgroundSize = "cover";

          const marker = new maplibregl.Marker(el)
            .setLngLat([parseFloat(coordinates[0]), parseFloat(coordinates[1])])
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
      }
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    };
  }, [properties, map]);

  return <div ref={mapContainer} className="w-full h-full" />;
};