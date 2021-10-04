export type TCoord = {
  lat: number;
  lon: number;
};

export type TMain = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};

export type TRain = any;

export type TSys = {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
};

export type TWeather = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

export type TWind = {
  deg: number;
  gust: number;
  speed: number;
};

export type TCity = {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: TCoord;
  dt: number;
  id: number;
  main: TMain;
  name: string;
  rain: TRain;
  sys: TSys;
  timezone: number;
  weather: TWeather[];
  wind: TWind;
  visibility?: number;
};
