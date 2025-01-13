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

    const initMap = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
      center: [-74.5, 40],
      zoom: 9,
    });

    initMap.on('load', () => {
      map.current = initMap;
      
      // Add navigation controls after map is loaded
      map.current.addControl(new maplibregl.NavigationControl(), "top-right");

      // Add markers after map is loaded
      properties.forEach((property) => {
        if (!property.coordinates) return;

        const coords = property.coordinates.toString().split(",").map(Number);
        if (coords.length !== 2 || coords.some(isNaN)) return;

        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundColor = "#00C194";
        el.style.width = "12px";
        el.style.height = "12px";
        el.style.borderRadius = "50%";
        el.style.border = "2px solid white";

        new maplibregl.Marker(el)
          .setLngLat([coords[0], coords[1]])
          .setPopup(
            new maplibregl.Popup({ offset: 25 }).setHTML(
              `<h3 style="font-weight: bold;">${property.title}</h3><p>$${property.price.toLocaleString()}</p>`
            )
          )
          .addTo(map.current);
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [properties]);

  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-md">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};