/**
 * Module for ToDoItem.
 *
 * @author Mats Loock
 * @version 1.16.0
 */

'use strict';

/**
 * @constant
 * @type {string}
 */
const ITEM_SEP = ' ';

/**
 * Creates a JavaScript ToDoItem instance that represents a to do item.
 *
 * @param {string} text
 * @param {Date} dueDate
 * @param {Date|undefined} [finishedDate = undefined]
 * @constructor
 * @class
 */
function ToDoItem(text, dueDate, finishedDate) {

  /**
   * The text of this ToDoItem object.
   * @type {string}
   * @private
   */
  let _text;

  /**
   * The due date of this ToDoItem object.
   * @type {Date}
   * @private
   */
  let _dueDate;

  /**
   * The finished date of this ToDoItem object.
   * @type {Date|undefined}
   * @private
   */
  let _finishedDate;

  /**
   * Get or sets the text of this ToDoItem object.

   * @property {string}
   * @name ToDoItem#text
   */
  Object.defineProperty(this, 'text', {
    get: () => {
      return _text;
    },

    set: value => {
      if (typeof value !== 'string') {
        throw new TypeError('The value must be a string.');
      }
      if (value.length < 1 || value.length > 50) {
        throw new Error('The value must be a string of in between 1 to 50 characters.');
      }

      _text = value;
    }
  });

  /**
   * Get or sets the due date of this ToDoItem object.
   *
   * @property {Date}
   * @name ToDoItem#dueDate
   */
  Object.defineProperty(this, 'dueDate', {
    get: () => {
      return new Date(_dueDate);
    },

    set: value => {
      if (!(value instanceof Date) || Number.isNaN(value)) {
        throw new TypeError('The value must be a valid date.');
      }

      // Clone the argument to prevent privacy leak.
      _dueDate = new Date(value);
    }
  });

  /**
   * Get or sets the finished date of this ToDoItem object.
   *
   * @property {Date|undefined}
   * @name ToDoItem#finishedDate
   */
  Object.defineProperty(this, 'finishedDate', {
    get: () => {
      return _finishedDate ? new Date(_finishedDate) : undefined;
    },

    set: value => {
      if (typeof value !== 'undefined') {
        if (!(value instanceof Date) || Number.isNaN(value)) {
          throw new TypeError('The value must be a valid date or undefined.');
        }

        // Clone the argument to prevent privacy leak.
        value = new Date(value);
      }

      _finishedDate = value;
    }
  });

  /**
   * Indicates if this ToDoItem object is done or not.
   *
   * @property {boolean}
   * @name ToDoItem#isDone
   */
  Object.defineProperty(this, 'isDone', {
    get: () => {
      return _finishedDate instanceof Date;
    }
  });

  /**
   * Indicates if this ToDoItem object is overdue.
   *
   * @property {boolean}
   * @name ToDoItem#isOverdue
   */
  Object.defineProperty(this, 'isOverdue', {
    get: () => {
      return (_finishedDate || new Date()) > _dueDate;
    }
  });

  // Init.
  this.text = text;
  this.dueDate = dueDate;
  this.finishedDate = finishedDate;
}

/**
 * Creates an exact copy of this ToDoItem object.
 *
 * @returns {ToDoItem}
 */
ToDoItem.prototype.clone = function() {
  return new ToDoItem(this.text, this.dueDate, this.finishedDate);
};

/**
 * Converts the value of this ToDoItem object into JSON text.
 *
 * @returns {string}
 */
ToDoItem.prototype.toJson = function() {
  const obj = {
    text: this.text,
    dueDate: this.dueDate
  };

  if (this.finishedDate) {
    obj.finishedDate = this.finishedDate;
  }

  return JSON.stringify(obj);
};

/**
 * Converts the value of this ToDoItem object to its equivalent string representation.
 *
 * @returns {string}
 */
ToDoItem.prototype.toString = function() {
  let result = (this.isOverdue ? '* ' : '  ') + this.text + ITEM_SEP +
    this.dueDate.toLocaleDateString();

  if (this.isDone) {
    result += ITEM_SEP + this.finishedDate.toLocaleDateString();
  }

  return result;
};

/**
 *  Exports.
 */
module.exports = ToDoItem;
