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

    return this._toDoItems.map(x => x.clone());
  }

  /**
   *
   * @param {ToDoItem[]} value
   */
  set toDoItems(value) {
    if (!Array.isArray(value)) {
      throw new TypeError('The value must be an array.');
    }

    if (!value.every(x => x instanceof ToDoItem)) {
      throw new TypeError('The array must only contain references to instances of ToDoItem.');
    }

    this._toDoItems = value
      .map(x => x.clone())
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

    // const array = [];
    // for (let item of value) {
    //   if (!(item instanceof ToDoItem)) {
    //     throw new TypeError('The array must only contain references to instances of ToDoItem.');
    //   }
    //   array.push(item.clone());
    // }
    // array.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
    // this._toDoItems = array;
  }

  /**
   *
   * @returns {boolean}
   */
  get hasOverdue() {
    // return this._toDoItems.filter(x => x.isOverdue).length > 0;
    return this._toDoItems.find(x => x.isOverdue) !== undefined;
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
        this._toDoItems.splice(i, 1);
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
   * @returns {{name: string, color: string, toDoItems: ToDoItem[]}}
   */
  toJSON() {
    return {
      name: this.name,
      color: this.color,
      toDoItems: this.toDoItems
    };
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
