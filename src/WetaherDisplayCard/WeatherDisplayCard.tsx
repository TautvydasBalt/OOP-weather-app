import { Card } from "@mui/material";
import styles from './WeatherDisplayCard.module.scss';
import React from "react";
import { HumidityIcon, PressureIcon, WeatherCloudyIcon, WeatherFogIcon, WeatherPartialSunnyIcon, WeatherRainIcon, WeatherSnowIcon, WeatherSunnyIcon, WeatherThunderIcon, WindIcon } from "../svgIcons/svgIcons";
import WeatherDisplayInterface from "./WeatherDisplayInterface";
import ConcreteDecoratorHumidity from "../Decorators/ConcreteDecoratorHumidity";
import ConcreteDecoratorPressure from "../Decorators/ConcreteDecoratorPressure";
import ConcreteDecoratorWindSpeed from "../Decorators/ConcreteDecoratorWindSpeed";

class WeatherDisplayCard extends React.Component<WeatherDisplayInterface, {}> {

    constructor(weatherContent: WeatherDisplayInterface) {
        super(weatherContent);
    }

    public render() {
        return <Card className={styles.myCard}>
            <div className={styles.myCardContent}>
                <div className={styles.cityName}>{this.props.station}</div>
                <div className={styles.mainContent}>
                    <div className={styles.mainContentLeft}>
                        <div className={styles.airTemperature}>
                            {this.props.airTemperature}{'°C'}
                        </div>
                        <div className={styles.feelsLike}>
                            {"Feels like: "} {this.props.feelsLikeTemperature}{'°C'}
                        </div>
                    </div>
                    <div className={styles.mainContentRight}>
                        {this.getWeatherIcon(this.props.conditionCode)}
                        <div>
                            {this.props.conditionCode.toUpperCase()}
                        </div>
                    </div>
                </div>
                <div className={styles.extraContent}>
                    <ConcreteDecoratorHumidity station={""} airTemperature={""} feelsLikeTemperature={""} windSpeed={""} seaLevelPressure={""} relativeHumidity={this.props.relativeHumidity} conditionCode={""}/>
                    <ConcreteDecoratorPressure station={""} airTemperature={""} feelsLikeTemperature={""} windSpeed={""} seaLevelPressure={this.props.seaLevelPressure} relativeHumidity={""} conditionCode={""}/>
                    <ConcreteDecoratorWindSpeed station={""} airTemperature={""} feelsLikeTemperature={""} windSpeed={this.props.windSpeed} seaLevelPressure={""} relativeHumidity={""} conditionCode={""}/>
                </div>
            </div>
        </Card>
    }

    private getWeatherIcon(conditionCode: string): React.ReactNode {
        switch (conditionCode) {
            case 'partly-cloudy':
            case 'cloudy-with-sunny-intervals':
                return <WeatherPartialSunnyIcon />
            case 'cloudy':
                return <WeatherCloudyIcon />
            case 'thunder':
            case 'isolated-thunderstorms':
            case 'thunderstorms':
            case 'heavy-rain-with-thunderstorms':
                return <WeatherThunderIcon />
            case 'light-rain':
            case 'rain':
            case 'heavy-rain':
                return <WeatherRainIcon />
            case 'light-sleet':
            case 'sleet':
            case 'freezing-rain':
            case 'hail':
            case 'light-snow':
            case 'snow-showers':
            case 'snow':
            case 'heavysnow':
                return <WeatherSnowIcon />
            case 'fog':
            case 'mist':
            case 'squall':
                return <WeatherFogIcon />
            case 'clear':
            default:
                return <WeatherSunnyIcon />
        }

    }

}

export default WeatherDisplayCard;
