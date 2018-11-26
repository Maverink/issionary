import React from "react";

import IssLocation from "./components/IssLocation";
import UserLocation from "./components/UserLocation";
import IssHumans from "./components/IssHumans";
import IssData from "./components/IssData";
import Globe from "./components/Globe";

import "./App.css";
// var TODO = require("../todo");

// import { pullData } from "./data";

import { fetchingData } from "./data";

// import { dataObj } from "./data";

// import { setStateTest } from "./data";

class App extends React.Component {
  state = {
    test: undefined,
    userLocation: undefined,
    userNextPass: undefined,
    issLon: undefined,
    issLat: undefined,
    issLocality: undefined,
    issLocalTime: undefined,
    issAlt: undefined,
    issVel: undefined,
    issVis: undefined,
    issPass: undefined,
    issVisiblePass: undefined,
    issHumansNum: undefined,

    issHumansNames: undefined
  };

  async componentDidMount() {
    // console.log(
    //   "dataObj from APP.JS" + fetchingData().then(data => console.log(data))
    // );

    const res = fetchingData();
    const something = await res;

    this.setState({
      userLocation: something.userLat,
      issLon: something.issLon,
      issLat: something.issLat,
      issLocality: something.issLocality,
      issPass: something.issPass,
      issVisiblePass: something.issVisiblePass,
      issLocalTime: something.issLocalTime,
      issAlt: something.issAlt,
      issVel: something.issVel,
      issVis: something.issVis,
      numberHumans: something.numberHumans,
      namesHumans: something.namesHumans
    });
  }

  render() {
    return (
      <div className="wrapper">
        <IssLocation
          issLon={this.state.issLon}
          issLat={this.state.issLat}
          issLocality={this.state.issLocality}
          issLocaltime={this.state.issLocalTime}
        />

        <UserLocation
          location={this.state.userLocation}
          nextPass={this.state.issPass}
          nextVisiblePass={this.state.issVisiblePass}
        />

        {/* <Globe /> */}

        <IssData
          issAlt={this.state.issAlt}
          issVel={this.state.issVel}
          issVis={this.state.issVis}
        />

        <IssHumans
          namesHumans={this.state.namesHumans}
          numberHumans={this.state.numberHumans}
        />
      </div>
    );
  }
}

export default App;
