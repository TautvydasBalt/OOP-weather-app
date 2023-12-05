import Station from "./StationInterface";

interface WeatherAPIInterface {
    station: Station;
    observations: Observation[];
}

interface Observation {
    observationTimeUtc: string;
    airTemperature: number;
    feelsLikeTemperature: number;
    windSpeed: number;
    windGust: number;
    windDirection: number;
    cloudCover: number;
    seaLevelPressure: number;
    relativeHumidity: number;
    precipitation: number;
    conditionCode: string;
}
export default WeatherAPIInterface;