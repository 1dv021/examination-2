/**
 * Module for obtaining descriptive information about a set of data.
 *
 * @author TODO: Write your name here.
 * @version 1.0.0
 */

'use strict';

/**
 * Returns the descriptive information (max, mean, median, min, mode and range) from a set of numbers.
 *
 * @param {Array.<Number>} data The set of data to be analyzed.
 * @throws {TypeError} Argument must be an array.
 * @throws {Error} Argument can not be an empty array.
 * @returns {{max: Number, mean: Number, median: Number, min: Number, mode: Array.<Number>, range: Number}}
 */
exports.analyze = function(data) {

  //  To get rid of the "Returned expression type {}..." for the return statement.// {max: 0, mean: 0, median: 0, min: 0, mode: [], range: 0};
  let result = {};

  if (!Array.isArray(data)) {
    throw new TypeError('The argument is not an array.');
  }

  if (data.length === 0) {
    throw new Error('The argument can not be an empty array.');
  }

  if (data.length === 1) {
    result.max = data[0];
    result.mean = data[0];
    result.median = data[0];
    result.min = data[0];
    result.mode = [data[0]];
    result.range = 0;
  } else {
    result.max = Math.max.apply(Math, data);
    result.mean = mean(data);
    result.median = median(data);
    result.min = Math.min.apply(Math, data);
    result.mode = mode(data);
    result.range = result.max - result.min;
  }

  return result;
};

/**
 * Computes the mean from a set of numbers.
 *
 * @param {Array.<Number>} data
 * @returns {Number}
 */
let mean = function mean(data) {
  return data.reduce(function(a, b) {
      return a + b;
    }) / data.length;
};

/**
 * Computes the median from a set of numbers.
 *
 * @param {Array.<Number>} data
 * @returns {Number}
 */
let median = function median(data) {
  let copy = data.slice().sort(function(a, b) {
    return a - b;
  });

  let middle = Math.floor(copy.length / 2);

  return copy.length % 2 !== 0 ? copy[middle] : (copy[middle] + copy[middle - 1]) / 2;
};

/**
 * Computes the mode from a set of numbers.
 *
 * @param {Array.<Number>} data
 * @returns {Array.<Number>}
 */
let mode = function mode(data) {
  let i;
  let frequency = {};
  let sortedKeys;
  let value;

  // Compute the mode by determine the frequency of each value,...
  for (i = 0; i < data.length; i += 1) {
    value = data[i];
    if (value in frequency) {
      frequency[value] += 1;
    } else {
      frequency[value] = 1;
    }
  }

  //  ...sort the frequency table descending to get the most frequent value first,...
  sortedKeys = Object.keys(frequency).sort(function(a, b) {
    return frequency[b] - frequency[a];
  });

  //  ...filter the object attribute by the highest value, and...
  sortedKeys = Object.keys(frequency).filter(function(key) {
    return frequency[key] === frequency[sortedKeys[0]];
  });

  //  ...return the most frequent value(s, sorted ascending).
  return sortedKeys.map(function(key) {
    return Number(key);
  }).sort(function(a, b) {
    return a - b;
  });
};
