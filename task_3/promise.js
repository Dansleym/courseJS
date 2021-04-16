
let promise_arr = [];

let testPromise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        
        resolve('Test data for resolve');

    }, 10000);
});
let testPromise2 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        
        resolve('Test data for resolve');

    }, 1000);
});
let testPromise3 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        
        resolve('Test data for resolve');

    }, 3000);
});

promise_arr.push(testPromise);
promise_arr.push(testPromise2);
promise_arr.push(testPromise3);


Promise.all(promise_arr).then(function(data) {
    console.log(data);
})




/* testPromise.then((data) => {
    alert('then Complete');
}).catch((data) => {
    alert('catch Complete');
}) */