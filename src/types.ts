import { NumberLiteralType } from "typescript"

export type RegionType = {
    name: string;
    id: number;
}
export type ForecastType = {
    minTemperature: number;
    maxTemperature: number;
    chanceOfPrecipitation: number;
}