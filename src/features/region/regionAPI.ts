const REGIONS_URL = "http://api.ipma.pt/open-data/distrits-islands.json";


export type Region = {
  idAreaAviso: string;
  idConcelho: number;
  idDistrito: number
  globalIdLocal: number;
  latitude: string;
  longitude: string;
  local: string;
}

type RegionsResponse = {
  owner: string;
  country: string;
  data: Array<Region>;
}

export async function fetchRegions(): Promise<Array<Region>> {
  const response = await fetch(REGIONS_URL);

  if (!response.ok) {
    throw Error("Something wrong happened");
  }

  const json: RegionsResponse = await response.json();

  return json.data;
}

