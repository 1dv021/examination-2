/**
 * Module for ToDoItem.
 *
 * @author Mats Loock
 * @version 1.16.0
 */

'use strict';

/**
 *
 * @constant
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
   * @param {Date} [finishedDate = undefined]
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
    if (typeof value !== 'string') {
      throw new TypeError('The value must be a string.');
    }
    if (value.length < 1 || value.length > 50) {
      throw new Error('The value must be a string of in between 1 to 50 characters.');
    }

    this._text = value;
  }

  /**
   *
   * @returns {Date}
   */
  get dueDate() {
    return new Date(this._dueDate);
  }

  /**
   *
   * @param {Date} value
   */
  set dueDate(value) {
    if (!(value instanceof Date) || Number.isNaN(value)) {
      throw new TypeError('The value must be a valid date.');
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
      new Date(this._finishedDate) :
      undefined;
  }

  /**
   *
   * @param {Date} value
   */
  set finishedDate(value) {
    if (typeof value !== 'undefined') {
      if (!(value instanceof Date) || Number.isNaN(value)) {
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
   * @returns {{text: string, dueDate: Date, finishedDate: *, isDone: *, isOverdue: boolean}}
   */
  toJSON() {
    return {
      text: this.text,
      dueDate: this.dueDate,
      finishedDate: this.finishedDate,
      isDone: this.isDone,
      isOverdue: this.isOverdue
    };
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
}

/**
*  Exports.
*/
module.exports = ToDoItem;
