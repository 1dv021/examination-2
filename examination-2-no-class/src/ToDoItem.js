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
    enumerable: true,
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
    enumerable: true,
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
    enumerable: true,
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
    enumerable: true,
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
    enumerable: true,
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


// /**
//  * Customizes the value of this ToDoItem object to be returned when
//  * being stringified.
//  *
//  * @returns {{name: string, color: string, toDoItems: ToDoItem[]}}
//  */
// ToDoItem.prototype.toJSON = function() {
//   return {
//     text: this.text,
//     dueDate: this.dueDate,
//     finishedDate: this.finishedDate,
//     isDone: this.isDone,
//     isOverdue: this.isOverdue
//   };
// };

/**
 * Converts the value of this ToDoItem object into JSON text.
 *
 * @returns {string}
 */
ToDoItem.prototype.toJson = function() {
  return JSON.stringify(this);
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
