function sum(a, b, callback) {
    callback(a + b);
}

sum(20, 30, function(result) {
    console.log("a + b = %d", result);
});