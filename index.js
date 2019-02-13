/*

Gale-Shapley Algorithm Implementation in NodeJS

The input file contains a JSON (JavaScript Object Notation) with 
the preferences of the men and women that need to be matched.

To maintain simplicity all the men and women have been assigned a unique ID
Men have been assigned even numbers  : [0, 2, 4, ..]
Women have been assigned odd numbers : [1, 3, 5, ..]

*/

//Module imports
var util = require('util')

//File imports
var input = require('./input.json')

//Reading the file
var menPref = input.men
var womenPref = input.women

//Global variables
var n, mlen, wlen
var persons = []

function Person(id, gender){
    var index = 0

    this.id = id
    this.gender = gender
    this.preference = []
    this.match = null

    this.rank = function(x){
        for(var i = 0; i<this.preference.length ; i++){
            if(this.preference[i] == x) return i
        return this.preference.length + 1
        }
    }
    this.prefers = function(x) {
        return this.rank(x) < this.rank(this.match);
    }
 
    this.nextCandidate = function() {
        if (index >= this.preference.length) return null;
        return this.preference[index++];
    }
 
    this.engageTo = function(p) {
        if (p.match) p.match.match = null;
        p.match = this;
        if (this.match) this.match.match = null;
        this.fiance = p;
    }
 
    this.swapWith = function(p) {
        console.log("%s & %s swap partners", this.name, p.name);
        var thisFiance = this.fiance;
        var pFiance = p.fiance;
        this.engageTo(pFiance);
        p.engageTo(thisFiance);
    }
}

//Function to initalize the algorithm
async function initialize() {

    if (menPref == "" || womenPref == "") {
        console.error("Incorrect format of input file () \n Process exited with code : ", code)
        process.exitCode = 1
    }
    mlen = Object.keys(menPref).length
    wlen = Object.keys(womenPref).length
    console.log('Men Pref : \n' + (util.inspect(menPref, { showHidden: false, depth: null })))
    console.log('Women Pref : \n' + (util.inspect(womenPref, { showHidden: false, depth: null })))


    if (mlen == wlen) {
        console.log('Input file is in correct format!')
        n = mlen
        console.log('Size of input : ' + n)
        matchPref()
    }
    else {
        console.error("Incorrect format of input file (Number of men == Number of women). \n Process exited with code : ", code)
    }



}

async function matchPref(){
    var mPref = menPref
    var wPref = womenPref
    for(var i=0; i < 2 * Object.keys(mPref).length; i = i + 2){
        var key = Object.keys(mPref)[i/2]
        console.log('Key : '+key)
        var values = menPref[i].split(':')
        var pref = JSON.stringify(values[0])
        var y = pref.replace(/['"]+/g, '')
        var x = y.split(',')
        x.forEach(el =>{
            console.log(el.trim())
        })
    }
}

//Call function
initialize()