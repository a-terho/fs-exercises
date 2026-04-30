const Weather = {
  Sunny: 'sunny',
  Rainy: 'rainy',
  Cloudy: 'cloudy',
  Stormy: 'stormy',
  Windy: 'windy',
} as const;

type Weather = (typeof Weather)[keyof typeof Weather];

const Visibility = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor',
} as const;

type Visibility = (typeof Visibility)[keyof typeof Visibility];

export interface NonSensitiveDiaryEntry {
  id: number;
  weather: Weather;
  visibility: Visibility;
  date: string;
}
