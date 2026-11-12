import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import "maplibre-gl/dist/maplibre-gl.css";
import "./BusesMapTable.css";

maplibregl.setWorkerUrl(maplibreWorkerUrl);

const coaches = [
  {
    route: {
      "zh-TW": "國光客運 1819",
      ja: "国光バス 1819",
    },
    destination: {
      "zh-TW": "台北站",
      ja: "台北駅",
    },
    time_needed: {
      "zh-TW": "約55分",
      ja: "約55分",
    },
    coordinates: [121.517, 25.0478] as [number, number],
  },
  {
    route: {
      "zh-TW": "大有巴士 1961",
      ja: "大有バス 1961",
    },
    destination: {
      "zh-TW": "西門町",
      ja: "西門町",
    },
    time_needed: {
      "zh-TW": "約70〜90分",
      ja: "約70〜90分",
    },
    coordinates: [121.5075, 25.0426] as [number, number],
  },
  {
    route: {
      "zh-TW": "國光客運 1840",
      ja: "国光バス 1840",
    },
    destination: {
      "zh-TW": "松山機場",
      ja: "松山空港",
    },
    time_needed: {
      "zh-TW": "約50分",
      ja: "約50分",
    },
    coordinates: [121.552, 25.0694] as [number, number],
  },
  {
    route: {
      "zh-TW": "大有巴士 1960",
      ja: "大有バス 1960",
    },
    destination: {
      "zh-TW": "市府轉運站",
      ja: "市府バスターミナル",
    },
    time_needed: {
      "zh-TW": "約60〜70分",
      ja: "約60〜70分",
    },
    coordinates: [121.5648, 25.0405] as [number, number],
  },
  {
    route: {
      "zh-TW": "國光客運 1843",
      ja: "国光バス 1843",
    },
    destination: {
      "zh-TW": "南港展覽館",
      ja: "南港展示館",
    },
    time_needed: {
      "zh-TW": "約80分",
      ja: "約80分",
    },
    coordinates: [121.6179, 25.0554] as [number, number],
  },
  {
    route: {
      "zh-TW": "統聯客運 706",
      ja: "統聯バス 706",
    },
    destination: {
      "zh-TW": "桃園站",
      ja: "桃園駅",
    },
    time_needed: {
      "zh-TW": "約40〜50分",
      ja: "約40〜50分",
    },
    coordinates: [121.3136, 24.9892] as [number, number],
  },
];

type LanguageKey = "zh-TW" | "ja";

interface BusesMapTableProps {
  ariaLabel?: string;
}

export default function BusesMapTable({
  ariaLabel = "Bus destinations map and routes table",
}: BusesMapTableProps) {
  const container = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<LanguageKey>("zh-TW");

  useEffect(() => {
    // Get initial language from localStorage
    const savedLang = typeof window !== "undefined" 
      ? (localStorage.getItem("trip-language") as LanguageKey) || "zh-TW"
      : "zh-TW";
    setLanguage(savedLang);

    // Listen for language changes
    const handleLanguageChange = () => {
      const newLang = (localStorage.getItem("trip-language") as LanguageKey) || "zh-TW";
      setLanguage(newLang);
    };

    window.addEventListener("language-change", handleLanguageChange);
    return () => window.removeEventListener("language-change", handleLanguageChange);
  }, []);

  useEffect(() => {
    if (!container.current) return;

    const map = new maplibregl.Map({
      container: container.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [121.48, 25.07],
      zoom: 10,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    coaches.forEach((coach, index) => {
      const popupContent = document.createElement("div");
      popupContent.className = "bus-popup";

      const routeTitle = document.createElement("strong");
      routeTitle.textContent = coach.route[language];

      const destination = document.createElement("div");
      destination.style.marginTop = "6px";
      const destLabel = language === "ja" ? "到着地: " : "到達: ";
      destination.textContent = `${destLabel}${coach.destination[language]}`;

      const time = document.createElement("div");
      time.style.marginTop = "4px";
      time.style.fontSize = "0.875rem";
      time.style.color = "#666";
      const timeLabel = language === "ja" ? "時間: " : "時間: ";
      time.textContent = `${timeLabel}${coach.time_needed[language]}`;

      popupContent.append(routeTitle, destination, time);

      const marker = new maplibregl.Marker({ color: "#EF4444" })
        .setLngLat(coach.coordinates)
        .setPopup(new maplibregl.Popup({ offset: 24 }).setDOMContent(popupContent))
        .addTo(map);

      // Add hover effect
      marker.getElement().style.cursor = "pointer";
    });

    // Fit bounds to show all markers
    const bounds = new maplibregl.LngLatBounds();
    coaches.forEach((coach) => bounds.extend(coach.coordinates));
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
              <th>{language === "ja" ? "ルート" : "路線"}</th>
              <th>{language === "ja" ? "目的地" : "目的地"}</th>
              <th>{language === "ja" ? "所要時間" : "所需時間"}</th>
            </tr>
          </thead>
          <tbody>
            {coaches.map((coach, index) => (
              <tr key={index}>
                <td>{coach.route[language]}</td>
                <td>{coach.destination[language]}</td>
                <td>{coach.time_needed[language]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
