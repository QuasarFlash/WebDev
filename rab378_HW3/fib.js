'use strict'
class Fibonacci{
    constructor(nth){
        this.nth = nth;
    }
    calc(){
        //Largest fibonacci sequence that can be displayed
        var max_fib = 1476;
        //Javascript max character length before rounding
        var MAX_NUMBER_LENGTH = 16;
        //Retrieve user entered input
        var userNum = this.nth;
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
}
exports.Fibonacci = Fibonacci;
