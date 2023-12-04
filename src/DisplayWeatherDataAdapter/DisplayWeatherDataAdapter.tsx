import WeatherDisplayInterface from "../WetaherDisplayCard/WeatherDisplayInterface";
import WeatherAPIInterface from "../MeteoAPIConnection/WeatherAPIInterface";

//Abstract
abstract class DisplayWeatherAdapter {
    displayData() {
        console.log("Display data");
    };
}


class DisplayWeatherDataAdapter extends DisplayWeatherAdapter {
    private apiData: WeatherAPIInterface;
    private displayFormData: WeatherDisplayInterface;

    constructor(apiData: WeatherAPIInterface, displayFormData: WeatherDisplayInterface) {
        super();
        this.apiData = apiData;
        this.displayFormData = displayFormData;
    }

    private getDisplayData(): WeatherDisplayInterface {
        // Adapt the API data to the format expected by the display form
        const adaptedData = this.adaptData(this.apiData);

        // Call the display method of the display form with the adapted data
        return adaptedData;
    }

    private adaptData(apiData: WeatherAPIInterface): WeatherDisplayInterface {
        return {
            station: apiData.airTemperature.toString(),
            airTemperature: apiData.airTemperature.toString(),
            feelsLikeTemperature: apiData.feelsLikeTemperature.toString(),
            windSpeed: apiData.windSpeed.toString(),
            seaLevelPressure: apiData.seaLevelPressure.toString(),
            relativeHumidity: apiData.relativeHumidity.toString(),
            conditionCode: apiData.conditionCode,
        };
    }
}