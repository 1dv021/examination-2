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
   * @param text
   * @param dueDate
   * @param finishedDate
   */
  constructor(text, dueDate, finishedDate) {
    this.text = text;
    this.dueDate = dueDate;
    this.finishedDate = finishedDate;
  }

  /**
   *
   * @returns {*}
   */
  get text() {
    return this._text;
  }

  /**
   *
   * @param value
   * @returns {ToDoItem}
   */
  set text(value) {
    if (!value || typeof value !== 'string' || value.length > 50) {
      throw new Error('The value must be a string of maximum 50 characters.');
    }
    this._text = value;
  }

  /**
   *
   * @returns {Date}
   */
  get dueDate() {
    return new Date(this._dueDate.valueOf());
  }

  /**
   *
   * @param value
   * @returns {ToDoItem}
   */
  set dueDate(value) {
    this._dueDate = new Date(value.valueOf());
  }

  /**
   *
   * @param value
   * @returns {ToDoItem}
   */
  set finishedDate(value) {
    this._finishedDate = Date.isDate(value) ? new Date(value.valueOf()) : undefined;
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
   * @returns {*}
   */
  get isDone() {
    return Date.isDate(this._finishedDate);
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
   * @param obj
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
