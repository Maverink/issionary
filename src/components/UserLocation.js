import React from "react";

const UserLocation = props => {
  return (
    <div className="panel panel__userLocation">
      <div className="panel__title--box panel__title--box2">
        <h2 className="panel__title--text">Your Location</h2>
      </div>

      <div className="panel__userLocation--flex">
        <div className="panel__set panel__set--userLoc">
          <p className="panel__subtitle" id="userLocation">
            Location:
            <br />
            <span>{props.city}</span>
            <br />
            <span>{props.country}</span>
          </p>
        </div>

        {/* <div className="panel__set panel__set--userLocTime">
          <p className="panel__subtitle" id="userLocalTime">
            Local Time:
            <br />
            <span>???????</span>
          </p>
        </div> */}

        <div className="panel__set panel__set--userNextPass">
          <p className="panel__subtitle" id="userNextPass">
            Next Pass in:
            <br />
            <span>{props.nextPass}</span>
          </p>
        </div>

        <div className="panel__set panel__set--userNextVisPass">
          <p className="panel__subtitle" id="userNextVisiblePass">
            Next Visible Pass in:
            <br />
            <span>{props.nextVisiblePass}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLocation;
