/**
 * Module for ToDoList.
 *
 * @author Mats Loock
 * @version 16.0.0
 */

'use strict';

const ToDoItem = require('./ToDoItem');

const ITEM_SEP = '\n';

class ToDoList {

  constructor(name, color, toDoItems = []) {
    this.name = name;
    this.color = color;
    this.toDoItems = toDoItems;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (!value || typeof value !== 'string' || value.length > 30) {
      throw new Error('The value must be a string of maximum 30 characters.');
    }
    this._name = value;

    return this;
  }

  get color() {
    return this._color;
  }

  set color(value) {
    if (!value || typeof value !== 'string' || value.length > 20) {
      throw new Error('The value must be a string of maximum 20 characters.');
    }
    this._color = value;

    return this;
  }

  get toDoItems() {
    const copy = [];
    for (let item of this._toDoItems) {
      copy.push(item.clone());
    }

    return copy;
  }

  set toDoItems(value) {
    this._toDoItems = [];
    for (let item of value) {
      if (!(item instanceof ToDoItem)) {
        throw new TypeError('The array must only contain references to instances of ToDoItem.');
      }
      this._toDoItems.push(item.clone());
    }
    this._toDoItems.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

    return this;
  }

  get hasOverdue() {
    return this._toDoItems.filter(x => x.isOverdue).length > 0;
  }

  add(value) {
    if (!(value instanceof ToDoItem)) {
      throw new TypeError('The value must be an instance of ToDoItem.');
    }
    this._toDoItems.push(value);
    this._toDoItems.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

    return this;
  }

  clone() {
    return new ToDoList(this.name, this.color, this._toDoItems);
  }

  toJson() {
    return JSON.stringify(this);
  }

  toString() {
    let result = this.name + (this.hasOverdue ? ' *' + ITEM_SEP : ITEM_SEP);
    this._toDoItems.forEach(item => result += item.toString() + ITEM_SEP);

    return result;
  }

  static fromJson(json) {
    let obj = JSON.parse(json);

    return new ToDoList(obj._name, obj._color, obj._toDoItems.map(x => ToDoItem.fromObject(x)));
  }
}

/**
*  Exports.
*/
module.exports = ToDoList;
