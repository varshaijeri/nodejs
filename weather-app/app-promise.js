//using promises
const yargs = require('yargs');
const axios = require('axios');

var args = yargs.options({
    a: {
        describe: "Address to fetch weather for",
        demand: true,
        alias: "address",
        string: true //parse the address value as string
    }
}).help().alias('help', 'h').argv;

var geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(args.address)}`;
axios.get(geoUrl).then((response) => {
    //response includes all headers
    if (response.data.status === 'ZERO_RESULTS' || response.data.status === 'INVALID_REQUEST') {
        throw new Error("Invalid Address");
    }
    console.log(response.data.results[0].formatted_address);
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/f3e1c0fb3e98f4a11dbe80c9075decf5/${lat},${lng}`;
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemp = response.data.currently.apparentTemperature;
    console.log(`Current Temperature is: ${temperature} ,but feels like ${apparentTemp}`);
}).catch((err) => {
    if (err.code === 'ENOTFOUND') {
        console.log("Unable to connect to server");
    } else {
        console.log(err.message);
    }
});