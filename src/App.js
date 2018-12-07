import React, { Component } from "react";

import IssLocation from "./components/IssLocation";
import UserLocation from "./components/UserLocation";
import IssHumans from "./components/IssHumans";
import IssData from "./components/IssData";
import Globe from "./components/Globe";
import Grid from "./components/Grid";

import "./App.css";

import { fetchingData } from "./data";
// import { planet } from "./libraries/planetaryjs";

// componentDidMount () {
//   const script = document.createElement("script");

//   script.src = "https://use.typekit.net/foobar.js";
//   script.async = true;

//   document.body.appendChild(script);
// }

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
      userLatitude: something.userLat,
      userLongitude: something.userLon,
      userCity: something.userCity,
      userCountry: something.userCountry,

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
      <div>
        <div className="wrapper">
          <div className="marks">
            <div className="mark mark1" />
            <div className="mark mark2" />
            <div className="mark mark3" />
            <div className="mark mark4" />
          </div>
          <div className="logo">
            <h1>Issionary</h1>
          </div>
          <IssLocation
            issLon={this.state.issLon}
            issLat={this.state.issLat}
            issLocality={this.state.issLocality}
            issLocaltime={this.state.issLocalTime}
          />

          <UserLocation
            city={this.state.userCity}
            country={this.state.userCountry}
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

          <Globe />
        </div>
        <Grid />
      </div>
    );
  }
}

export default App;
