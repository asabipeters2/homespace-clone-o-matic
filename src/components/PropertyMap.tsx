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

    const initializeMap = () => {
      try {
        const map = new maplibregl.Map({
          container: mapContainer.current!,
          style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
          center: [-74.5, 40],
          zoom: 9,
        });

        map.addControl(new maplibregl.NavigationControl(), "top-right");
        
        map.on('load', () => {
          mapRef.current = map;
          // Update markers after map is loaded
          updateMarkers();
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    return () => {
      if (markersRef.current.length) {
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers function
  const updateMarkers = () => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

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
          .addTo(mapRef.current);

        markersRef.current.push(marker);
      } catch (error) {
        console.error('Error adding marker:', error);
      }
    });
  };

  // Update markers when properties change
  useEffect(() => {
    if (mapRef.current) {
      updateMarkers();
    }
  }, [properties]);

  return <div ref={mapContainer} className="w-full h-full" />;
};