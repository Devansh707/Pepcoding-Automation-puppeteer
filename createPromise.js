let fs = require('fs');

function myPromisiedFsReader(filePath){
    return new Promise(function(resolve, reject){
        fs.readFile(filePath, function cb(err, data){
            if(err){
                reject(err);
            } else{
                resolve(data);
            }
        })
    })
}


console.log("Before");
    
let freadpromise = myPromisiedFsReader("./f1.txt");
console.log( "promise", freadpromise);

// when promise resolved the do this work with data 
freadpromise.then(function cb(data) {
    console.log("data = " + data);
});

// function reject/ does not complete its promise
freadpromise.catch( function cb(err) {
    console.log("error " + err);
});
console.log("After");