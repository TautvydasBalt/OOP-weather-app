import { Button, Dialog, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import MeteoConnection from "../MeteoAPIConnection/MeteoAPIConnection";
import React from "react";
import Cards from "../Cards/Cards";
import WeatherContent from "../MeteoAPIConnection/WeatherContent";
import styles from './Client.module.scss';
import Stations from "../MeteoAPIConnection/Stations";


interface ClientState {
  weatherContent: WeatherContent[];
  stations: Stations[];
  dialogOpen: boolean;
  selectedStation: string;
}

class Client extends React.Component<{}, ClientState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      weatherContent: [],
      stations: [],
      dialogOpen: false,
      selectedStation: '',
    }
  }

  public render() {

    return (
      <div>
        <Button variant="contained" onClick={() => this.handleOpen()}>Add</Button>
        <Cards weatherContent={this.state.weatherContent} />
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
    result.data.observations[1].station = result.data.station.name;
    if (result) this.setState({ weatherContent: [...this.state.weatherContent, result.data.observations[1]] });
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

/*
Decorator Pattern:
Use the Decorator pattern to dynamically add features to weather data display. 
For example, you could have decorators for adding additional information such 
as historical weather data, pollen count, or air quality to the basic weather information.

Singleton Pattern:
Apply the Singleton pattern to manage a central repository for caching weather data. 
This ensures that there's a single point of access to the cached data, preventing unnecessary duplication and ensuring consistency across the application.

Factory Method Pattern:
Implement a factory method pattern to create instances of different types of weather data objects. 
Depending on the source or type of weather data (e.g., current conditions, forecasts), a factory method can create the appropriate object.

Command Pattern:
Use the Command pattern to implement an undo/redo functionality for user interactions.
For example, users might want to undo their last search or view the previous set of weather details.
Commands can encapsulate these operations and be executed or undone as needed.

Adapter Pattern: +
If your app integrates with multiple weather APIs or services,
use the Adapter pattern to create a uniform interface for interacting with them.
This ensures that the app can work seamlessly with different data sources.

State Pattern: +++
Implement the State pattern to model different states of the weather app.
For instance, the app could have states like "loading," "displaying data," or "error."
The State pattern helps manage transitions between these states in a clean and organized manner.
*/