var util = require('util')
const fs = require('fs')
const args = process.argv.slice(2, 3)
const n = process.argv.slice(3)

var input = {}
function generatePref(n){
    input["men"] = {}
    for(var i = 0 ; i < n ; i++){
        var data = {}
        var key = "" + i*2
        data[key] = []
        console.log(key)
        var pref = []
        for(var j = 1 ; j < 2 * n ; j = j + 2){
            var list = []
            for(var h = 1 ; h < 2 * n ; h = h + 2){
                list.push(h)
            }
            var result = shuffle(list)
            result.join(", ")
            data[key] = "" + result
        } 
        input["men"][i*2] = (data[key])
        console.log(util.inspect(input))
    }
    input["women"] = {}
    for(var i = 0 ; i < n ; i++){
        var data = {}
        var key = "" + ( i*2 + 1 ) 
        data[key] = []
        console.log(key)
        var pref = []
        for(var j = 0 ; j < 2 * n ; j = j + 2){
            var list = []
            for(var h = 0 ; h < 2 * n ; h = h + 2){
                list.push(h)
            }
            var result = shuffle(list)
            result.join(", ")
            data[key] = "" + result
        } 
        input["women"][i*2 + 1] = data[key]
        console.log(JSON.stringify(input))
        fs.writeFile("/home/parikshit/Documents/OS/gale-shapley/input/" + args, JSON.stringify(input), function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        })
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  

generatePref(n)