import { Button, Dialog, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import MeteoConnection from "../MeteoAPIConnection/MeteoAPIConnection";
import React from "react";
import WeatherDisplayCard from "../WetaherDisplayCard/WeatherDisplayCard";
import styles from './Client.module.scss';
import Stations from "../MeteoAPIConnection/StationInterface";
import DisplayWeatherDataAdapter from "../DisplayWeatherDataAdapter/DisplayWeatherDataAdapter";


interface ClientState {
  cardsArray: WeatherDisplayCard[];
  stations: Stations[];
  dialogOpen: boolean;
  selectedStation: string;
}

class Client extends React.Component<{}, ClientState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      cardsArray: [],
      stations: [],
      dialogOpen: false,
      selectedStation: '',
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
    const weatherDataAdapter = new DisplayWeatherDataAdapter(result.data);
    const displayFormData = weatherDataAdapter.getDisplayData();
    if (displayFormData) this.setState({ cardsArray: [...this.state.cardsArray, displayFormData] });
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