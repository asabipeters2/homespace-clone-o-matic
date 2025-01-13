import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Property } from "@/types";

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN || "";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-74.5, 40],
      zoom: 9,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

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

        new mapboxgl.Marker(el)
          .setLngLat([parseFloat(coordinates[0]), parseFloat(coordinates[1])])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
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