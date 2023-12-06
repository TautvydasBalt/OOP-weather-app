import { HumidityIcon, PressureIcon, WindIcon } from "../svgIcons/svgIcons";

interface Builder {
    addHumidity(relativeHumidity: string): void;
    addPressure(seaLevelPressure: string): void;
    addWindSpeed(windSpeed: string): void;
}

class WeatherBuilder implements Builder {
    private extraInfoProduct: ExtraWeatherInfoProduct;

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.extraInfoProduct = new ExtraWeatherInfoProduct();
    }

    public addHumidity(relativeHumidity: string): void {
        this.extraInfoProduct.parts.push(
            <div key={"relativeHumidity"}>
                <HumidityIcon />
                <p>{"Humidity"}</p>
                <p>{relativeHumidity}{'%'}</p>
            </div>
        );
    }
    public addPressure(seaLevelPressure: string): void {
        this.extraInfoProduct.parts.push(
            <div key={"seaLevelPressure"}>
                <PressureIcon />
                <p>{"Pressure"}</p>
                <p>{seaLevelPressure}{'hPa'}</p>
            </div>
        );
    }
    public addWindSpeed(windSpeed: string): void {
        this.extraInfoProduct.parts.push(
            <div key={"windSpeed"}>
                <WindIcon />
                <p>{"Wind speed"}</p>
                <p>{windSpeed}{'m/s'}</p>
            </div>
        );
    }

    public getExtraWeatherInfoProduct(): ExtraWeatherInfoProduct {
        const result = this.extraInfoProduct;
        return result;
    }
}

class ExtraWeatherInfoProduct {
    public parts: JSX.Element[] = [];

    public getParts(): JSX.Element[] {
        return this.parts;
    }
}

export default WeatherBuilder;
