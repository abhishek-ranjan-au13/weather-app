//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request = require("postman-request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c951dc6db1abbc46b1f167dc8460393b&query=" +
    latitude +
    "," +
    longitude;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to get weather-app", undefined);
    } else if (response.body.error) {
      callback("unable to find the location", undefined);
    } else {
      callback(
        undefined,
        ` ${response.body.current.weather_descriptions} . It is currently ${response.body.current.temperature} degrees out, but feels like ${response.body.current.feelslike} degrees`
      );
    }
  });
};
module.exports = forecast;
