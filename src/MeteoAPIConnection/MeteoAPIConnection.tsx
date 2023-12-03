import axios from "axios";

class MeteoConnection {
    constructor() {
    }

    public getWeatherByCity(selectedCity: string) {
        const response = axios.get(`https://api.meteo.lt/v1/stations/${selectedCity}/observations/latest`);
        return response;
    }

    public getStations() {
        const response = axios.get('https://api.meteo.lt/v1/stations');
        return response;
    }

}

export default MeteoConnection;