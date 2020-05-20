const path = require('path');
const express = require('express');
const ejs = require('ejs');
const geolocation = require('./utils/geolocation');
const forecast = require('./utils/forecast');

const publicPath = path.join(__dirname, 'public');
const viewPath = path.join(__dirname, './views')


const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: "Home"
    });
});

app.get('/weather', (req, res) => {
    let address = req.query.address;
    if (!address) {
        return res.send({
            error: "please provide an address."
        });
    }
    geolocation(address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
            });
        });
    });
});


app.listen(3000, () => {
    console.log('App listening on port 3000!');
});