/**
 * Module for Outcomes.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

/**
 * Enum for outcomes.
 *
 * @enum {number}
 */
const Outcomes = Object.freeze({
  INDEFINITE: 0,
  LOSE:       1,
  PUSH:       2,
  WIN:        3,
  NATURAL:    4
});

// Exports
module.exports = Outcomes;
