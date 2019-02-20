'use strict'
var fs = require('fs'); 
var EventEmitter = require('events').EventEmitter;
var request = require('request');
/*read in client id and client secrect key located in file Keys one directory up.
  key[0] = client id
  key[1] = client secret key
*/
var key = fs.readFileSync('../Keys','utf8').toString().split("\n");
class Weather extends EventEmitter{
    constructor(){
        super();
    }
    render(){
        //weather layout display
        var html = "./rab378_HW2.html";
        return html;

    }

    getWeather(req){
        var res = req.body;
        var URL = "https://api.aerisapi.com/forecasts/"+res.zipCode+"?&filter="+res.DayFil+"&limit="+res.numD+"&client_id="+key[0]+"&client_secret="+key[1];
        var self = this;
        request.get(URL, function(error, response, body){
            //var json = JSON.parse(body);
            self.emit("my_weather",body);
        });
    }
}

exports.getW = Weather;
