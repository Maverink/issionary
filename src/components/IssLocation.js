import React from "react";
import { Component } from "react";

const IssLocation = props => {
  return (
    <div className="issLocation">
      <h2>Iss Location</h2>
      <h3 id="issLat">Latitude:{props.issLat}</h3>
      <h3 id="issLon">Longitude:{props.issLon}</h3>
      <h3 id="issLocality">Locality:{props.issLocality}</h3>
      <h3 id="issLocalTime">Local Time:{props.issLocaltime}</h3>
    </div>
  );
};

export default IssLocation;
