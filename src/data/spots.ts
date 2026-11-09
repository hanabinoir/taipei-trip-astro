export type CityKey = "taoyuan" | "newtaipei" | "taipei" | "keelung";

export const cities: Record<
  CityKey,
  {
    name: string;
    kana: string;
    english: string;
    summary: string;
    color: string;
    center: [number, number];
    zoom: number;
  }
> = {
  taoyuan: {
    name: "桃園",
    kana: "とうえん",
    english: "Taoyuan City",
    summary:
      "桃園是連接城市與機場的門戶，兼具山景、農田與熱鬧夜市的節奏。從捷運與高鐵延伸出的旅行路線，讓你輕鬆在地景與美食之間來回穿梭。",
    color: "#e67e22",
    center: [121.23, 25.0],
    zoom: 10.5,
  },
  newtaipei: {
    name: "新北",
    kana: "シンペイ",
    english: "New Taipei City",
    summary:
      "新北以海岸、山林與市區生活並存，帶出一種充滿層次的城市氛圍。從老街巷弄到海邊步道，這裡總能找到悠閒旅行和活力午後的平衡。",
    color: "#2980b9",
    center: [121.45, 25.02],
    zoom: 11.5,
  },
  taipei: {
    name: "台北",
    kana: "タイペイ",
    english: "Taipei City",
    summary:
      "台北是多元文化、創意與生活節奏交織的城市，從文創街區到山景景點，都能感受到一種節奏緊密卻不失悠閒的氣息。這裡適合慢慢走、細細品味每一段旅程。",
    color: "#c0392b",
    center: [121.53, 25.04],
    zoom: 12.5,
  },
  keelung: {
    name: "基隆",
    kana: "ケーラン",
    english: "Keelung City",
    summary:
      "基隆面向海港，擁有濃厚的港都氣息與海邊風景。從海風、漁港與山色交織的城市景觀出發，這裡讓旅行更貼近水邊與人情味。",
    color: "#16a085",
    center: [121.74, 25.13],
    zoom: 12,
  },
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