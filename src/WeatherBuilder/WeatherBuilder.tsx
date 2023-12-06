import React from "react";
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
            <div>
                <HumidityIcon />
                <p>{"Humidity"}</p>
                <p>{relativeHumidity}{'%'}</p>
            </div>
        );
    }
    public addPressure(seaLevelPressure: string): void {
        this.extraInfoProduct.parts.push(
            <div>
                <PressureIcon />
                <p>{"Pressure"}</p>
                <p>{seaLevelPressure}{'hPa'}</p>
            </div>
        );
    }
    public addWindSpeed(windSpeed: string): void {
        this.extraInfoProduct.parts.push(
            <div>
                <WindIcon />
                <p>{"Wind speed"}</p>
                <p>{windSpeed}{'m/s'}</p>
            </div>
        );
    }
}

class ExtraWeatherInfoProduct {
    public parts: JSX.Element[] = [];

    public renderParts(): JSX.Element[] {
        return this.parts;
    }
}

export default WeatherBuilder;
