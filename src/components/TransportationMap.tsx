import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import "maplibre-gl/dist/maplibre-gl.css";
import "./TransportationMap.css";

maplibregl.setWorkerUrl(maplibreWorkerUrl);

interface Marker {
  code?: string;
  name: string;
  localName?: string;
  coordinates: [number, number];
  color: string;
}

interface TransportationMapProps {
  markers: Marker[];
  center?: [number, number];
  zoom?: number;
  ariaLabel: string;
}

export default function TransportationMap({
  markers,
  center = [121.4, 25.08],
  zoom = 8.7,
  ariaLabel,
}: TransportationMapProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const map = new maplibregl.Map({
      container: container.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center,
      zoom,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    markers.forEach((marker) => {
      const popupContent = document.createElement("div");
      const title = document.createElement("strong");
      const subtitle = document.createElement("span");
      
      if (marker.code) {
        title.textContent = `${marker.code} · ${marker.localName}`;
        subtitle.textContent = marker.name;
      } else {
        title.textContent = marker.localName || marker.name;
        subtitle.textContent = marker.name;
      }
      
      subtitle.style.display = "block";
      subtitle.style.marginTop = "4px";
      popupContent.append(title, subtitle);

      new maplibregl.Marker({ color: marker.color })
        .setLngLat(marker.coordinates)
        .setPopup(new maplibregl.Popup({ offset: 24 }).setDOMContent(popupContent))
        .addTo(map);
    });

    const bounds = new maplibregl.LngLatBounds();
    markers.forEach((marker) => bounds.extend(marker.coordinates));
    map.fitBounds(bounds, { padding: { top: 72, right: 72, bottom: 56, left: 72 }, duration: 0 });

    return () => map.remove();
  }, [markers, center, zoom]);

  return (
    <div
      ref={container}
      className="airport-map"
      role="region"
      aria-label={ariaLabel}
    />
  );
}
