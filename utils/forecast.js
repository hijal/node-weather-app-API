const request = require('request');

const forecast = (latitude, longitude, cb) => {
    const url = `https://api.darksky.net/forecast/b979c2729e537449d24e7e7cfbdad873/${latitude},${longitude}?units=si`;
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            cb('Unable to connect with weather service!', undefined);
        } else if (response.body.error) {
            cb('Unable to find a location! try another search!', undefined);
        } else if (response) {
            cb(undefined, response.body.currently.summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.');
        }
    });

};

module.exports = forecast;