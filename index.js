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
var guys = []
var gals = []
var m1 = menPref
var w1 = womenPref


function Person(id, gender) {
    console.log("Initialized person")
    var index = 0
    this.id = id
    this.gender = gender
    this.preference = []
    this.match = null

    this.rank = function(x) {
        for (var i = 0; i < this.preference.length; i++) {
            if (this.preference[i] == x) return i
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
        this.match = p;
    }

    this.swap = function(person) {
        console.log("Swapped %s with %s ", this.id, person.id);
        var thisMatch = this.match;
        var pMatch = person.match;
        this.engageTo(pMatch);
        person.engageTo(thisMatch);
    }
}

function checkStability(men, women) {
    for (var i = 0; i < men.length; i++)
        for (var j = 0; j < women.length; j++)
            if (men[i].prefers(women[j]) && women[j].prefers(men[i]))
                return false;
    return true;
}

function engageEveryone(men) {
    var flag;
    do {
        flag = true;
        for (var i = 0; i < men.length; i++) {
            var man = men[i];
            if (!man.match) {
                flag = false;
                var woman = man.nextCandidate();
                if (!woman.match || woman.prefers(man))
                    man.engageTo(woman);
            }
        }
    } while (!flag);
}

//Function to initalize the algorithm
async function initialize() {
    console.time("run")

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

    console.log('Women Pref : \n' + (util.inspect(womenPref, {
        showHidden: false,
        depth: null
    })))


    if (mlen == wlen) {
        console.log('Input file is in correct format!')
        n = mlen
        console.log('Size of input : ' + n)
        matchPref()
    } else {
        console.error("Incorrect format of input file (Number of men == Number of women). \n Process exited with code : ", code)
    }

    console.timeEnd("run")
}

async function matchPref() {
    var mPref = menPref
    var wPref = womenPref
    mlen = Object.keys(menPref).length
    for (var i = 0; i < 2 * Object.keys(mPref).length; i = i + 2) {
        var key = Object.keys(mPref)[i / 2]
        var gender = "Male"
        guys[i / 2] = new Person(key, gender)
    }
    for (var i = 1; i < 2 * Object.keys(wPref).length; i = i + 2) {
        var key = Object.keys(wPref)[(i - 1) / 2]
        var gender = "Female"
        gals[(i - 1) / 2] = new Person(key, gender)
    }

    for (var j = 0; j < guys.length; j++) {
        var values1 = m1[2 * j].split(':')
        var pref1 = JSON.stringify(values1[0])
        var y1 = pref1.replace(/['"]+/g, '')
        var x1 = y1.split(',')
        var p1 = []
        x1.forEach((el) => {
            var temp = parseInt(el.trim())
            p1.push(gals[(temp - 1) / 2])
            guys[j].preference = p1
        })
        var values2 = w1[2 * j + 1].split(':')
        var pref2 = JSON.stringify(values2[0])
        var y2 = pref2.replace(/['"]+/g, '')
        var x2 = y2.split(',')
        var p2 = []
        x2.forEach((el) => {
            var temp = parseInt(el.trim())
            p2.push(guys[(temp) / 2])
            gals[j].preference = p2
        })
    }

    // console.log("guys" + (util.inspect(guys, {
    //     showHidden: false,
    //     depth: null
    // })))
    // console.log("gals" + (util.inspect(gals, {
    //     showHidden: false,
    //     depth: null
    // })))

    engageEveryone(guys)

    for (var i = 0; i < guys.length; i++) {
        console.log("%s is engaged to %s", guys[i].id, guys[i].match.id);
    }

    console.log("Stable = %s", checkStability(guys, gals) ? "Yes" : "No");

    // guys[0].swap(guys[1]);

    // console.log("Stable = %s", checkStability(guys, gals) ? "Yes" : "No");
}

//Call function
initialize()