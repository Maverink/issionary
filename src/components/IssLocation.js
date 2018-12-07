import React from "react";
import { Component } from "react";

const IssLocation = props => {
  return (
    <div className="panel panel__issLocation">
      <div className="panel__title--box panel__title--box1">
        <h2 className="panel__title--text ">Iss Location</h2>
      </div>
      <div className="panel__issLocation--flex">
        <div className="panel__set panel__set--issLat">
          <p className="panel__subtitle" id="issLat">
            Latitude:
            <br />
            <span>{props.issLat}</span>
          </p>
        </div>

        <div className="panel__set panel__set--issLon">
          <p className="panel__subtitle" id="issLon">
            Longitude:
            <br />
            <span>{props.issLon}</span>
          </p>
        </div>

        <div className="panel__set panel__set--issLoc">
          <p className="panel__subtitle" id="issLocality">
            Locality:
            <br />
            <span>{props.issLocality}</span>
          </p>
        </div>
        <div className="panel__set panel__set--issLocTime">
          <p className="panel__subtitle" id="issLocalTime">
            Local Time:
            <br />
            <span>{props.issLocaltime}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IssLocation;
