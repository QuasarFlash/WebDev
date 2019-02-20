var http = require('http')
var express = require('express');
var bodyparser = require('body-parser');
var req = require('request');
var fs = require('fs');
var app = express();
var hostname = "localhost";
var port = 8080;
var path = "./"
var calculator = require(path+'Calculator');
var weather = require(path+'Weather');
var WR = new weather.getW();
var Home = require(path+'Home');
app.use(express.static(path));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.get(path, function(req,res){
    console.log("I am Here.");

});

app.get('/Home', function(req, res){
    console.log("Render Home.");
    var homeRender = fs.readFileSync(path+Home.render());
    res.write(homeRender); 
    res.end();
});

app.get('/Calculator', function(req, res){
    console.log("Render Calculator.");
    var calcRender = fs.readFileSync(path+calculator.render());
    res.write(calcRender); 
    res.end();
});

app.get('/sum', function(req, res){
    console.log("Get Sum.");
    var calcSum = calculator.computeSummation(req.query.n);
    console.log(calcSum);
    res.write(""+calcSum); 
    res.end();
});

app.get('/fib', function(req, res){
    console.log("Get Fib.");
    var calcFib = calculator.computeFibonacci(req.query.n);
    console.log(calcFib);
    res.write(""+calcFib); 
    res.end();
});

app.get('/Weather', function(req, res){
    console.log("Render Weather.");
    var WeatherRender = fs.readFileSync(path+WR.render());
    res.write(WeatherRender); 
    res.end();
});

app.post('/getWeather', function(req, res){
    console.log("Get Weather");
    WR.once('my_weather',function(msg){
        res.write(msg);
        res.end();
    });
    WR.getWeather(req);
});

app.listen(port, function(){
    console.log("Homework 4 Server Started...");
});
