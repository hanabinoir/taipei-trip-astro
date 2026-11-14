export const sectionsList = [
  { id: "foods", label: "飲食", subtitle: "牛肉麺、牡蠣麺、大腸麺" },
  { id: "religious-procession", label: "宗教・心霊スポット", subtitle: "宗教活動や心霊スポットに関する写真" },
  { id: "national-day", label: "雙十慶典", subtitle: "毎年10月10日に行われた国の慶典" },
  { id: "election", label: "市長選舉", subtitle: "2026年台北市長選、候補者・沈伯洋氏の集会" },
  { id: "presidental-office", label: "總統府", subtitle: "總統府1階の庭、及び展示室" },
  { id: "memorial-228", label: "二二八紀念館", subtitle: "白色テロ時期に関する展示の写真" },
  { id: "lim-house", label: "府中林邸", subtitle: "新北市板橋区府中駅附近にある、板橋林家によって建てられた庭園や邸宅" },
];

export const imageMap: Record<string, string[]> = {
  foods: [
    "https://i.ibb.co/Y7jwvnzp/02-Beef-Noodle.jpg",
    "https://i.ibb.co/dHSjbzG/03-Oyster-Noodle.jpg",
    "https://i.ibb.co/S4DB2wjd/04-Intestine-Noodle.jpg"
  ],
  "presidental-office": [
    "https://i.ibb.co/q3LJhymH/01-Inside.jpg",
    "https://i.ibb.co/HTjVGdHb/01-Stamp-1.jpg",
    "https://i.ibb.co/VW0gdw1N/02-Stamp-2.jpg",
    "https://i.ibb.co/Gf4vQqYD/03-Timeline-1.jpg",
    "https://i.ibb.co/XZVCy70H/04-Timeline-2.jpg",
    "https://i.ibb.co/ZRWWVZcV/05-Timeline-3.jpg",
    "https://i.ibb.co/LXgnbJGN/06-House-1.jpg",
    "https://i.ibb.co/1f9VHgCT/07-House-2.jpg",
    "https://i.ibb.co/tPb7Zw1b/14-Hakka.jpg",
    "https://i.ibb.co/WWYv0rZh/18-Original.jpg"
  ], 
  "memorial-228": [
    "https://i.ibb.co/r2PJrygM/01-Magazines.jpg",
    "https://i.ibb.co/TD9nGRwt/02-Newspapers.jpg",
    "https://i.ibb.co/ymQHPXkm/03-Activities.jpg",
    "https://i.ibb.co/Fb8cndGS/04-Activities-2.jpg",
    "https://i.ibb.co/nGgQ5Ff/05-Shutdown.jpg",
    "https://i.ibb.co/rGsX8X1y/06-Literature.jpg",
    "https://i.ibb.co/spzGxJtt/07-Stone.jpg",
    "https://i.ibb.co/DfqtPbs5/08-Martial-Law.jpg",
    "https://i.ibb.co/fVdNWKVt/09-Soul-1.jpg",
    "https://i.ibb.co/bMwhMm3t/10-Soul-2.jpg",
    "https://i.ibb.co/LXWKrhBj/11-Newspaers.jpg"
  ],
  "religious-procession": [
    "https://i.ibb.co/67bC5DFb/01-West-Gate.jpg",
    "https://i.ibb.co/nMKdftT6/02-City-God.jpg",
    "https://i.ibb.co/vx1ngQp7/04-Xining-Front.jpg",
    "https://i.ibb.co/BH9tRhYJ/05-Xining-Back.jpg"
  ],
  election: [
    "https://i.ibb.co/ccyp3DBK/election-shum-street-01.jpg",
    "https://i.ibb.co/WNn2rZqL/election-shum-street-02.jpg",
    "https://i.ibb.co/SwzqD2P0/election-shum-street-03.jpg",
    "https://i.ibb.co/vCQPKj7v/election-shum-street-04.jpg",
    "https://i.ibb.co/Zp1nyFjQ/election-shum-street-05.jpg"
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

export function getImages(id: string): string[] {
  return imageMap[id] || [];
}

export function getYoutubeLinks(id: string): string[] {
  return youtubeMap[id] || [];
}
