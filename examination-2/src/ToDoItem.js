/**
 * Module for ToDoItem.
 *
 * @author Mats Loock
 * @version 16.0.0
 */

'use strict';

const ITEM_SEP = ' ';

class ToDoItem {

  constructor(text, dueDate, done = false) {
    this.text = text;
    this.dueDate = dueDate;
    this.done = done;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    if (!value || typeof value !== 'string' || value.length > 50) {
      throw new Error('The value must be a string of maximum 50 characters.');
    }
    this._text = value;
  }

  get dueDate() {
    return new Date(this._dueDate.valueOf());
  }

  set dueDate(value) {
    this._dueDate = new Date(value.valueOf());
  }

  get done() {
    return this._done;
  }

  set done(value) {
    if (typeof value !== 'boolean') {
      throw new Error('The value must be a boolean.');
    }
    this._finishedDate = value ? new Date() : undefined;
    this._done = value;
  }

  get finishedDate() {
    return this._finishedDate !== undefined ?
      new Date(this._finishedDate.valueOf()) :
      undefined;
  }

  get isOverdue() {
    return (this._finishedDate ||  new Date()) > this._dueDate;
  }

  clone() {
    let copy = new ToDoItem(this.text, this.dueDate, this.done);
    if (this.done) {
      copy._finishedDate = this.finishedDate;
    }
    return copy;
  }

  toJson() {
    return JSON.stringify(this);
  }

  toString() {
    return this.text + ITEM_SEP +
      this.dueDate.toLocaleDateString() + ITEM_SEP +
      this.done + ITEM_SEP +
      (this.finishedDate !== undefined ?
        this.finishedDate.toLocaleDateString() :
        this.finishedDate);
  }

  static fromJson(json) {
    let obj = JSON.parse(json);
    // TODO: Throw exception if invalid state of obj?
    let toDoItem = new ToDoItem(obj._text, obj._dueDate);
    if (obj.hasOwnProperty('_finishedDate')) {
      toDoItem._done = true;
      toDoItem._finishedDate = new Date(obj._finishedDate);
    }

    return toDoItem;
  }
}

/**
*  Exports.
*/
module.exports = ToDoItem;
