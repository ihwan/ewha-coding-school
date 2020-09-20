function Student(name, age) {
    this.name = name;
    this.age = age;
    this.score = 0;
};

Student.prototype.showScore = function() {
    console.log("Score: %d", this.score);
};
Student.prototype.addScore = function(score) {
    this.score = score;
};

var student1 = new Student("Kim", 30);
var student2 = new Student("Lee", 25);
var student3 = new Student("Ji", 28);

console.log(student1.name);
student1.showScore();
student1.addScore(20);
student1.showScore();