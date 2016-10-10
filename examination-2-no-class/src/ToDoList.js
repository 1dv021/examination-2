/**
 * Module for ToDoList.
 *
 * @author Mats Loock
 * @version 1.16.0
 */

'use strict';

const ToDoItem = require('./ToDoItem');

/**
 *
 * @constant
 * @type {string}
 */
const ITEM_SEP = '\n';

/**
 * Creates a JavaScript ToDoList instance that represents a to do list.
 *
 * @param {string} name
 * @param {string} color
 * @param {ToDoItem[]} [toDoItems = []]
 * @constructor
 */
function ToDoList(name, color = 'yellow', toDoItems = []) {

  /**
   * The name of this ToDoList object.
   * @type {string}
   * @private
   */
  let _name;

  /**
   * The color of this ToDoList object.
   * @type {string}
   * @private
   */
  let _color;

  /**
   * The to do items of this ToDoList object.
   * @type {ToDoItem[]}
   * @private
   */
  let _toDoItems;

  /**
   * Get or sets the text of this ToDoList object.

   * @property {string}
   * @name ToDoItem#name
   */
  Object.defineProperty(this, 'name', {
    enumerable: true,
    get: () => {
      return _name;
    },

    set: value => {
      if (typeof value !== 'string') {
        throw new TypeError('The value must be a string.');
      }
      if (value.length < 1 || value.length > 30) {
        throw new Error('The value must be a string of in between 1 to 30 characters.');
      }

      _name = value;
    }
  });

  /**
   * Get or sets the color of this ToDoList object.

   * @property {string}
   * @name ToDoItem#color
   */
  Object.defineProperty(this, 'color', {
    enumerable: true,
    get: () => {
      return _color;
    },

    set: value => {
      if (typeof value !== 'string') {
        throw new TypeError('The value must be a string.');
      }
      if (value.length < 1 || value.length > 20) {
        throw new Error('The value must be a string of in between 1 to 20 characters.');
      }

      _color = value;
    }
  });

  /**
   * Get or sets the to do items of this ToDoList object.

   * @property {ToDoItem[]}
   * @name ToDoItem#toDoItems
   */
  Object.defineProperty(this, 'toDoItems', {
    enumerable: true,
    get: () => {
      const copy = [];
      for (let item of _toDoItems) {
        copy.push(item.clone());
      }

      return copy;
    },

    set: value => {
      if (!Array.isArray(value)) {
        throw new TypeError('The value must be an array.');
      }
      const array = [];
      for (let item of value) {
        if (!(item instanceof ToDoItem)) {
          throw new TypeError('The array must only contain references to instances of ToDoItem.');
        }
        array.push(item.clone());
      }
      array.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
      _toDoItems = array;
    }
  });

  /**
   * Indicates if this ToDoItem object is done or not.
   *
   * @property {boolean}
   * @name ToDoItem#hasOverdue
   */
  Object.defineProperty(this, 'hasOverdue', {
    get: () => {
      return _toDoItems.filter(x => x.isOverdue).length > 0;
    }
  });

  // Init.
  this.name = name;
  this.color = color;
  this.toDoItems = toDoItems;
}

/**
 * Adds a new to do item to this ToDoList object.
 *
 * @returns {ToDoList}
 */
ToDoList.prototype.add = function(value) {
  if (!(value instanceof ToDoItem)) {
    throw new TypeError('The value must be an instance of ToDoItem.');
  }
  const toDoItems = this.toDoItems;
  toDoItems.push(value.clone());
  toDoItems.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  this.toDoItems = toDoItems;

  return this;
};

/**
 * Removes all finished to do items of this ToDoList object.
 *
 * @returns {ToDoList}
 */
ToDoList.prototype.removeFinished = function() {
  const toDoItems = this.toDoItems;
  for (let i = toDoItems.length - 1; i >= 0; i -= 1) {
    if (toDoItems[i].isDone) {
      toDoItems.splice(i, 1);
    }
  }
  this.toDoItems = toDoItems;

  return this;
};

/**
 * Creates an exact copy of this ToDoList object.
 *
 * @returns {ToDoList}
 */
ToDoList.prototype.clone = function() {
  return new ToDoList(this.name, this.color, this.toDoItems);
};

/**
 * Converts the value of this ToDoList object into JSON text.
 *
 * @returns {string}
 */
ToDoList.prototype.toJson = function() {
  return JSON.stringify(this);
};

/**
 * Converts the value of this ToDoList object to its equivalent string representation.
 *
 * @returns {string}
 */
ToDoList.prototype.toString = function() {
  let result = this.name + (this.hasOverdue ? ' *' + ITEM_SEP : ITEM_SEP);
  this.toDoItems.forEach(item => result += item.toString() + ITEM_SEP);

  return result;
};

/**
*  Exports.
*/
module.exports = ToDoList;
