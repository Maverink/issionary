import React from "react";

const IssData = props => {
  return (
    <div>
      <div className="issData">
        <h2>Iss Data</h2>
        <h3 id="issAltitude">Altitude: {props.issAlt} kms</h3>
        <h3 id="issVelocity">Velocity:{props.issVel} kms/hr</h3>
        <h3 id="issVelocity">Visibility:{props.issVis}</h3>
      </div>
    </div>
  );
};

export default IssData;
