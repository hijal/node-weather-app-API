const request = require('request');

const geocoding = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaW1oMWo0bCIsImEiOiJja2E5cGZra3YwYWk2MnBwNzkzbGFnaHcyIn0.VmvWS76OfEfLi6GxnZtfDQ&limit=1`;
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            cb('Unable to connect with geocoding!', undefined);
        } else if (!response.body.features.length) {
            cb('Unable to find your Geolocation', undefined);
        } else if (response.body.features.length) {
            cb(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }

    });
};

module.exports = geocoding;