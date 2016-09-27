/**
 * Starting  point of the application.
 *
 * @fileOverview Trying out some to do lists.
 * @author Mats Loock
 * @version 16.0.0
 */

'use strict';

try {
  const ToDoList = require('./src/ToDoList.js');
  const ToDoItem = require('./src/ToDoItem.js');

  // let toDoItems = [
  //   new ToDoItem('handla', '2016-09-28'),
  //   new ToDoItem('tvätta', '2016-09-30'),
  //   new ToDoItem('städa', '2016-09-27'),
  // ];
  //
  // let list = new ToDoList('Viktigt!', 'yellow', toDoItems);
  //
  // console.log(list);
  // console.log(list.toString());
  // console.log(JSON.stringify(list));

  let json = '{"_name":"Viktigt!","_color":"blue","_toDoItems":[{"_name":"städa","_dueDate":"2016-09-27T00:00:00.000Z"},{"_name":"handla","_dueDate":"2016-09-28T00:00:00.000Z"},{"_name":"tvätta","_dueDate":"2016-09-30T00:00:00.000Z"}]}';

  let list = ToDoList.fromJson(json);
  console.log(list);
  console.log(list.toString());

  // let toDoItem = new ToDoItem('handla', '2016-09-28');
  // console.log('---------------\n', toDoItem.toString(), '\n---------------\n');
  //
  // console.log(toDoItem.isOverdue);
  //
  // let tdi = ToDoItem.fromJson('{"_text":"handla","_dueDate":"2016-09-20T00:00:00.000Z","_done":false}');
  // console.log(tdi.isOverdue);
  //
  // toDoItem.done = true;
  // tdi.done = true;
  //
  // console.log(toDoItem.isOverdue);
  // console.log(tdi.isOverdue);

  // toDoItem.dueDate = new Date('2016-09-24');
  // console.log(toDoItem.isOverdue);


  // console.log('---------------\n', toDoItem, '\n---------------\n');
  // console.log('---------------\n', toDoItem.toString(), '\n---------------\n');
  //
  // let json = JSON.stringify(toDoItem);
  // console.log(json);
  //
  // let toDoItemFromJson = JSON.parse(json);
  // console.log('---------------\n', toDoItemFromJson, '\n---------------\n');
  // console.log('---------------\n', toDoItemFromJson.toString(), '\n---------------\n');

  // toDoItem.done = true;
  // console.log('\n---------------------\n' + toDoItem.toString());
  // console.log('\n---------------------\n' + toDoItem.toJson());
  //
  // let clone = toDoItem.clone();
  // clone.done = false;
  // clone.text = 'Hej hopp!';
  // console.log('\n---------------------\n' + clone.toString());
  // console.log('\n---------------------\n' + clone.toJson());
  // clone.done = true;
  //
  // console.log('\n---------------------\n' + toDoItem.toString());
  // console.log('\n---------------------\n' + toDoItem.toJson());
  // console.log('\n---------------------\n' + clone.toString());
  // console.log('\n---------------------\n' + clone.toJson());

  //
  // toDoItem.done = false;
  // console.log('\n' + toDoItem.toString());
} catch (e) {
  console.error('ERROR: ', e.message);
}
