/*

Gale-Shapley Algorithm Implementation in NodeJS

The input file contains a JSON (JavaScript Object Notation) with 
the preferences of the men and women that need to be matched.

To maintain simplicity all the men and women have been assigned a unique ID
Men have been assigned even numbers  : [0, 2, 4, ..]
Women have been assigned odd numbers : [1, 3, 5, ..]

*/

//File imports
var input = require('./input.json')

//Reading the file
var menPref = input.men
var womenPref = input.women

//Global variables
var n, mlen, wlen;

//Function to initalize the algorithm
async function initialize() {

    if (menPref == "" || womenPref == "") {
        console.error("Incorrect format of input file () /n Process exited with code : ", code)
        process.exitCode = 1
    }

    mlen = Object.keys(menPref).length
    wlen = Object.keys(womenPref).length
    console.log('Number of men : ' + mlen)
    console.log('Number of women : ' + wlen)


    if (mlen == wlen) {
        console.log('Input file is in correct format!')
        n = mlen
        console.log('Size of input : ' + n)

    }
    else {
        console.error("Incorrect format of input file (Number of men == Number of women). /n Process exited with code : ", code)
    }

}

//Call function
initialize()