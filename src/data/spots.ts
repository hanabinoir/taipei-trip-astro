import citiesBase from "./cities/base.json";
import citiesJa from "./cities/ja.json";
import citiesZhTW from "./cities/zh-TW.json";
import spotsBase from "./spots/base.json";
import spotsJa from "./spots/ja.json";
import spotsZhTW from "./spots/zh-TW.json";

export type CityKey = keyof typeof citiesBase;

export interface CityInfo {
  name: string;
  kana: string;
  english: string;
  summary: string;
  color?: string;
  center?: [number, number];
  zoom?: number;
}

export interface Spot {
  slug: string;
  name: string;
  nameJa: string;
  city: CityKey;
  coords: [number, number];
  photos: string[];
  summary: string;
  summaryJa: string;
}

// Helper to merge base data with language translations
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
    name: jaSpot?.name || baseSpot.name,
    nameJa: zhSpot?.name || baseSpot.name,
    summary: jaSpot?.summary || "",
    summaryJa: zhSpot?.summary || "",
  } as Spot;
});

export const spots = spotsMerged;
