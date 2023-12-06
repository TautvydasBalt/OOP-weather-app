import { Button, Checkbox, Dialog, FormControlLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import MeteoConnection from "../MeteoAPIConnection/MeteoAPIConnection";
import React from "react";
import WeatherDisplayCard from "../WetaherDisplayCard/WeatherDisplayCard";
import styles from './Client.module.scss';
import Stations from "../MeteoAPIConnection/StationInterface";
import DisplayWeatherDataAdapter from "../DisplayWeatherDataAdapter/DisplayWeatherDataAdapter";
import WeatherBuilder from "../WeatherBuilder/WeatherBuilder";


interface ClientState {
  cardsArray: WeatherDisplayCard[];
  stations: Stations[];
  dialogOpen: boolean;
  selectedStation: string;

  humidityChecked: boolean;
  pressureChecked: boolean;
  windSpeedChecked: boolean;
}

class Client extends React.Component<{}, ClientState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      cardsArray: [],
      stations: [],
      dialogOpen: false,
      selectedStation: '',
      humidityChecked: true,
      pressureChecked: true,
      windSpeedChecked: true,
    }
  }

  public render() {

    return (
      <div>
        <Button variant="contained" onClick={() => this.handleOpen()}>Add</Button>
        <div className={styles.Cards}>
          {this.state.cardsArray.map(element => element.render())}
        </div>
        <Dialog onClose={this.handleClose.bind(this)} open={this.state.dialogOpen}>
          <div className={styles.dialog}>
            <Select onChange={this.onSelected.bind(this)}>
              {this.state.stations.map((element, index) => {
                return <MenuItem key={index} value={element.code}>{element.name}</MenuItem>
              })}
            </Select>
            <FormControlLabel control={<Checkbox checked={this.state.humidityChecked} onChange={(evt) => this.setState({ humidityChecked: evt.target.checked })} />} label="Add Humidity" />
            <FormControlLabel control={<Checkbox checked={this.state.pressureChecked} onChange={(evt) => this.setState({ pressureChecked: evt.target.checked })} />} label="Add Pressure" />
            <FormControlLabel control={<Checkbox checked={this.state.windSpeedChecked} onChange={(evt) => this.setState({ windSpeedChecked: evt.target.checked })} />} label="Add Wind Speed" />
            <Button variant="contained" onClick={() => this.onSubmit()}>Add</Button>
          </div>
        </Dialog>
      </div>
    );
  }

  public async componentDidMount() {
    const weatherConn = new MeteoConnection();
    const result = await weatherConn.getStations()
    if (this.state.stations.length <= 0) this.setState({ stations: [...this.state.stations, ...result.data] });
  }

  private async onSubmit() {
    const weatherConn = new MeteoConnection();
    const result = await weatherConn.getWeatherByCity(this.state.selectedStation);
    //Adapt data received from service
    const weatherDataAdapter = new DisplayWeatherDataAdapter(result.data);
    const weatherBuilder = new WeatherBuilder()
    const displayCard = weatherDataAdapter.getDisplayData();

    //Builder add humidity
    if (this.state.humidityChecked) weatherBuilder.addHumidity(displayCard.props.relativeHumidity);

    //Builder add pressure
    if (this.state.pressureChecked) weatherBuilder.addPressure(displayCard.props.seaLevelPressure);

    //Builder add wind speed
    if (this.state.windSpeedChecked) weatherBuilder.addWindSpeed(displayCard.props.seaLevelPressure);

    weatherBuilder.getExtraWeatherInfoProduct().getParts().forEach(part =>
      displayCard.props.extraContent.push(part)
    );

    if (displayCard) this.setState({ cardsArray: [...this.state.cardsArray, displayCard] });
    this.handleClose();
  }

  private async handleOpen() {
    this.setState({ dialogOpen: true });
  }

  private handleClose() {
    this.setState({ dialogOpen: false });
  }

  private onSelected(event: SelectChangeEvent) {
    this.setState({ selectedStation: event.target.value as string });
  }
}

export default Client;