import spotsData from "./spots.json";

export type CityKey = keyof typeof spotsData.cities;

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
  name: string;
  nameJa: string;
  city: CityKey;
  coords: [number, number];
  photos: string[];
  summary: string;
  summaryJa: string;
}

export const cities = spotsData.cities as Record<CityKey, CityInfo>;
export const spots = spotsData.spots as unknown as Spot[];
