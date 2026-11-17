import citiesBase from "./cities/base.json";
import citiesJa from "./cities/ja.json";
import citiesZhTW from "./cities/zh-TW.json";
import spotsBase from "./spots/base.json";
import spotsJa from "./spots/ja.json";
import spotsZhTW from "./spots/zh-TW.json";

export type Language = "ja" | "zh-TW";

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
function getSpotSummary(spot: Spot, language: Language): string {
  return language === "ja" ? spot.summaryJa : spot.summaryTw;
}

function mergeTranslations<T extends { slug: string }>(
  baseItems: T[],
  langData: Record<string, any>
): T[] {
  return baseItems.map((item) => {
    const translation = langData[item.slug] || {};
    return { ...item, ...translation };
  });
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
  const zhSpot = spotsZhTW.spots.find((s) => s.slug === baseSpot.slug);

  return {
    ...baseSpot,
    nameJa: jaSpot?.name || baseSpot.name,
    nameTw: zhSpot?.name || baseSpot.name,
    summaryTitle: jaSpot?.summaryTitle || "",
    summaryJa: jaSpot?.summary || "",
    summaryTw: zhSpot?.summary || "",
  } as Spot;
});

export const spots = spotsMerged;
