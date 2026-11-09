import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import "maplibre-gl/dist/maplibre-gl.css";
import { spots, cities, type CityKey } from "../data/spots";

maplibregl.setWorkerUrl(maplibreWorkerUrl);

export default function SpotsMap() {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!container.current) return;

    const map = new maplibregl.Map({
      container: container.current,
      style: "https://tiles.openfreemap.org/styles/liberty", // free, no API key
      center: [121.5, 25.05],
      zoom: 9.5,
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    spots.forEach((spot) => {
      const popup = new maplibregl.Popup({ offset: 24 }).setHTML(
        `<strong>${spot.name}</strong><br/>
         <a href="/spots/${spot.slug}">看我的遊記 →</a>`
      );
      new maplibregl.Marker({ color: cities[spot.city].color })
        .setLngLat(spot.coords)
        .setPopup(popup)
        .addTo(map);
    });

    // Fit all spots on first load
    const bounds = new maplibregl.LngLatBounds();
    spots.forEach((s) => bounds.extend(s.coords));
    map.fitBounds(bounds, { padding: 60, duration: 0 });

    return () => map.remove();
  }, []);

  const flyToCity = (key: CityKey) => {
    const { center, zoom } = cities[key];
    mapRef.current?.flyTo({ center, zoom, duration: 1200 });
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {(Object.keys(cities) as CityKey[]).map((key) => (
          <button
            key={key}
            onClick={() => flyToCity(key)}
            style={{
              background: cities[key].color,
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "6px 16px",
              cursor: "pointer",
            }}
          >
            {cities[key].name}
          </button>
        ))}
      </div>
      <div ref={container} style={{ width: "100%", height: "70vh", borderRadius: 12 }} />
    </div>
  );
}