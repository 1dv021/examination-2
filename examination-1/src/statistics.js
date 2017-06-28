/**
 * Module for obtaining descriptive information about a set of data.
 *
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

/**
 * Returns the descriptive information (maximum, mean, median, minimum,
 * mode, range and standard deviation) from a set of numbers.
 *
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} Argument must be an array.
 * @throws {Error} Argument can not be an empty array.
 * @returns {{maximum: number, mean: number, median: number, minimum: number, mode: number[], range: number, standardDeviation: number}}
 */
function descriptiveStatistics (numbers) {
  validate(numbers)

  let result = {}

  if (numbers.length === 1) {
    result.max = numbers[0]
    result.mean = numbers[0]
    result.median = numbers[0]
    result.min = numbers[0]
    result.mode = [numbers[0]]
    result.range = 0
    result.standardDeviation = 0
  } else {
    result.max = maximum(numbers)
    result.mean = mean(numbers)
    result.median = median(numbers)
    result.min = minimum(numbers)
    result.mode = mode(numbers)
    result.range = range(numbers)
    result.standardDeviation = standardDeviation(numbers)
  }

  return result
}

/**
 * Computes the maximum from a set of numbers.
 *
 * @param {number[]} numbers
 * @returns {number}
 */
function maximum (numbers) {
  validate(numbers)

  return Math.max(...numbers)
}

/**
 * Computes the mean from a set of numbers.
 *
 * @param {number[]} numbers
 * @returns {number}
 */
function mean (numbers) {
  validate(numbers)

  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length
}

/**
 * Computes the median from a set of numbers.
 *
 * @param {number[]} numbers
 * @returns {number}
 */
function median (numbers) {
  validate(numbers)

  let copy = numbers.slice(0).sort((a, b) => a - b)
  let middle = Math.floor(copy.length / 2)

  return copy.length % 2 !== 0 ? copy[middle] : (copy[middle] + copy[middle - 1]) / 2
}

/**
 * Computes the minimum from a set of numbers.
 *
 * @param {number[]} numbers
 * @returns {number}
 */
function minimum (numbers) {
  validate(numbers)

  return Math.min(...numbers)
}

/**
 * Computes the mode from a set of numbers.
 *
 * @param {number[]} numbers
 * @returns {number[]}
 */
function mode (numbers) {
  validate(numbers)

  let frequency = {}
  let maxFrequency = 0

  // Compute the mode by determine the frequency of each value, and
  // the count of the most frequent value.
  for (let value of numbers) {
    frequency[value] = (frequency[value] || 0) + 1
    if (frequency[value] > maxFrequency) {
      maxFrequency = frequency[value]
    }
  }

  //  ...filter the object attribute by the highest value, and
  //  return the most frequent value(s, sorted ascending).
  return Object.keys(frequency)
    .filter(key => frequency[key] === maxFrequency)
    .map(key => Number(key))
    .sort((a, b) => a - b)
}

/**
 * Computes the range from a set of numbers.
 *
 * @param {number[]} numbers
 * @returns {number}
 */
function range (numbers) {
  validate(numbers)

  return maximum(numbers) - minimum(numbers)
}

/**
 * Computes the standard deviation from a set of numbers.
 *
 * @param {number[]} numbers
 * @returns {number}
 */
function standardDeviation (numbers) {
  validate(numbers)

  let meanValue = mean(numbers)
  return Math.sqrt(numbers.reduce((sum, n) => sum + Math.pow(n - meanValue, 2), 0) / numbers.length)
}

/**
 * Throws an exception if the array doesn't meets the requirements.
 *
 * @param {number[]} numbers
 */
function validate (numbers) {
  if (!Array.isArray(numbers)) {
    throw new TypeError('The passed argument is not an array.')
  }

  if (numbers.length === 0) {
    throw new Error('The array contains no elements.')
  }

  if (numbers.some(n => typeof n !== 'number')) {
    throw new TypeError('The passed array contains not just numbers.')
  }
}

// Exports
exports.descriptiveStatistics = descriptiveStatistics
exports.maximum = maximum
exports.mean = mean
exports.median = median
exports.minimum = minimum
exports.mode = mode
exports.range = range
exports.standardDeviation = standardDeviation
