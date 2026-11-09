export type CityKey = "taoyuan" | "newtaipei" | "taipei" | "keelung";

export const cities: Record<CityKey, { name: string; color: string; center: [number, number]; zoom: number }> = {
  taoyuan:   { name: "桃園", color: "#e67e22", center: [121.23, 25.0],  zoom: 10.5 },
  newtaipei: { name: "新北", color: "#2980b9", center: [121.45, 25.02], zoom: 11.5 },
  taipei:    { name: "台北", color: "#c0392b", center: [121.53, 25.04], zoom: 12.5 },
  keelung:   { name: "基隆", color: "#16a085", center: [121.74, 25.13], zoom: 12 },
};

export interface Spot {
  slug: string;
  name: string;
  city: CityKey;
  coords: [number, number]; // [lng, lat]
}

export const spots: Spot[] = [
  { slug: "taoyuan-airport",   name: "桃園機場",     city: "taoyuan",   coords: [121.2325, 25.0777] },
  { slug: "zhongli-night-market", name: "中壢觀光夜市", city: "taoyuan",   coords: [121.2250, 24.9540] },
  { slug: "xinzhuang-stadium", name: "新莊棒球場",   city: "newtaipei", coords: [121.4430, 25.0410] },
  { slug: "banqiao-fuzhong",   name: "板橋府中商圈", city: "newtaipei", coords: [121.4592, 25.0087] },
  { slug: "taipei-station",    name: "台北車站",     city: "taipei",    coords: [121.5170, 25.0478] },
  { slug: "ximending",         name: "西門町",       city: "taipei",    coords: [121.5081, 25.0421] },
  { slug: "presidential-office", name: "總統府",     city: "taipei",    coords: [121.5120, 25.0400] },
  { slug: "liberty-square",    name: "自由廣場",     city: "taipei",    coords: [121.5198, 25.0361] },
  { slug: "taipei-101",        name: "101",          city: "taipei",    coords: [121.5645, 25.0339] },
  { slug: "keelung-lighthouse", name: "基隆燈塔",    city: "keelung",   coords: [121.7570, 25.1550] },
];