const request = require('request');

var getGeoCodeAddress = (address, callback) => {
    request({
        //pass the address taken from argument in cli and encode it
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
        json:true
    },(err, res, body)=>{
        if(err){
            callback("Unable to fetch the servers.");
        }else if(body.status == "ZERO_RESULTS" || body.status == "INVALID_REQUEST"){
            callback("Invalid Address");
        }else if(body.status == "OK"){
            callback(undefined,{
                address:body.results[0].formatted_address,
                latitude:body.results[0].geometry.location.lat,
                longitude:body.results[0].geometry.location.lng
            });
        }
    });
}

module.exports = {
    getGeoCodeAddress
}