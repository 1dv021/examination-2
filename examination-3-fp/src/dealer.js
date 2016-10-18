/*
 * 
 */

'use strict';

module.exports = {
  createDealer,
  shuffle
};

/**
 * 
 */
function createDealer() {
  return {
    nickName: 'Dealer',
    hand: {}
  };
}

/**
 * Returns a copy of the array with the elements randomized.
 *
 * @param {Array} arr
 * @returns {Array}
 */
function shuffle(arr) {
  arr = [...arr];

  let i = arr.length;
  let j;
  let x;

  while (i) {
    j = (Math.random() * i) | 0; // using bitwise OR 0 to floor a number
    x = arr[--i];
    arr[i] = arr[j];
    arr[j] = x;
  }

  return arr;
}
