import React from "react";

const IssHumans = props => {
  function displayNames(arr) {
    let nuArr = [];
    for (let i = 0; i < arr.length; i++) {
      nuArr.push(<span className="human__item">{arr[i]}</span>);
    }

    return nuArr;
  }
  return (
    <div className="panel panel__humans">
      <div className="panel__title--box panel__title--box4">
        <h2 className="panel__title--text">Humans at the Iss</h2>
      </div>
      <div className="panel__humans--flex">
        <div className="panel__set panel__set--numHumans">
          <p className="panel__subtitle" id="issNumberHumans">
            Number of Humans:
            <br />
            <span>{props.numberHumans}</span>
          </p>
        </div>

        <div className="panel__set panel__set--nameHumans">
          <p className="panel__subtitle" id="issWhosThere">
            Whos there:
          </p>
          <br />

          {/* <span>{props.namesHumans}</span> */}
          {props.namesHumans == undefined
            ? props.namesHumans
            : displayNames(props.namesHumans)}
        </div>
      </div>
    </div>
  );
};

export default IssHumans;

// class Navigation extends React.Component {
//   render() {
//     const listItems = links.map((link) =>
//         <li key={link.endpoint}>{link.endpoint}</li>
//     );
//     return (
//       <div className="navigation">
//         <ul>
//           {listItems}
//         </ul>
//       </div>
//     );
// }
