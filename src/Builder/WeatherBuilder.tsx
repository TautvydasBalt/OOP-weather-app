import React from "react";
import { HumidityIcon, PressureIcon, WindIcon } from "../svgIcons/svgIcons";

interface Builder {
    addHumidity(relativeHumidity: string): void;
    addPressure(seaLevelPressure: string): JSX.Element;
    addWindSpeed(windSpeed:  string): JSX.Element;
}

class WeatherBuilder implements Builder {
    private extraInfoProduct;

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.extraInfoProduct = new extraInfoProduct();
    }

    public addHumidity(relativeHumidity: string): void {
        this.extraInfoProduct( <div>
            <HumidityIcon />
            <p>{"Humidity"}</p>
            <p>{relativeHumidity}{'%'}</p>
        </div>
        )
    }
    public addPressure(seaLevelPressure: string): void {
        return <div>
            <PressureIcon />
            <p>{"Pressure"}</p>
            <p>{seaLevelPressure}{'hPa'}</p>
        </div>;
    }
    public addWindSpeed(windSpeed: string): void {
        return <div>
            <WindIcon />
            <p>{"Wind speed"}</p>
            <p>{windSpeed}{'m/s'}</p>
        </div>;
        }    
    }
}

class extraInfoProduct {
    public parts: JSX.Element[] = [];

    public listParts(): void {
        console.log(`Product parts: ${this.parts.join(', ')}\n`);
    }
}

export default WeatherBuilder;
