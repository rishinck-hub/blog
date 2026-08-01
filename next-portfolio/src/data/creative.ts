import type { CreativeEntry } from "@/types/content";

const imageBase = "https://rishinck-hub.github.io/Portfolio/images";

export const creativeEntries = [
  { id: 1, name: "Cinematic Short", category: "Cinematic", thumbnailUrl: `${imageBase}/cinematic.png`, duration: "1:24", instagramUrl: "https://www.instagram.com/_rishin___ck/reel/DOfvscok9qd/" },
  { id: 2, name: "Brand Promo", category: "Commercial", thumbnailUrl: `${imageBase}/promo.png`, duration: "0:45", instagramUrl: "https://www.instagram.com/_rishin___ck/reel/DLUC6WDTBgP/" },
  { id: 3, name: "Travel Vlog", category: "Vlog", thumbnailUrl: `${imageBase}/travel.png`, duration: "1:10", instagramUrl: "https://www.instagram.com/kovilakam_boys/reel/C4u5EgePw_w/" },
  { id: 4, name: "Event Coverage", category: "Event", thumbnailUrl: `${imageBase}/event.png`, duration: "2:00", instagramUrl: "https://www.instagram.com/mcet_.z/reel/DIivYk7T2Ry/" },
  { id: 5, name: "Music Edit", category: "Creative", thumbnailUrl: `${imageBase}/music.png`, duration: "1:30", instagramUrl: "https://www.instagram.com/mcet_.z/reel/DIivYk7T2Ry/" },
  { id: 6, name: "Instagram Reel", category: "Social", thumbnailUrl: `${imageBase}/reel.png`, duration: "0:30", instagramUrl: "https://www.instagram.com/mcet_.z/reel/DCcAzm4uO6t/" },
] as const satisfies readonly CreativeEntry[];
