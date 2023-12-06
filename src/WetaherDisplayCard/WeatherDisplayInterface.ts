import { ReactNode } from "react";

interface WeatherDisplayInterface {
    station: string;
    airTemperature: string;
    feelsLikeTemperature: string;
    windSpeed: string;
    seaLevelPressure: string;
    relativeHumidity: string;
    conditionCode: string;
    extraContent: ReactNode[];
}
export default WeatherDisplayInterface;