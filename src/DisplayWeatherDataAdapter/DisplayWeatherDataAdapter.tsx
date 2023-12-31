import WeatherDisplayInterface from "../WetaherDisplayCard/WeatherDisplayInterface";
import WeatherAPIInterface from "../MeteoAPIConnection/WeatherAPIInterface";
import WeatherDisplayCard from "../WetaherDisplayCard/WeatherDisplayCard";

// Klase skirta adaptuoti duomenys gautus is meteo serviso
class DisplayWeatherDataAdapter extends WeatherDisplayCard {
    private apiData: WeatherAPIInterface;

    constructor(apiData: any) {
        super(apiData);
        this.apiData = apiData;
    }

    // Metodas grazinantis paruostus duomnenys
    public getDisplayData(): WeatherDisplayCard {
        const adaptedData = this.adaptData(this.apiData);
        const weatherDisplay = new WeatherDisplayCard(adaptedData);
        return weatherDisplay;
    }

    // Metodas adaptuojantis duomenys
    private adaptData(apiData: WeatherAPIInterface): WeatherDisplayInterface {
        return {
            station: apiData.station.name,
            airTemperature: apiData.observations[1].airTemperature.toString(),
            feelsLikeTemperature: apiData.observations[1].feelsLikeTemperature.toString(),
            windSpeed: apiData.observations[1].windSpeed.toString(),
            seaLevelPressure: apiData.observations[1].seaLevelPressure.toString(),
            relativeHumidity: apiData.observations[1].relativeHumidity.toString(),
            conditionCode: apiData.observations[1].conditionCode,
            extraContent: [],
        };
    }
}

export default DisplayWeatherDataAdapter;