var util = require('util')
const fs = require('fs')
const args = process.argv.slice(2, 3)
const n = process.argv.slice(3)

var input = {}
function generatePref(n){
    console.time("generate")
    input["men"] = {}
    for(var i = 0 ; i < n ; i++){
        var data = {}
        var key = "" + i*2
        data[key] = []
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
    }
    input["women"] = {}
    for(var i = 0 ; i < n ; i++){
        var data = {}
        var key = "" + ( i*2 + 1 ) 
        data[key] = []
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
    }
    fs.writeFile("/home/parikshit/Documents/OS/gale-shapley/input/" + args, JSON.stringify(input), function(err) {
        if(err) {
            return console.log(err);
        }
    })
    // console.log(util.inspect(input))
    console.log("The file was saved!")
    console.timeEnd("generate")
}

function shuffle(arr) {
    var current = arr.length
    var temp 
    var random
    while (0 !== current) {
        random = Math.floor(Math.random() * current)
        current -= 1
        temp = arr[current]
        arr[current] = arr[random]
        arr[randomIndex] = temp
    }
    return array;
}
  

generatePref(n)