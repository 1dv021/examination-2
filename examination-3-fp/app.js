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

const DEALER = require('./src/dealer');

const dealer = DEALER.createDealer();

console.log(dealer);
