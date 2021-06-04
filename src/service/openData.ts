const OPEN_DATA_URL = "http://api.ipma.pt/open-data";
const REGIONS_URL = `${OPEN_DATA_URL}/distrits-islands.json`;
const FORECAST_URL = `${OPEN_DATA_URL}/forecast/meteorology/cities/daily`;

type OpenDataResponse<T> = {
  owner: string;
  country: string;
  data: T;
}

export type Region = {
  idAreaAviso: string;
  idConcelho: number;
  idDistrito: number
  globalIdLocal: number;
  latitude: string;
  longitude: string;
  local: string;
}

export type DailyForecast = {
    precipitaProb: string;
    tMin: string;
    tMax: string;
    predWindDir: string;
    idWeatherType: number;
    classWindSpeed: number;
    longitude: string;
    forecastDate: string;
    latitude: string;
}

export async function fetchRegions(): Promise<Array<Region>> {
  const response = await fetch(REGIONS_URL);

  if (!response.ok) {
    throw Error("Something wrong happened");
  }

  const json: OpenDataResponse<Array<Region>> = await response.json();

  return json.data;
}

export async function fetchForecast(id: number): Promise<Array<DailyForecast>> {
    const url = `${FORECAST_URL}/${id}.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw Error("Something wrong happened");
  }

  const json: OpenDataResponse<Array<DailyForecast>> = await response.json();

  return json.data;
}

