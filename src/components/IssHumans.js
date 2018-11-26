import React from "react";

const IssHumans = props => {
  return (
    <div>
      <div className="issHumans">
        <h2>Humans at the Iss</h2>
        <h3 id="issNumberHumans">Number of Humans:{props.numberHumans}</h3>
        <h3 id="issWhosThere">Whos there:{props.namesHumans}</h3>
      </div>
    </div>
  );
};

export default IssHumans;
