/**
 * Module for utility functions.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

/**
 * Returns a copy of the array with an object added to the end.
 *
 * @param {Array} arr
 * @param {object} obj
 * @returns {Array}
 */
const add = (arr, obj) => [...arr, obj];

/**
 * Returns a copy of the array with the elements randomized.
 *
 * @param {Array} arr
 * @returns {Array}
 */
const shuffle = (arr) => {
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
};

module.exports = {
  add,
  shuffle
};

