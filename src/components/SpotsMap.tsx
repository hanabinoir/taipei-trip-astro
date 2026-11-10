import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import "maplibre-gl/dist/maplibre-gl.css";
import { spots, cities, type CityKey, type Spot } from "../data/spots";
import "./SpotsMap.css";

maplibregl.setWorkerUrl(maplibreWorkerUrl);

interface Props {
  city?: CityKey;
}

export default function SpotsMap({ city }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [selectedSpot, setSelectedSpot] = useState<Spot>();

  useEffect(() => {
    if (!container.current) return;

    const initialCity =
      city ??
      (Object.keys(cities) as CityKey[]).find(
        (key) => key === new URLSearchParams(window.location.search).get("city")
      );
    const initialSpots = initialCity ? spots.filter((spot) => spot.city === initialCity) : spots;
    const initialView = initialCity ? cities[initialCity] : undefined;
    setSelectedSpot(undefined);

    const map = new maplibregl.Map({
      container: container.current,
      style: "https://tiles.openfreemap.org/styles/liberty", // free, no API key
      center: initialView?.center ?? [121.5, 25.05],
      zoom: initialView?.zoom ?? 9.5,
    });
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    initialSpots.forEach((spot) => {
      const popup = new maplibregl.Popup({ offset: 24 }).setHTML(
        `<strong>${spot.name}</strong><br/>`
      );
      const marker = new maplibregl.Marker({ color: cities[spot.city].color })
        .setLngLat(spot.coords)
        .setPopup(popup)
        .addTo(map);
      marker.getElement().addEventListener("click", () => setSelectedSpot(spot));
    });

    const handleSpotLabelClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const button = event.target.closest<HTMLButtonElement>("[data-spot-slug]");
      if (!button) return;

      const selected = initialSpots.find((spot) => spot.slug === button.dataset.spotSlug);
      if (selected) setSelectedSpot(selected);
    };
    document.addEventListener("click", handleSpotLabelClick);

    // Fit all spots on first load
    if (!initialCity) {
      const bounds = new maplibregl.LngLatBounds();
      spots.forEach((s) => bounds.extend(s.coords));
      map.fitBounds(bounds, { padding: 60, duration: 0 });
    }

    return () => {
      document.removeEventListener("click", handleSpotLabelClick);
      map.remove();
    };
  }, [city]);

  return (
    <>
      <div
        ref={container}
        role="img"
        aria-label={city ? `${cities[city].name}景點地圖` : "北台灣景點地圖"}
        style={{ width: "100%", height: "min(66vh, 620px)", minHeight: 360, borderRadius: 14 }}
      />
      {selectedSpot && (
        <section className="spot-detail" aria-live="polite" aria-labelledby="selected-spot-title">
          <h2 id="selected-spot-title">{selectedSpot.name}</h2>
          <div className="spot-detail-body">
            {selectedSpot.photos.length > 0 ? (
              <div className="spot-detail-photos">
                {selectedSpot.photos.map((photo) => (
                  <img key={photo} src={photo} alt={`${selectedSpot.name}照片`} />
                ))}
              </div>
            ) : (
              <div className="spot-photo-placeholder" role="img" aria-label={`${selectedSpot.name}照片待補`}>
                照片待補
              </div>
            )}
            {selectedSpot.summary ? (
              <p>{selectedSpot.summary}</p>
            ) : (
              <p>景點介紹待補。</p>
            )}
          </div>
        </section>
      )}
    </>
  );
}