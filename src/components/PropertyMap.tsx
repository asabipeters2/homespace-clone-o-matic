import { useEffect, useRef } from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Property } from "@/types";

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  // Initialize map only once
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY || "";

    mapInstance.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
      center: [-74.5, 40],
      zoom: 9,
    });

    mapInstance.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // Cleanup function
    return () => {
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
      }
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Update markers when properties change
  useEffect(() => {
    if (!mapInstance.current) return;

    // Clear existing markers
    if (markersRef.current) {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    }

    // Add new markers
    properties.forEach((property) => {
      if (property.coordinates && mapInstance.current) {
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
            .addTo(mapInstance.current);

          markersRef.current.push(marker);
        } catch (error) {
          console.error('Error adding marker:', error);
        }
      }
    });
  }, [properties]);

  return <div ref={mapContainer} className="w-full h-full" />;
};