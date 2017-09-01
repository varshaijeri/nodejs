const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

var args = yargs.options({
    a: {
        describe: "Address to fetch weather for",
        demand: true,
        alias: "address",
        string: true //parse the address value as string
    }
}).help().alias('help', 'h').argv;

//get latitude and longitude
geocode.getGeoCodeAddress(args.address, (err, results) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Address: ${results.address}`);
        //get temperature
        weather.getWeather(results.latitude, results.longitude, (err, weatherResults) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Currently the temperature is ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
            }
        });
    }
});