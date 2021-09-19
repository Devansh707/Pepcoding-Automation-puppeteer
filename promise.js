let fs = require('fs');
// normal call back type
// console.log("Before");c
// fs.readFile( "./f1.txt", function cb(err, data) {
    //     console.log("data = "+ data);
    // });
    // console.log("After");
console.log("Before");
    
let freadpromise = fs.promises.readFile("./f1.txt");
console.log( freadpromise);

// when promise resolved the do this work with data 
freadpromise.then(function cb(data) {
    console.log("data = " + data);
});

// function reject/ does not complete its promise
freadpromise.catch( function cb(err) {
    console.log("error " + err);
});
console.log("After");
