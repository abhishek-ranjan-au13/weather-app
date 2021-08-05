const request = require("postman-request");
const geocoding = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZ2F5YW52ankiLCJhIjoiY2tyYnljemgwMTJvZDMycXVnOG11ZmI5dyJ9.04s5LqygiuZZv609I3DDpA&limit=1";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to find weather API", undefined);
    } else if (response.body.features.length === 0) {
      callback("unable to find location, try something else", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};
module.exports = geocoding;
