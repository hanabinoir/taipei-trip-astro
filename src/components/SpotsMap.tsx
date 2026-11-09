import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import "maplibre-gl/dist/maplibre-gl.css";
import { spots, cities, type CityKey } from "../data/spots";

maplibregl.setWorkerUrl(maplibreWorkerUrl);

export default function SpotsMap() {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityKey>();

  useEffect(() => {
    if (!container.current) return;

    const initialCity = (Object.keys(cities) as CityKey[]).find(
      (key) => key === new URLSearchParams(window.location.search).get("city")
    );
    setSelectedCity(initialCity);
    const initialSpots = initialCity ? spots.filter((spot) => spot.city === initialCity) : spots;
    const initialView = initialCity ? cities[initialCity] : undefined;

    const map = new maplibregl.Map({
      container: container.current,
      style: "https://tiles.openfreemap.org/styles/liberty", // free, no API key
      center: initialView?.center ?? [121.5, 25.05],
      zoom: initialView?.zoom ?? 9.5,
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    initialSpots.forEach((spot) => {
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
    if (!initialCity) {
      const bounds = new maplibregl.LngLatBounds();
      spots.forEach((s) => bounds.extend(s.coords));
      map.fitBounds(bounds, { padding: 60, duration: 0 });
    }

    return () => map.remove();
  }, []);

  const flyToCity = (key: CityKey) => {
    const { center, zoom } = cities[key];
    mapRef.current?.flyTo({ center, zoom, duration: 1200 });
  };

  return (
    <div style={{ position: "relative" }}>
      {selectedCity && (
        <p style={{ margin: "0 0 12px", color: cities[selectedCity].color, fontWeight: 700 }}>
          {cities[selectedCity].name} · {spots.filter((spot) => spot.city === selectedCity).length} 個景點
        </p>
      )}
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