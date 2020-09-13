/**
 * 비교연산자는 true, false를 반환한다. 
 * =는 대입연산자로 비교 연산자가 아님!
 */

 /**
  * == 추상적인 비교 연산
  */
 console.log(10==20);              //false
 console.log(10==10)              //true
 console.log("hello"=="hi")     //false 
 console.log("hello"=="hello")  //true


 /**
  * === 정확한 비교 연산
  */
console.log(10=='10');    //true
console.log(10==='10');   //false

/**
 * != 같지 않다.
 */

console.log(10!=20);          //true
console.log(10!=10);          //false
console.log("ten"!="eleven"); //true
console.log("ten"!="ten");    //false

/** 
 * 부등호 
 * > 크다
 * < 작다
 * >= 같거나 크다
 * <= 같거나 작다
 */
console.log(10>20);   //false
console.log(10>1);    //true
console.log(10>10);   //false

console.log(10>=20);    //false
console.log(10>=1);     //true
console.log(10>=10);    //true