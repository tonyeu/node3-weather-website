const request = require("request");

const forecast = (longitude, latitude, callback) => {
    const weatherStack_api_key = "68fb9e667dd3b41eb6206664d6a4120d";
    const url = "http://api.weatherstack.com/current?access_key=" + weatherStack_api_key + "&query="+ encodeURIComponent(latitude + "," + longitude) +"&units=m";
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("unable to connect to weather service");
            return;
        }
        if(body.error) {
            callback("Unable to find location");
            return;
        }
        callback(undefined, "It's " + body.current.observation_time + " and it's " + body.current.weather_descriptions[0].toLowerCase() + ". It is currently " + body.current.temperature + " degrees but it feels like " + body.current.feelslike + ".");
    });
};

module.exports = forecast;