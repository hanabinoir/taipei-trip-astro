import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import "maplibre-gl/dist/maplibre-gl.css";
import "./TransportationMap.css";

maplibregl.setWorkerUrl(maplibreWorkerUrl);

const airports = [
  {
    code: "TPE",
    name: "Taiwan Taoyuan International Airport",
    localName: "桃園國際機場",
    coordinates: [121.2342, 25.0797] as [number, number],
    color: "#315d4a",
  },
  {
    code: "TSA",
    name: "Taipei Songshan Airport",
    localName: "台北松山機場",
    coordinates: [121.5525, 25.0697] as [number, number],
    color: "#b57b45",
  },
];

export default function TransportationMap() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const map = new maplibregl.Map({
      container: container.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [121.4, 25.08],
      zoom: 8.7,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    airports.forEach((airport) => {
      const popupContent = document.createElement("div");
      const title = document.createElement("strong");
      const subtitle = document.createElement("span");
      title.textContent = `${airport.code} · ${airport.localName}`;
      subtitle.textContent = airport.name;
      subtitle.style.display = "block";
      subtitle.style.marginTop = "4px";
      popupContent.append(title, subtitle);

      new maplibregl.Marker({ color: airport.color })
        .setLngLat(airport.coordinates)
        .setPopup(new maplibregl.Popup({ offset: 24 }).setDOMContent(popupContent))
        .addTo(map);
    });

    const bounds = new maplibregl.LngLatBounds();
    airports.forEach((airport) => bounds.extend(airport.coordinates));
    map.fitBounds(bounds, { padding: { top: 72, right: 72, bottom: 56, left: 72 }, duration: 0 });

    return () => map.remove();
  }, []);

  return (
    <div
      ref={container}
      className="airport-map"
      role="region"
      aria-label="台灣桃園國際機場 TPE 與台北松山機場 TSA 位置地圖"
    />
  );
}
