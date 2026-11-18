import citiesBase from "./cities/base.json";
import citiesJa from "./cities/ja.json";
import spotsBase from "./spots/base.json";
import spotsJa from "./spots/ja.json";
import spotsTw from "./spots/zh-TW.json";

export type CityKey = keyof typeof citiesBase;

export interface CityInfo {
  name: string;
  kana: string;
  english: string;
  summary: string;
  color: string;
  center: [number, number];
  zoom: number;
}

export interface Spot {
  slug: string;
  nameJa: string;
  nameTw: string;
  city: CityKey;
  coords: [number, number];
  photos: string[];
  summaryTitle?: string;
  summaryJa: string;
  summaryTw: string;
}


// Build cities with base + language data
const citiesMerged = {} as Record<CityKey, CityInfo>;
(Object.keys(citiesBase) as CityKey[]).forEach((key) => {
  citiesMerged[key] = {
    ...citiesBase[key],
    ...citiesJa[key],
    english: citiesBase[key].english,
  } as CityInfo;
});

export const cities = citiesMerged;

// Build spots with base + language data
const spotsMerged = (spotsBase.spots as any[]).map((baseSpot) => {
  const jaSpot = spotsJa.spots.find((s) => s.slug === baseSpot.slug);
  const twSpot = spotsTw.spots.find((s) => s.slug === baseSpot.slug);

  return {
    ...baseSpot,
    nameJa: jaSpot?.name || baseSpot.name,
    nameTw: twSpot?.name || baseSpot.name,
    summaryTitle: jaSpot?.summaryTitle || "",
    summaryJa: jaSpot?.summary || "",
    summaryTw: twSpot?.summary || "",
  } as Spot;
});

export const spots = spotsMerged;
