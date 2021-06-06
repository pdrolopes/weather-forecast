import { NumberLiteralType } from "typescript"

export type RegionType = {
    id: number;
    name: string;
    areaId: string;
}
export type ForecastType = {
    minTemperature: number;
    maxTemperature: number;
    chanceOfPrecipitation: number;
    date: Date;
}