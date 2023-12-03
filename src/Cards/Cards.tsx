import { Card } from "@mui/material";
import styles from './Cards.module.scss';
import React from "react";
import WeatherContent from "../MeteoAPIConnection/WeatherContent";
import { HumidityIcon, PressureIcon, WeatherCloudyIcon, WeatherFogIcon, WeatherPartialSunnyIcon, WeatherRainIcon, WeatherSnowIcon, WeatherSunnyIcon, WeatherThunderIcon, WindIcon } from "../svgIcons/svgIcons";

interface CardsProps {
    weatherContent: WeatherContent[];
}

interface CardsState {
}

class Cards extends React.Component<CardsProps, CardsState> {

    constructor(props: CardsProps) {
        super(props);
        this.state = {
        }
    }


    public render() {
        return <div className={styles.Cards}>
            {this.renderCards()}
        </div>
    }

    private renderCards() {
        return this.props.weatherContent.map((element, index) =>
            <Card className={styles.myCard} key={index}>
                <div className={styles.myCardContent}>
                    <div className={styles.cityName}>{element.station}</div>
                    <div className={styles.mainContent}>
                        <div className={styles.mainContentLeft}>
                            <div className={styles.airTemperature}>
                                {element.airTemperature}{'°C'}
                            </div>
                            <div className={styles.feelsLike}>
                                {"Feels like: "} {element.feelsLikeTemperature}{'°C'}
                            </div>
                        </div>
                        <div className={styles.mainContentRight}>
                            {this.getWeatherIcon(element.conditionCode)}
                            <div>
                                {element.conditionCode.toUpperCase()}
                            </div>
                        </div>
                    </div>
                    <div className={styles.extraContent}>
                        <div>
                            <HumidityIcon />
                            <p>{"Humidity"}</p>
                            <p>{element.relativeHumidity}{'%'}</p>
                        </div>
                        <div>
                            <PressureIcon />
                            <p>{"Pressure"}</p>
                            <p>{element.seaLevelPressure}{'hPa'}</p>
                        </div>
                        <div>
                            <WindIcon />
                            <p>{"Wind speed"}</p>
                            <p>{element.windSpeed}{'m/s'}</p>
                        </div>
                    </div>
                </div>
            </Card>
        );
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

export default Cards;
