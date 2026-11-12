export const sectionsList = [
  { id: "foods", label: "飲食", folder: "foods" },
  { id: "presidental-office", label: "總統府", folder: "presidental-office" },
  { id: "memorial-228", label: "二二八紀念館", folder: "memorial-228" },
  { id: "lim-house", label: "府中林邸", folder: "lim-house" },
  { id: "pilgrimage", label: "宮廟遶境", folder: "pilgrimage" },
  { id: "national-day", label: "國慶日", folder: "national-day" },
  { id: "election", label: "選舉", folder: "election" },
];

export const imageMap: Record<string, string[]> = {
  foods: [
    "02-Beef-Noodle.jpg",
    "03-Oyster-Noodle.jpg",
    "04-Intestine-Noodle.jpg",
  ],
  "presidental-office": [
    "01_Inside.jpg",
    "01_Stamp_1.jpg",
    "02_Stamp_2.jpg",
    "03_Timeline_1.jpg",
    "04_Timeline_2.jpg",
    "05_Timeline_3.jpg",
    "06_House_1.jpg",
    "07_House_2.jpg",
    "14_Hakka.jpg",
    "18_Original.jpg"
  ], 
  "memorial-228": [
    "01_Magazines.jpg",
    "02_Newspapers.jpg",
    "03_Activities.jpg",
    "04_Activities_2.jpg",
    "05_Shutdown.jpg",
    "06_Literature.jpg",
    "07_Stone.jpg",
    "08_Martial_Law.jpg",
    "09_Soul_1.jpg",
    "10_Soul_2.jpg",
    "11_Newspaers.jpg"
  ],
  pilgrimage: [
    "01_West_Gate.jpg",
    "02_City_God.jpg"
  ],
  election: [
    "election_shum_street_01.jpg",
    "election_shum_street_02.jpg",
    "election_shum_street_03.jpg",
    "election_shum_street_04.jpg",
    "election_shum_street_05.jpg"
  ]
};

export const youtubeMap: Record<string, string[]> = {
  "national-day": [
    "https://youtube.com/shorts/MtjIJ35DkH4?feature=share",
    "https://youtube.com/shorts/rqid7yNXROc?feature=share",
    "https://youtube.com/shorts/kT_tf1EvMFI?feature=share",
    "https://youtube.com/shorts/StGeicyrG2M?feature=share",
    "https://youtube.com/shorts/lWzqJsgdaKw?feature=share"
  ]
};

export function getImages(folder: string): string[] {
  return imageMap[folder] || [];
}

export function getYoutubeLinks(folder: string): string[] {
  return youtubeMap[folder] || [];
}
