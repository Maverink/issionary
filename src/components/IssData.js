import React, { Component } from "react";

const IssData = props => {
  return (
    <div className="panel panel__issData">
      <div className="panel__title--box panel__title--box3">
        <h2 className="panel__title--text ">Iss Data</h2>
      </div>

      <div className="panel__issData--flex">
        <div className="panel__set panel__set--issAlt">
          <p className="panel__subtitle" id="issAltitude">
            Altitude:
            <br />
            <span>{props.issAlt} kms</span>
          </p>
        </div>

        <div className="panel__set panel__set--issVel">
          <p className="panel__subtitle" id="issVelocity">
            Velocity:
            <br />
            <span>{props.issVel} kms/hr</span>
          </p>
        </div>

        <div className="panel__set panel__set--issVis">
          <p className="panel__subtitle" id="issVisibility">
            Visibility:
            <br />
            <span>{props.issVis}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IssData;
