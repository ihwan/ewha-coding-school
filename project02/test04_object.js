var student = {
    age: 30,
    name: 'kang'
};

console.log(student);
console.log(student.age);
console.log(student['age']);
console.log(student.name);
console.log(student['name']);

student.phone = '010-2322-0000';
console.log(student);


for(key in student) {
    console.log("key: " + key + " / value: " + student[key]);
}