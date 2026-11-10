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
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map());

  useEffect(() => {
    if (!container.current) return;

    const queryCity = new URLSearchParams(window.location.search).get("city") as CityKey | null;
    const initialCity =
      city ??
      (queryCity && (Object.keys(cities) as CityKey[]).includes(queryCity) ? queryCity : ("taipei" as CityKey));
    const initialSpots = spots.filter((spot) => spot.city === initialCity);
    const initialView = cities[initialCity];
    setSelectedSpot(undefined);

    const map = new maplibregl.Map({
      container: container.current,
      style: "https://tiles.openfreemap.org/styles/liberty", // free, no API key
      center: initialView.center,
      zoom: initialView.zoom,
    });
    mapRef.current = map;
    markersRef.current.clear();
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    initialSpots.forEach((spot) => {
      const popup = new maplibregl.Popup({ offset: 24 }).setHTML(spot.name);
      const marker = new maplibregl.Marker({ color: cities[spot.city].color })
        .setLngLat(spot.coords)
        .setPopup(popup)
        .addTo(map);
      marker.getElement().addEventListener("click", () => setSelectedSpot(spot));
      markersRef.current.set(spot.slug, marker);
    });

    const handleSpotLabelClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const button = event.target.closest<HTMLButtonElement>("[data-spot-slug]");
      if (!button) return;

      const selected = initialSpots.find((spot) => spot.slug === button.dataset.spotSlug);
      if (selected) setSelectedSpot(selected);
    };
    document.addEventListener("click", handleSpotLabelClick);

    return () => {
      document.removeEventListener("click", handleSpotLabelClick);
      map.remove();
    };
  }, [city]);

  useEffect(() => {
    if (!selectedSpot || !mapRef.current) return;

    const marker = markersRef.current.get(selectedSpot.slug);
    if (!marker) return;

    const element = marker.getElement();
    markersRef.current.forEach((m) => {
      m.getElement().classList.remove("selected");
    });
    element.classList.add("selected");

    mapRef.current.flyTo({
      center: selectedSpot.coords,
      zoom: 15,
      duration: 1000,
    });
  }, [selectedSpot]);

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