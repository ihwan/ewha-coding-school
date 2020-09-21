var lastnames = ['kim', 'lee', 'han', 'kang'];

console.log(lastnames);
console.log(lastnames[0]);
console.log(lastnames[1]);
console.log(lastnames[2]);
console.log(lastnames[3]);
console.log(lastnames[4]);

console.log(lastnames.length);

// print element using FOR loop 
for(var index = 0; index < lastnames.length; index++){
    console.log(lastnames[index].toUpperCase());   
}


// Adds new items to the end of an array 
lastnames.push('park');
console.log(lastnames.length);
console.log(lastnames);

// Adds new items to the beginning of an array 
lastnames.unshift('joo');
console.log(lastnames.length);
console.log(lastnames);

// Remove the items to the beginning of an array 
lastnames.shift();
console.log(lastnames.length);
console.log(lastnames);

// Remove the items to the end of an array 
lastnames.pop();
console.log(lastnames.length);
console.log(lastnames);

// sorts the elements of an array in place and returns the sorted array
lastnames.sort();
console.log(lastnames.length);
console.log(lastnames);

lastnames.reverse();
console.log(lastnames.length);
console.log(lastnames);


// splice - delete array
// splice(시작위치, 삭제갯수, [Object])
lastnames.splice(1,2); 
lastnames.splice(1,0, ['Ji', 'Yoon']);  

// slice(시작위치, 복사할갯수)
var selected_lastname = lastnames.slice(1,2);
console.log(selected_lastname);
