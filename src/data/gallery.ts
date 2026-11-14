export const sectionsList = [
  { id: "foods", label: "飲食", subtitle: "牛肉麺、牡蠣麺、大腸麺" },
  { id: "religious-procession", label: "宗教行列・心霊スポット", subtitle: "宗教行列や心霊スポットに関する写真" },
  { id: "national-day", label: "雙十慶典", subtitle: "毎年10月10日に行われた国の慶典" },
  { id: "election", label: "市長選舉", subtitle: "2026年台北市長選、候補者・沈伯洋氏の集会" },
  { id: "presidental-office", label: "總統府", subtitle: "總統府1階の庭、及び展示室" },
  { id: "memorial-228", label: "二二八紀念館", subtitle: "白色テロ時期に関する展示の写真" },
  { id: "lim-house", label: "府中林邸", subtitle: "新北市板橋区府中駅附近にある、板橋林家によって建てられた庭園や邸宅" },
];

export interface ImageData {
  url: string;
  caption?: string;
}

export const imageMap: Record<string, (ImageData)[]> = {
  foods: [
    { url: "https://i.ibb.co/Y7jwvnzp/02-Beef-Noodle.jpg" },
    { url: "https://i.ibb.co/dHSjbzG/03-Oyster-Noodle.jpg" },
    { url: "https://i.ibb.co/S4DB2wjd/04-Intestine-Noodle.jpg" }
  ],
  "presidental-office": [
    { url: "https://i.ibb.co/q3LJhymH/01-Inside.jpg", caption: "総統府1階庭園" },
    { url: "https://i.ibb.co/HTjVGdHb/01-Stamp-1.jpg", caption: "記念スタンプ - 1" },
    { url: "https://i.ibb.co/VW0gdw1N/02-Stamp-2.jpg", caption: "記念スタンプ - 2" },
    { url: "https://i.ibb.co/Gf4vQqYD/03-Timeline-1.jpg", caption: "歴史タイムライン - 1" },
    { url: "https://i.ibb.co/XZVCy70H/04-Timeline-2.jpg", caption: "歴史タイムライン - 2" },
    { url: "https://i.ibb.co/ZRWWVZcV/05-Timeline-3.jpg", caption: "歴史タイムライン - 3" },
    { url: "https://i.ibb.co/LXgnbJGN/06-House-1.jpg", caption: "建築展示 - 1" },
    { url: "https://i.ibb.co/1f9VHgCT/07-House-2.jpg", caption: "建築展示 - 2" },
    { url: "https://i.ibb.co/tPb7Zw1b/14-Hakka.jpg", caption: "客家文化展示" },
    { url: "https://i.ibb.co/WWYv0rZh/18-Original.jpg", caption: "先住民文化展示" }
  ], 
  "memorial-228": [
    { url: "https://i.ibb.co/r2PJrygM/01-Magazines.jpg", caption: "歴史雑誌資料" },
    { url: "https://i.ibb.co/TD9nGRwt/02-Newspapers.jpg", caption: "時代新聞" },
    { url: "https://i.ibb.co/ymQHPXkm/03-Activities.jpg", caption: "歴史活動記録 - 1" },
    { url: "https://i.ibb.co/Fb8cndGS/04-Activities-2.jpg", caption: "歴史活動記録 - 2" },
    { url: "https://i.ibb.co/nGgQ5Ff/05-Shutdown.jpg", caption: "社会活動停止" },
    { url: "https://i.ibb.co/rGsX8X1y/06-Literature.jpg", caption: "文学作品" },
    { url: "https://i.ibb.co/spzGxJtt/07-Stone.jpg", caption: "記念石碑" },
    { url: "https://i.ibb.co/DfqtPbs5/08-Martial-Law.jpg", caption: "鄭南榕" },
    { url: "https://i.ibb.co/fVdNWKVt/09-Soul-1.jpg", caption: "犠牲者の記憶 - 1" },
    { url: "https://i.ibb.co/bMwhMm3t/10-Soul-2.jpg", caption: "犠牲者の記憶 - 2" },
    { url: "https://i.ibb.co/LXWKrhBj/11-Newspaers.jpg", caption: "新聞資料" }
  ],
  "religious-procession": [
    { url: "https://i.ibb.co/67bC5DFb/01-West-Gate.jpg", caption: "晉德宮の行列" },
    { url: "https://i.ibb.co/nMKdftT6/02-City-God.jpg", caption: "城隍爺の巡行" },
    { url: "https://i.ibb.co/vx1ngQp7/04-Xining-Front.jpg", caption: "西寧団地 - 正面　西寧市場" },
    { url: "https://i.ibb.co/BH9tRhYJ/05-Xining-Back.jpg", caption: "西寧団地 - 後方　景福宮" }
  ],
  election: [
    { url: "https://i.ibb.co/ccyp3DBK/election-shum-street-01.jpg", caption: "集結 - 先頭" },
    { url: "https://i.ibb.co/WNn2rZqL/election-shum-street-02.jpg", caption: "集結 - 歩道橋" },
    { url: "https://i.ibb.co/SwzqD2P0/election-shum-street-03.jpg", caption: "集結 - 車道" },
    { url: "https://i.ibb.co/vCQPKj7v/election-shum-street-04.jpg", caption: "集結 - 上空（軍機）" },
    { url: "https://i.ibb.co/Zp1nyFjQ/election-shum-street-05.jpg", caption: "集結 - 沈伯洋氏" }
  ]
};

export const youtubeMap: Record<string, string[]> = {
  "national-day": [
    "https://youtube.com/shorts/lWzqJsgdaKw?feature=share",
    "https://youtube.com/shorts/MtjIJ35DkH4?feature=share",
    "https://youtube.com/shorts/rqid7yNXROc?feature=share",
    "https://youtube.com/shorts/kT_tf1EvMFI?feature=share",
    "https://youtube.com/shorts/StGeicyrG2M?feature=share"
  ]
};

export function getImages(id: string): (ImageData)[] {
  return imageMap[id] || [];
}

export function getYoutubeLinks(id: string): string[] {
  return youtubeMap[id] || [];
}
