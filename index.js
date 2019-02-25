/*

Gale-Shapley Algorithm Implementation in NodeJS

The input file contains a JSON (JavaScript Object Notation) with 
the preferences of the men and women that need to be matched.

To maintain simplicity all the men and women have been assigned a unique ID
Men have been assigned even numbers  : [0, 2, 4, ..]
Women have been assigned odd numbers : [1, 3, 5, ..]

*/

//Command line arguments
const args = process.argv.splice(2)

//Module imports
var util = require('util')
var fs = require('fs')

//File imports
var input = require('./'+ args)

//Reading the file
var menPref = input.men
var womenPref = input.women

//Global variables
var n, mlen, wlen
var men = []
var women = []


//Class & Constructor
class Person {
    constructor(id, gender) {
        var index = 0;
        this.id = id;
        this.gender = gender;
        this.preference = [];
        this.match = null;
        //Returns the rank of the preferences
        this.order = function (x) {
            for (var i = 0; i < this.preference.length; i++) {
                if (this.preference[i] == x)
                    return i;
                return this.preference.length + 1;
            }
        };
        //Returns if Person prefers another person
        this.prefers = function (x) {
            return this.order(x) < this.order(this.match);
        };
        //Returns next best match for a Person
        this.nextMatch = function () {
            if (index >= this.preference.length)
                return null;
            return this.preference[index++];
        };
        //Match one Person with the other
        this.matchWith = function (x) {
            if (x.match)
                x.match.match = null;
            x.match = this;
            if (this.match)
                this.match.match = null;
            this.match = x;
        };
        //Swap partners for two Persons
        this.swap = function (person) {
            console.log("Swapped %s with %s ", this.id, person.id);
            var thisMatch = this.match;
            var pMatch = person.match;
            this.matchWith(pMatch);
            person.matchWith(thisMatch);
        };
    }
}

//Function to check stability of the current match status
function checkStability(men, women) {
    for (var i = 0; i < men.length; i++)
        for (var j = 0; j < women.length; j++)
            if (men[i].prefers(women[j]) && women[j].prefers(men[i]))
                return false;
    return true;
}

//Function to match all men and women 
function matchAll(men) {
    var flag;
    do {
        flag = true;
        for (var i = 0; i < men.length; i++) {
            var man = men[i];
            if (!man.match) {
                flag = false;
                var woman = man.nextMatch();
                if (!woman.match || woman.prefers(man))
                    man.matchWith(woman);
            }
        }
    } while (!flag);
}

//Function to initalize the algorithm
async function initialize() {
    console.time("Execution time")

    if (menPref == "" || womenPref == "") {
        console.error("Incorrect format of input file () \n Process exited with code : ", code)
        process.exitCode = 1
    }

    mlen = Object.keys(menPref).length
    wlen = Object.keys(womenPref).length

    console.log('Men Pref : \n' + (util.inspect(menPref, {
        showHidden: false,
        depth: null
    })))

    console.log('\n')

    console.log('Women Pref : \n' + (util.inspect(womenPref, {
        showHidden: false,
        depth: null
    })))

    console.log('\n')

    if (mlen == wlen) {
        console.log('Input file is in correct format! \n')
        n = mlen
        console.log('Size of input : ' + n + '\n')
        console.log('Data Processed, starting matching process .. \n')
        matchPref()
    } else {
        console.error("Incorrect format of input file (Number of men == Number of women). \n Process exited with code : ", code)
    }

    console.timeEnd("Execution time")
}

//Function to process the input data and feed into the matching algorithm
async function matchPref() {
    var mPref = menPref
    var wPref = womenPref
    mlen = Object.keys(menPref).length
    for (var i = 0; i < 2 * Object.keys(mPref).length; i = i + 2) {
        var key = Object.keys(mPref)[i / 2]
        var gender = "Male"
        men[i / 2] = new Person(key, gender)
    }
    for (var i = 1; i < 2 * Object.keys(wPref).length; i = i + 2) {
        var key = Object.keys(wPref)[(i - 1) / 2]
        var gender = "Female"
        women[(i - 1) / 2] = new Person(key, gender)
    }

    for (var j = 0; j < men.length; j++) {
        var values1 = menPref[2 * j].split(':')
        var pref1 = JSON.stringify(values1[0])
        var y1 = pref1.replace(/['"]+/g, '')
        var x1 = y1.split(',')
        var p1 = []
        x1.forEach((el) => {
            var temp = parseInt(el.trim())
            p1.push(women[(temp - 1) / 2])
            men[j].preference = p1
        })
        var values2 = womenPref[2 * j + 1].split(':')
        var pref2 = JSON.stringify(values2[0])
        var y2 = pref2.replace(/['"]+/g, '')
        var x2 = y2.split(',')
        var p2 = []
        x2.forEach((el) => {
            var temp = parseInt(el.trim())
            p2.push(men[(temp) / 2])
            women[j].preference = p2
        })
    }

    // console.log("men" + (util.inspect(men, {
    //     showHidden: false,
    //     depth: null
    // })))
    // console.log("women" + (util.inspect(women, {
    //     showHidden: false,
    //     depth: null
    // })))

    matchAll(men)

    for (var i = 0; i < men.length; i++) {
        console.log("Man " + men[i].id + " is matched with woman " + men[i].match.id);
    }

    console.log("\nStable : " + (checkStability(men, women) ? "Yes" : "No") + "\n");

    // men[0].swap(men[1]);

    // console.log("Stable : %s", checkStability(men, women) ? "Yes" : "No");
}

//Call function
initialize()

