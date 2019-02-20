var http = require('http')
var express = require('express');
var bodyparser = require('body-parser');
var request = require('request');
var app = express();
var hostname = "localhost";
var port = 8080;
var path = "."
var sum = require(path+'/sum');
var fib = require(path+'/fib');
app.use(express.static(path));

app.get('./', function(request,response){
    console.log("I am Here.");
    response.sendFile("rab378_HW3.html");
});

app.get('/sum', function(request, response){
    console.log("Get Summation.");
    var query = request.query;
    var res = new sum.Summation(query.n);
    console.log("\tSummation("+query.n+") = "+ res.calc());
    var answer = res.calc();
    response.write(""+answer); 
    response.end();
});


app.get('/fib', function(request, response){
    console.log("Get Fibonnaci.");
    var query = request.query;
    var res = new fib.Fibonacci(query.n);
    console.log("\tFibonacci("+query.n+") = "+ res.calc());
    var answer = res.calc();

    response.write(""+answer); 

    response.end();
});



app.listen(port, function(){
    console.log("Math Calculation Server Started...");
});
