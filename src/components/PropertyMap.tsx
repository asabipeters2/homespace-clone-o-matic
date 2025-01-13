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
    if (!mapContainer.current) return;

    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY || "";

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
      center: [-74.5, 40],
      zoom: 9,
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // Add markers for properties
    properties.forEach((property) => {
      if (property.coordinates) {
        const coordinates = property.coordinates.toString().split(",");
        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = "url(/marker.png)";
        el.style.width = "32px";
        el.style.height = "32px";
        el.style.backgroundSize = "cover";

        new maplibregl.Marker(el)
          .setLngLat([parseFloat(coordinates[0]), parseFloat(coordinates[1])])
          .setPopup(
            new maplibregl.Popup({ offset: 25 }).setHTML(
              `<h3>${property.title}</h3><p>$${property.price.toLocaleString()}</p>`
            )
          )
          .addTo(map.current);
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [properties]);

  return <div ref={mapContainer} className="w-full h-full" />;
};