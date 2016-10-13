'use strict';

// function Dog() {
//     this.bark = function() {
//         return "WOOF!";
//     }
// }

// // Then a very bad person comes along
// var cat = { purring: true };
// Dog.bind(cat)();

// console.log(cat.bark(); // WHAT HAVE WE WROUGHT

const dealer = require('./src/dealer');

let arr = [0, 1, 2, 3, 4, 5];

let shuffledArr = dealer.shuffle(arr);

console.log(shuffledArr);
console.log(arr);