import React, { useState, useEffect } from "react";
import RegionsMap from "./RegionsMap";
import { cities, type CityKey } from "../data/spots";
import zhTwCities from "../data/cities/zh-TW.json";
import jaCities from "../data/cities/ja.json";
import "./Overview.css";

export interface OverviewProps {
  currentLanguage?: "zh-TW" | "ja";
}

export default function Overview({ currentLanguage = "zh-TW" }: OverviewProps) {
  const cityKeys = Object.keys(cities) as CityKey[];
  const defaultCityKey = cityKeys[0];

  const [selectedCityKey, setSelectedCityKey] = useState<CityKey>(defaultCityKey);
  const [language, setLanguage] = useState<"zh-TW" | "ja">(currentLanguage);

  useEffect(() => {
    const storedLanguage = (localStorage.getItem("trip-language") === "ja" ? "ja" : "zh-TW") as "zh-TW" | "ja";
    setLanguage(storedLanguage);
  }, []);

  useEffect(() => {
    const handleLanguageChange = () => {
      const storedLanguage = (localStorage.getItem("trip-language") === "ja" ? "ja" : "zh-TW") as "zh-TW" | "ja";
      setLanguage(storedLanguage);
    };

    window.addEventListener("language-change", handleLanguageChange);
    return () => window.removeEventListener("language-change", handleLanguageChange);
  }, []);

  useEffect(() => {
    const handleCitySelected = (event: Event) => {
      const customEvent = event as CustomEvent;
      const cityKey = customEvent.detail?.city as CityKey;
      if (cityKey && cities[cityKey]) {
        setSelectedCityKey(cityKey);
      }
    };

    window.addEventListener("city-selected", handleCitySelected);
    return () => window.removeEventListener("city-selected", handleCitySelected);
  }, []);

  const getLocalizedCityData = () => {
    const cityData: Record<"zh-TW" | "ja", Record<CityKey, any>> = {
      "zh-TW": zhTwCities,
      ja: jaCities,
    };

    const localizedData = cityData[language][selectedCityKey];
    const fallbackData = cityData["zh-TW"][selectedCityKey];

    return localizedData || fallbackData;
  };

  const selectedCity = cities[selectedCityKey];
  const localizedCity = getLocalizedCityData();
  const displayCity = {
    name: localizedCity.name || selectedCity.name,
    kana: localizedCity.kana || selectedCity.kana,
    english: localizedCity.english || selectedCity.english,
    summary: localizedCity.summary || selectedCity.summary,
    color: selectedCity.color,
  };

  return (
    <main className="overview-home">
      <header className="overview-intro">
        <p className="overview-eyebrow">
          {language === "ja" ? "わたしの旅のしおり" : "MY TRAVEL JOURNAL"}
        </p>
        <h1>{language === "ja" ? "北台湾、ゆっくり歩く" : "北台灣，慢慢走"}</h1>
        <p className="overview-description">
          {language === "ja"
            ? "地図上の地域をクリックして、各都市の旅の足跡を見てみましょう。"
            : "點選地圖上的區域，看看每座城市的旅行足跡。"}
        </p>
      </header>

      <div className="overview-content">
        <section className="overview-map-card" aria-label={language === "ja" ? "北台湾旅行地図" : "北台灣旅行地圖"}>
          <RegionsMap />
          <p className="overview-attribution">
            {language === "ja" ? "行政区域境界データ：" : "行政區界線資料："}
            <a href="https://github.com/g0v/twgeojson" target="_blank" rel="noreferrer">
              g0v/twgeojson
            </a>
          </p>
        </section>

        <article
          className="overview-city-description"
          aria-live="polite"
          style={{ "--city-color": displayCity.color } as React.CSSProperties}
        >
          <p className="overview-city-kicker">{language === "ja" ? "都市紹介" : "CITY OVERVIEW"}</p>
          <h2 className="overview-city-title">
            {displayCity.name}（{displayCity.kana}）
          </h2>
          <p className="overview-city-subtitle">{displayCity.english}</p>
          <p className="overview-city-summary">{displayCity.summary}</p>
        </article>
      </div>
    </main>
  );
}
