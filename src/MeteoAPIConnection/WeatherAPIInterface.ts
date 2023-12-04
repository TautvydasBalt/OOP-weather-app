interface WeatherAPIInterface {
    airTemperature: number;
    feelsLikeTemperature: number;
    windSpeed: number;
    seaLevelPressure: number;
    relativeHumidity: number;
    conditionCode: string;
}
export default WeatherAPIInterface;