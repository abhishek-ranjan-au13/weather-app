const request = require("postman-request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c951dc6db1abbc46b1f167dc8460393b&query=" +
    latitude +
    "," +
    longitude;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to get weather-app", undefined);
    } else if (body.error) {
      callback("unable to find the location", undefined);
    } else {
      callback(
        undefined,
        ` ${body.current.weather_descriptions} . It is currently ${body.current.temperature} degrees out, but feels like ${body.current.feelslike} degrees. Humidity is ${body.current.humidity}% and Cloudcover is ${body.current.cloudcover}%`
      );
    }
  });
};
module.exports = forecast;
