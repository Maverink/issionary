import React from "react";

const UserLocation = props => {
  return (
    <div>
      <div className="userLocation">
        <h2>User Location</h2>
        <h3 id="userLocation">Location:{props.location}</h3>
        <h3 id="userLocalTime">Local Time:</h3>
        <h3 id="userNextPass">Next Pass in:{props.nextPass}</h3>
        <h3 id="userNextVisiblePass">
          Next Visible Pass in:{props.nextVisiblePass}
        </h3>
      </div>
    </div>
  );
};

export default UserLocation;
