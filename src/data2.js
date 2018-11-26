function pullData() {
  var globalData;
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

  let geoLoc_API = "http://ip-api.com/json";
  let whereIss_API = "https://api.wheretheiss.at/v1/satellites/25544";

  let bing_KEY =
    "Ajk-SypzWGM2sVY2PU3xav-JeTa710oDOGa9GYGLhutvVHE6Vs_VYwscQSbYdknH";
  let bing_API =
    "http://dev.virtualearth.net/REST/v1/Locations/47.64054,-122.12934?includeEntityTypes=countryRegion,Address,Neighborhood,PopulatedPlace&key=" +
    bing_KEY;

  let timeZone_API =
    "http://api.timezonedb.com/v2.1/get-time-zone?key=DY44KDARYL4Q&format=json&by=position&";
  let timeZoneKEY = "DY44KDARYL4Q";

  let openNotify_API = "http://api.open-notify.org/astros.json";

  let n2yo_KEY = "9STWLA-H3MFDR-BHBC4H-3X0W";

  let n2yo_API =
    "https://www.n2yo.com/rest/v1/satellite/visualpasses/25544/-39.90318514/158.28897924/5/10/1&apiKey=" +
    n2yo_KEY;

  async function fetchingData() {
    let geoLocResponse = await fetch(geoLoc_API);
    let geoLocJSON = await geoLocResponse.json();

    let whereIssResponse = await fetch(whereIss_API);
    let whereIssJSON = await whereIssResponse.json().then(json => {
      console.log("yooo" + json);
      return json;
    });

    let timeZoneResponse = await fetch(
      timeZone_API +
        "lat=" +
        whereIssJSON.latitude +
        "&lng=" +
        whereIssJSON.longitude
    );
    let timeZoneJSON = await timeZoneResponse.json();

    let openNotifyResponse = await fetch(openNotify_API);

    let openNotifyJSON = await openNotifyResponse.json();

    // let bingResponse = await fetch(
    //   "http://dev.virtualearth.net/REST/v1/Locations/" +
    //     whereIssJSON.latitude +
    //     "," +
    //     whereIssJSON.longitude +
    //     "?includeEntityTypes=countryRegion,Address,Neighborhood,PopulatedPlace&key=" +
    //     bing_KEY
    // );

    // let bingJSON = await bingResponse.json();

    let n2yoPass = await fetch(
      "https://www.n2yo.com/rest/v1/satellite/radiopasses/25544/" +
        geoLocJSON.latitude +
        "/" +
        geoLocJSON.longitude +
        "/5/10/2&apiKey=" +
        n2yo_KEY
    );

    let n2yoPassVisible = await fetch(
      "https://www.n2yo.com/rest/v1/satellite/visualpasses/25544/" +
        geoLocJSON.latitude +
        "/" +
        geoLocJSON.longitude +
        "/5/10/0&apiKey=" +
        n2yo_KEY
    );

    let n2yoPassJSON = await n2yoPass.json();

    let n2yoPassVisibleJSON = await n2yoPassVisible.json();

    console.log(openNotifyJSON);

    let allData = {
      userLat: geoLocJSON.lat,
      userLon: geoLocJSON.lon,
      userCity: geoLocJSON.city,
      userCountry: geoLocJSON.country,
      issLat: whereIssJSON.latitude,
      issLon: whereIssJSON.longitude,
      // issCity: bingJSON.resourceSets[0].resources[0].address.locality,
      // issCountry: bingJSON.resourceSets[0].resources[0].address.countryRegion,
      issLocalTime: timeZoneJSON.formatted,
      issAltitude: whereIssJSON.altitude,
      issVelocity: whereIssJSON.velocity,
      issVisibility: whereIssJSON.visibility,
      issNextPass: convertUnixToDate(n2yoPassJSON.passes[0].startUTC),
      issNextVisiblePass: convertUnixToDate(
        n2yoPassVisibleJSON.passes[0].startUTC
      ),
      issHumansNumber: openNotifyJSON.number,
      issHumansWho: openNotifyJSON.people.map(name => name.name + ",")
    };
    updateData(allData);

    return allData;
  }
  fetchingData();
}
pullData();

async function updateData(allData) {
  console.log("the data is " + allData.userLat);
  await this.setState({ userLocation: "rrrrrrrr" });
}

export function setStateTest() {
  // setState({ test: "yes!" });
  console.log(this);
}
