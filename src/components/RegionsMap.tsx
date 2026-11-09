import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import "maplibre-gl/dist/maplibre-gl.css";
import regions from "../data/regions.geo.json";
import { cities, type CityKey } from "../data/spots";

maplibregl.setWorkerUrl(maplibreWorkerUrl);

const cityKeys = Object.keys(cities) as CityKey[];

export default function RegionsMap() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const map = new maplibregl.Map({
      container: container.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [121.52, 25.08],
      zoom: 8.5,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

    map.on("load", () => {
      map.addSource("travel-regions", {
        type: "geojson",
        data: regions as GeoJSON.FeatureCollection<GeoJSON.Geometry, { city: CityKey; name: string }>,
      });

      const regionColor: maplibregl.ExpressionSpecification = [
        "match",
        ["get", "city"],
        "taipei", cities.taipei.color,
        "newtaipei", cities.newtaipei.color,
        "taoyuan", cities.taoyuan.color,
        "keelung", cities.keelung.color,
        "#777777",
      ];

      map.addLayer({
        id: "travel-region-fills",
        type: "fill",
        source: "travel-regions",
        paint: {
          "fill-color": regionColor,
          "fill-opacity": 0.48,
        },
      });

      map.addLayer({
        id: "travel-region-borders",
        type: "line",
        source: "travel-regions",
        paint: {
          "line-color": regionColor,
          "line-width": 2,
        },
      });

      map.on("click", "travel-region-fills", (event) => {
        const city = event.features?.[0]?.properties?.city;
        const cityKey = cityKeys.find((key) => key === city);
        if (cityKey) window.location.assign(`/spots/${cityKey}`);
      });

      map.on("mouseenter", "travel-region-fills", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "travel-region-fills", () => {
        map.getCanvas().style.cursor = "";
      });

      const bounds = new maplibregl.LngLatBounds();
      const extendCoordinates = (coordinates: unknown): void => {
        if (
          Array.isArray(coordinates) &&
          coordinates.length >= 2 &&
          typeof coordinates[0] === "number" &&
          typeof coordinates[1] === "number"
        ) {
          bounds.extend([coordinates[0], coordinates[1]]);
          return;
        }

        if (Array.isArray(coordinates)) {
          coordinates.forEach(extendCoordinates);
        }
      };

      regions.features.forEach((feature) => extendCoordinates(feature.geometry.coordinates));
      map.fitBounds(bounds, { padding: { top: 44, right: 44, bottom: 44, left: 44 }, duration: 0 });
    });

    return () => map.remove();
  }, []);

  return (
    <div
      ref={container}
      role="img"
      aria-label="台北、新北、桃園與基隆行政區地圖，點選區域瀏覽該城市景點"
      style={{ width: "100%", height: "min(66vh, 620px)", minHeight: 360, borderRadius: 14 }}
    />
  );
}
