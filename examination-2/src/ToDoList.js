/**
 * Module for ToDoList.
 *
 * @author Mats Loock
 * @version 1.16.0
 */

'use strict';

const ToDoItem = require('./ToDoItem');

const ITEM_SEP = '\n';

/**
 *
 */
class ToDoList {
  /**
   *
   * @param {string} name
   * @param {string} color
   * @param {ToDoItem[]} toDoItems
   */
  constructor(name, color = 'yellow', toDoItems = []) {
    this.name = name;
    this.color = color;
    this.toDoItems = toDoItems;
  }

  /**
   *
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   *
   * @param {string} value
   */
  set name(value) {
    if (typeof value !== 'string') {
      throw new TypeError('The value must be a string.');
    }
    if (value.length < 1 || value.length > 30) {
      throw new Error('The value must be a string of in between 1 to 30 characters.');
    }

    this._name = value;
  }

  /**
   *
   * @returns {string}
   */
  get color() {
    return this._color;
  }

  /**
   *
   * @param {string} value
   */
  set color(value) {
    if (typeof value !== 'string') {
      throw new TypeError('The value must be a string.');
    }
    if (value.length < 1 || value.length > 20) {
      throw new Error('The value must be a string of in between 1 to 20 characters.');
    }
    this._color = value;
  }

  /**
   *
   * @returns {ToDoItem[]}
   */
  get toDoItems() {
    // const copy = [];
    // for (let item of this._toDoItems) {
    //   copy.push(item.clone());
    // }
    //
    // return copy;

    return this._toDoItems;
  }

  /**
   *
   * @param {ToDoItem[]} value
   */
  set toDoItems(value) {
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
    this._toDoItems = array;
  }

  /**
   *
   * @returns {boolean}
   */
  get hasOverdue() {
    return this._toDoItems.filter(x => x.isOverdue).length > 0;
  }

  /**
   *
   * @param {ToDoItem} value
   * @returns {ToDoList}
   */
  add(value) {
    if (!(value instanceof ToDoItem)) {
      throw new TypeError('The value must be an instance of ToDoItem.');
    }
    this._toDoItems.push(value.clone());
    this._toDoItems.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

    return this;
  }

  /**
   *
   */
  removeFinished() {
    for (let i = this._toDoItems.length - 1; i >= 0; i -= 1) {
      if (this._toDoItems[i].isDone) {
        this._toDoItems[i].splice(i, 1);
      }
    }
    return this;
  }

  /**
   *
   * @returns {ToDoList}
   */
  clone() {
    return new ToDoList(this.name, this.color, this._toDoItems);
  }

  /**
   *
   * @returns {string}
   */
  toJson() {
    return JSON.stringify(this);
  }

  /**
   *
   * @returns {string}
   */
  toString() {
    let result = this.name + (this.hasOverdue ? ' *' + ITEM_SEP : ITEM_SEP);
    this._toDoItems.forEach(item => result += item.toString() + ITEM_SEP);

    return result;
  }
}

/**
*  Exports.
*/
module.exports = ToDoList;
