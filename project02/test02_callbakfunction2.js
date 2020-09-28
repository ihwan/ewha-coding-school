function multiply(a, b) {
    return a * b;
}

function sum_multiply(a, b, callback) {
    callback(a + b);
}

sum_multiply(20, 30, function(result) {
    var result2 = multiply(result, result);
    console.log("(a + b)^2 = %d", result2); // (20+30)^2
});