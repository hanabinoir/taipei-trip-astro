import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import "maplibre-gl/dist/maplibre-gl.css";
import { spots, cities, type CityKey } from "../data/spots";

maplibregl.setWorkerUrl(maplibreWorkerUrl);

interface Props {
  city?: CityKey;
}

export default function SpotsMap({ city }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const initialCity =
      city ??
      (Object.keys(cities) as CityKey[]).find(
        (key) => key === new URLSearchParams(window.location.search).get("city")
      );
    const initialSpots = initialCity ? spots.filter((spot) => spot.city === initialCity) : spots;
    const initialView = initialCity ? cities[initialCity] : undefined;

    const map = new maplibregl.Map({
      container: container.current,
      style: "https://tiles.openfreemap.org/styles/liberty", // free, no API key
      center: initialView?.center ?? [121.5, 25.05],
      zoom: initialView?.zoom ?? 9.5,
    });
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
  }, [city]);

  return (
    <div
      ref={container}
      role="img"
      aria-label={city ? `${cities[city].name}景點地圖` : "北台灣景點地圖"}
      style={{ width: "100%", height: "min(66vh, 620px)", minHeight: 360, borderRadius: 14 }}
    />
  );
}