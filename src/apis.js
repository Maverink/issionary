// export const displayData = function() {
//   let ip_API = "http://ip-api.com/json";

//   // weather 7664be084f4d08efec96c74ded7f2dab

//   let weather_API =
//     "http://api.openweathermap.org/data/2.5/weather?appid=7664be084f4d08efec96c74ded7f2dab&units=metric&q=";

//   let promise = fetch(ip_API);

//   promise
//     .then(response => response.json())
//     .then(json => {
//       displayCity(json.city);
//       return json;
//     })
//     .then(json => {
//       displayCountry(json.country);
//       return json;
//     })
//     .then(json => {
//       fetch(weather_API + json.city)
//         .then(response => {
//           console.log(response);
//           return response;
//         })
//         .then(response => response.json())
//         .then(json => {
//           // function displayTemp(json.main.temp) {
//           //   document.querySelector("h3").textContent += data;
//           // }
//           console.log(json);

//           document.querySelector("h3").textContent += json.main.temp;
//         });
//     });

//   function displayCity(data) {
//     document.querySelector("h1").textContent += data;
//   }

//   function displayCountry(data) {
//     document.querySelector("h2").textContent += data;
//   }

//   //   function displayTemp(data) {
//   //     document.querySelector("h3").textContent += data;
//   //   }
// };
// // export displayData();
import React from "react";

let geoLoc_API = "http://ip-api.com/json";
let whereIss_API = "";
let openNotify_API = "";
let ibmVid_API = "";

export const displayData = function() {
  fetch(geoLoc_API)
    .then(response => response.json())
    .then(json => {
      that.setState({ userLon: json.lat });
    });
};

// .then(json => console.log(json.lat));
