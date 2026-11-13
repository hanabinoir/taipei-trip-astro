import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import "maplibre-gl/dist/maplibre-gl.css";
import busesData from "../../data/transportation/buses.json";
import {
  getCurrentLanguage,
  onLanguageChange,
  getLocalizedText,
  getBusTableHeaders,
  getBusPopupLabels,
  type LanguageKey,
} from "../../utils/i18n";

maplibregl.setWorkerUrl(maplibreWorkerUrl);

interface BusRoute {
  id: string;
  route: Record<string, string>;
  destination: Record<string, string>;
  time_needed: Record<string, string>;
  coordinates: [number, number];
}

const buses: BusRoute[] = busesData.buses.map((bus) => {
  const [longitude, latitude] = bus.coordinates;
  if (bus.coordinates.length !== 2 || typeof longitude !== "number" || typeof latitude !== "number") {
    throw new Error(`Invalid coordinates for bus route ${bus.id}`);
  }
  return { ...bus, coordinates: [longitude, latitude] };
});

interface BusesMapTableProps {
  ariaLabel?: string;
}

const BusesMapTable = ({
  ariaLabel = "Bus destinations map and routes table",
}: BusesMapTableProps) => {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [language, setLanguage] = useState<LanguageKey>("zh-TW");

  // Initialize language and setup listener
  useEffect(() => {
    setLanguage(getCurrentLanguage());

    const unsubscribe = onLanguageChange((newLanguage) => {
      setLanguage(newLanguage);
    });

    return unsubscribe;
  }, []);

  // Setup map with markers
  useEffect(() => {
    if (!container.current) return;

    const map = new maplibregl.Map({
      container: container.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [121.48, 25.07],
      zoom: 10,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    mapRef.current = map;

    // Add markers for each bus route
    buses.forEach((bus) => {
      const popupContent = createPopupContent(bus, language);

      new maplibregl.Marker({ color: "#EF4444" })
        .setLngLat(bus.coordinates)
        .setPopup(new maplibregl.Popup({ offset: 24 }).setDOMContent(popupContent))
        .addTo(map);
    });

    // Fit bounds to show all markers
    const bounds = new maplibregl.LngLatBounds();
    buses.forEach((bus) => bounds.extend(bus.coordinates));
    map.fitBounds(bounds, {
      padding: { top: 72, right: 72, bottom: 56, left: 72 },
      duration: 0,
    });

    return () => map.remove();
  }, [language]);

  return (
    <div className="buses-map-table-container">
      <div
        ref={container}
        className="buses-map"
        role="region"
        aria-label={ariaLabel}
      />

      <div className="buses-table-wrapper">
        <table className="buses-table">
          <thead>
            <tr>
              <th>{getBusTableHeaders(language).route}</th>
              <th>{getBusTableHeaders(language).destination}</th>
              <th>{getBusTableHeaders(language).time}</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td>{getLocalizedText(bus.route, language)}</td>
                <td>{getLocalizedText(bus.destination, language)}</td>
                <td>{getLocalizedText(bus.time_needed, language)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .buses-map-table-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin: 24px 0;
        }

        .buses-map {
          width: 100%;
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .buses-table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .buses-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .buses-table thead {
          background-color: #f3f4f6;
          border-bottom: 2px solid #e5e7eb;
        }

        .buses-table th {
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #1f2937;
        }

        .buses-table tbody tr {
          border-bottom: 1px solid #e5e7eb;
          transition: background-color 0.2s ease;
        }

        .buses-table tbody tr:hover {
          background-color: #f9fafb;
        }

        .buses-table td {
          padding: 12px 16px;
          color: #374151;
        }

        .buses-table td:first-child {
          font-weight: 500;
          color: #1f2937;
        }

        .bus-popup {
          font-family: system-ui, -apple-system, sans-serif;
          padding: 4px 0;
        }

        .bus-popup-title {
          font-weight: 600;
          color: #1f2937;
        }

        .bus-popup-info {
          margin-top: 6px;
          color: #374151;
          font-size: 0.9rem;
        }

        .bus-popup-time {
          margin-top: 4px;
          color: #6b7280;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .buses-map {
            height: 300px;
          }

          .buses-table {
            font-size: 0.875rem;
          }

          .buses-table th,
          .buses-table td {
            padding: 10px 12px;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * Create popup content DOM element
 */
function createPopupContent(bus: BusRoute, language: LanguageKey): HTMLElement {
  const container = document.createElement("div");
  container.className = "bus-popup";

  const title = document.createElement("div");
  title.className = "bus-popup-title";
  title.textContent = getLocalizedText(bus.route, language);

  const destination = document.createElement("div");
  destination.className = "bus-popup-info";
  const destLabel = getBusPopupLabels(language).destination;
  destination.textContent = `${destLabel}${getLocalizedText(bus.destination, language)}`;

  const time = document.createElement("div");
  time.className = "bus-popup-time";
  const timeLabel = getBusPopupLabels(language).time;
  time.textContent = `${timeLabel}${getLocalizedText(bus.time_needed, language)}`;

  container.append(title, destination, time);
  return container;
}

export default BusesMapTable;
