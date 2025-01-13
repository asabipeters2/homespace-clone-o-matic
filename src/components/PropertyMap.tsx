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

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
      center: [-74.5, 40],
      zoom: 9,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    const markers: maplibregl.Marker[] = [];

    properties.forEach((property) => {
      if (!property.coordinates) return;

      const coords = property.coordinates.toString().split(",").map(Number);
      if (coords.length !== 2 || coords.some(isNaN)) return;

      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage = "url(/marker.png)";
      el.style.width = "24px";
      el.style.height = "24px";
      el.style.backgroundSize = "cover";

      const marker = new maplibregl.Marker(el)
        .setLngLat([coords[0], coords[1]])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(
            `<h3>${property.title}</h3><p>$${property.price.toLocaleString()}</p>`
          )
        )
        .addTo(map.current);

      markers.push(marker);
    });

    return () => {
      markers.forEach(marker => marker.remove());
      map.current?.remove();
      map.current = null;
    };
  }, [properties]);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};