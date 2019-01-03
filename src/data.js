import React from "react";
import { Component } from "react";
import { isArray } from "util";

function convertUnixToDate(timestamp) {
  var a = new Date(timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

////////////////////////////////////////////////////////////////////////////////////////////
let dataObj = {};

let geoLoc_API = "https://ip-api.com/json";
let whereIss_API = "https://api.wheretheiss.at/v1/satellites/25544";

let bing_KEY =
  "Ajk-SypzWGM2sVY2PU3xav-JeTa710oDOGa9GYGLhutvVHE6Vs_VYwscQSbYdknH";
let bing_API =
  "https://dev.virtualearth.net/REST/v1/Locations/47.64054,-122.12934?includeEntityTypes=countryRegion,Address,Neighborhood,PopulatedPlace&key=" +
  bing_KEY;

let timeZone_API =
  "https://api.timezonedb.com/v2.1/get-time-zone?key=DY44KDARYL4Q&format=json&by=position&";
let timeZoneKEY = "DY44KDARYL4Q";

// let openNotify_API = "http://api.open-notify.org/astros.json";

let n2yo_KEY = "9STWLA-H3MFDR-BHBC4H-3X0W";

let n2yo_API =
  "https://www.n2yo.com/rest/v1/satellite/visualpasses/25544/-39.90318514/158.28897924/5/10/1&apiKey=" +
  n2yo_KEY;
///////////////////////////////////////////////////////////////////////////////////////////////////

export async function fetchingData() {
  let geoLocData = await fetch("https://ipapi.co/json/")
    .then(res => res.json())
    .then(json => {
      console.log(json);
      console.log(json);
      dataObj.userLat = json.lat;

      dataObj.userLon = json.lon;

      dataObj.userCity = json.city;
      dataObj.userCountry = json.country_name;

      return json;
    });

  let whereIssData = await fetch(whereIss_API)
    .then(res => res.json())
    .then(json => {
      dataObj.issLat = json.latitude;
      dataObj.issLon = json.longitude;
      dataObj.issAlt = Math.round(json.altitude);
      dataObj.issVel = Math.round(json.velocity);
      dataObj.issVis = json.visibility;
      console.log(json);
      return json;
    });

  let bingData = await fetch(
    "https://dev.virtualearth.net/REST/v1/Locations/" +
      whereIssData.latitude +
      "," +
      whereIssData.longitude +
      "?includeEntityTypes=countryRegion,Address,Neighborhood,PopulatedPlace&key=" +
      bing_KEY
  )
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (json.resourceSets[0].estimatedTotal > 0) {
        console.log("is over land: ");

        dataObj.issLocality =
          json.resourceSets[0].resources[0].address.formattedAddress;

        console.log(dataObj.issLocality);

        return json.resourceSets[0].resources[0].address;
      } else {
        console.log("is over water");
        dataObj.issLocality = "International waters";
        console.log(dataObj.issLocality);
        return "currently at International waters";
      }
    });

  console.log(bingData);

  let timeZoneData = await fetch(
    timeZone_API + "lat=" + dataObj.issLat + "&lng=" + dataObj.issLon
  )
    .then(data => {
      return data.json();
    })
    .then(json => {
      if (json.formatted) {
        dataObj.issLocalTime = json.formatted;
        console.log("iss timezone available");
      } else {
        dataObj.issLocalTime = "not available";
        console.log("iss timezone NOT availabloe");
      }

      console.log(json.formatted);
    });

  let nextPassData = await fetch(
    "https://www.n2yo.com/rest/v1/satellite/radiopasses/25544/" +
      dataObj.userLat +
      "/" +
      dataObj.userLon +
      "/5/10/2&apiKey=" +
      n2yo_KEY
  )
    .then(res => res.json())
    .then(json => {
      dataObj.issPass = convertUnixToDate(json.passes[0].startUTC);
      return json;
    });

  // console.log(nextPassData);

  let nextPassVisibleData = await fetch(
    "https://www.n2yo.com/rest/v1/satellite/visualpasses/25544/" +
      dataObj.userLat +
      "/" +
      dataObj.userLon +
      "/5/10/0&apiKey=" +
      n2yo_KEY
  )
    .then(res => res.json())
    .then(json => {
      dataObj.issVisiblePass = convertUnixToDate(json.passes[0].startUTC);
    });

  console.log(dataObj);
  ////////////////////////////////////////////
  dataObj.issLat = dataObj.issLat.toString().substring(0, 6);
  dataObj.issLon = dataObj.issLon.toString().substring(0, 6);
  return dataObj;
} /////////////////////////////////////////////////////////////////////////

// requestsPromise.then(function(requestData) { /*
//   ^^^^^^ notice the return! */
//       console.log(requestData); // <---- Data is given as an argument
//       return requestData;
//   });

// export function someFunc(state) {
//   if(state.whatever) {...}
//   const newState = { ...state, newValue: whateverValue }
//   return newState
// }

// _anotherFunc = () = > {
//       ....
//       const newState = this.someFunc(this.state);
//      this.setState({newValue: newState});
//   }
