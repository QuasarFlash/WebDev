'use strict'
class Summation {
    constructor(nth){
        this.nth = nth;
    }
    calc(){
        //Retrieve user entered input
        var MaxInt = Number.MAX_SAFE_INTEGER;
        var maxNumber = Number.MAX_VALUE;
        var userNum = this.nth;
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
}
exports.Summation = Summation;
