/**
 * Module for ToDoItem.
 *
 * @author Mats Loock
 * @version 16.0.0
 */

'use strict';

/**
 *
 * @type {string}
 */
const ITEM_SEP = ' ';

/**
 *
 */
class ToDoItem {
  /**
   *
   * @param {string} text
   * @param {Date} dueDate
   * @param {Date} finishedDate
   */
  constructor(text, dueDate, finishedDate) {
    this.text = text;
    this.dueDate = dueDate;
    this.finishedDate = finishedDate;
  }

  /**
   *
   * @returns {string}
   */
  get text() {
    return this._text;
  }

  /**
   *
   * @param {string} value
   */
  set text(value) {
    if (!(typeof value === 'string' || value instanceof String)) {
      throw new TypeError('The value must be a string.');
    }
    if (value.length < 1 || value.length > 50) {
      throw new Error('The value must be a string of in between 1 to 50 characters.');
    }

    this._text = value.valueOf();
  }

  /**
   *
   * @returns {Date}
   */
  get dueDate() {
    return this._dueDate !== undefined ? new Date(this._dueDate.valueOf()) : this._dueDate;
  }

  /**
   *
   * @param {Date} value
   */
  set dueDate(value) {
    if (!(value instanceof Date) || isNaN(value)) {
      throw new TypeError('The value must be a valid date or undefined.');
    }

    // Clone the argument to prevent privacy leak.
    this._dueDate = new Date(value);
  }

  /**
   *
   * @returns {*}
   */
  get finishedDate() {
    return this._finishedDate ?
      new Date(this._finishedDate.valueOf()) :
      undefined;
  }

  /**
   *
   * @param {Date} value
   */
  set finishedDate(value) {
    if (typeof value !== 'undefined') {
      if (!(value instanceof Date) || isNaN(value)) {
        throw new TypeError('The value must be a valid date or undefined.');
      }

      // Clone the argument to prevent privacy leak.
      value = new Date(value);
    }

    this._finishedDate = value;
  }

  /**
   *
   * @returns {*}
   */
  get isDone() {
    return this._finishedDate instanceof Date;
  }

  /**
   *
   * @returns {boolean}
   */
  get isOverdue() {
    return (this._finishedDate ||  new Date()) > this._dueDate;
  }

  /**
   *
   * @returns {ToDoItem}
   */
  clone() {
    return new ToDoItem(this.text, this.dueDate, this.finishedDate);
  }

  /**
   *
   */
  toJson() {
    return JSON.stringify(this);
  }

  /**
   *
   * @returns {string}
   */
  toString() {
    let result = (this.isOverdue ? '* ' : '  ') + this._text + ITEM_SEP +
      this._dueDate.toLocaleDateString();

    if (this.isDone) {
      result += ITEM_SEP +
        this._finishedDate.toLocaleDateString();
    }

    return result;
  }

  /**
   *
   * @param json
   * @returns {ToDoItem}
   */
  static fromJson(json) {
    return ToDoItem.fromObject(JSON.parse(json));
  }

  /**
   *
   * @param {object} obj
   * @returns {ToDoItem}
   */
  static fromObject(obj) {
    // TODO: Throw exception if invalid state of obj?
    return new ToDoItem(obj._name, obj._dueDate, obj._finishedDate);
  }
}

/**
*  Exports.
*/
module.exports = ToDoItem;
