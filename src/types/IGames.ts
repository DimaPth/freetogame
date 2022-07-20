export interface IGames {
  developer: string;
  freetogame_profile_url: string;
  game_url: string;
  genre: string;
  id: number;
  platform: string;
  publisher: string;
  release_date: string;
  short_description: string;
  thumbnail: string;
  title: string;
}

interface IMinSysReq {
  graphics: string,
  memory: string,
  os: string,
  processor: string,
  storage: string,
}

interface IScreenshots {
  id: number,
  image: string,
}

export interface IGame {
  description: string,
  developer: string,
  freetogame_profile_url: string,
  game_url: string,
  genre: string,
  id: number,
  minimum_system_requirements: IMinSysReq,
  platform: string,
  publisher: string,
  release_date: string,
  screenshots: IScreenshots[],
  short_description: string,
  status: string,
  thumbnail: string,
  title: string
}