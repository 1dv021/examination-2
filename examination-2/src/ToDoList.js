/**
 * Module for ToDoList.
 *
 * @author Mats Loock
 * @version 16.0.0
 */

'use strict';

const ITEM_SEP = '\n';

class ToDoList {

  constructor(name, color, todoItems = []) {
    this.name = name;
    this.color = color;
    this.todoItems = todoItems;
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

  get todoItems() {
    const copy = [];
    for (let item of this._todoItems) {
      copy.push(item.clone());
    }

    return copy;
  }

  set todoItems(value) {
    this._todoItems = [];
    for (let item of value) {
      this._todoItems.push(item.clone());
    }

    return this;
  }

  get hasOverdue() {
    return this._todoItems.filter(x => x.isOverdue).length > 0;
  }

  clone() {
    return new ToDoList(this.name, this.color, this.todoItems);
  }

  toJson() {
    return JSON.stringify(this);
  }

  toString() {
  }

  static fromJson(json) {
    let obj = JSON.parse(json);
  }
}

/**
*  Exports.
*/
module.exports = ToDoList;
