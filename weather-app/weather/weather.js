const request = require('request');

var getWeather = (lat, lng, callback) => {
    
    request({
        url:`https://api.darksky.net/forecast/f3e1c0fb3e98f4a11dbe80c9075decf5/${lat},${lng}`,
        json:true
    },(err, res, body) => {
        if(!err && res.statusCode === 200){
            callback(undefined,{temperature:body.currently.temperature,apparentTemperature:body.currently.apparentTemperature});
        }else{
            callback('unable to fetch weather');
        }
    });
}

module.exports = {
    getWeather
}