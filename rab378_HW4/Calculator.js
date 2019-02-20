'use strict'

function render(){
    //computation layout
    var html = "./rab378_HW3.html";
    return html;

}

function computeFibonacci(nth){
    //Largest fibonacci sequence that can be displayed
    var max_fib = 1476;
    //Javascript max character length before rounding
    var MAX_NUMBER_LENGTH = 16;
    //Retrieve user entered input
    var userNum = nth;
    var userInput = parseInt(Number(userNum));
    var result = 0;
    if (isNaN(userInput)) {
        // Display Invalid Input to user on inputs not numbers 
        result = "Invalid Input";

    }
    else if ((userInput < 0)) {
        //Displayed if user value is a negative number
        result = "Cannot compute Fib of negative integer";

    }
    else if (userInput >= 0 && userInput <= max_fib) {
        var fibNum = [0,1]; //Initial fibonacci values
        var i; //loop variable
        
        // Compute all Fibonacci integers up to users input
        for (i = 2; i <= userInput; i++) {
            fibNum[fibNum.length] = fibNum[i-1]+fibNum[i-2];    
        }
        result = fibNum[userInput];
        
    }
    else{
        result = "Out of Range: 0 <= n <= "+max_fib;
    }
    return result;
}




function computeSummation(nth){
    //Retrieve user entered input
    var MaxInt = Number.MAX_SAFE_INTEGER;
    var maxNumber = Number.MAX_VALUE;
    var userNum = nth;
    var userInput = (Number(userNum));
    var result = 0;
    var total = 0;
    if (isNaN(userInput)) {
        // Display Invalid Input to user on inputs not numbers 
        result = "Invalid Input";

    }
    else if ((userInput < 0)) {
        //Displayed if user value is a negative number
        result = "Cannot compute Summation of negative integer";

    }
    else if (userInput >= 0) {
        result = (userInput * (userInput + 1)) / 2;
        if(result > maxNumber){
            result = "Result Out of Range: "+ maxNumber;
        }   
    }
    return result;
}


module.exports = {
    render,
    computeFibonacci,
    computeSummation
}
