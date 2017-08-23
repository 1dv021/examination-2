/**
 * Starting  point of the application.
 *
 * @fileOverview Trying out some to do lists.
 * @author Mats Loock
 * @version 1.16.0
 */

'use strict';

try {
  const ToDoList = require('./src/ToDoList.js');
  const ToDoItem = require('./src/ToDoItem.js');

  // ToDoItem
  {
    // uppgift som inte genomförd och inte försenad
    let toDoItem = new ToDoItem('köpa julklappar', new Date(2032, 11, 24));
    console.log(toDoItem.toString()); // OUTPUT: '  köpa julklappar 2032-12-24'
    console.log();

    // uppgift som är genomförd i tid
    toDoItem.finishedDate = new Date(2032, 11, 20);
    console.log(toDoItem.toString()); // OUTPUT: '  köpa julklappar 2032-12-24 2032-12-20'
    console.log();

    // uppgift som är genomförd men försent
    toDoItem.finishedDate = new Date(2032, 11, 25);
    console.log(toDoItem.toString()); // OUTPUT: '* köpa julklappar 2032-12-24 2032-12-25'
    console.log();

    // uppgift som inte är genomförd och som är försenad
    toDoItem = new ToDoItem('åka till OS i Brasilien', new Date(2016, 7, 21));
    console.log(toDoItem.toString()); // OUTPUT: '* åka till OS i Brasilien 2016-08-21'
    console.log();
  }

  console.log('---------------------------------------------------');

  // ToDoList
  {
    let toDoItems = [
      new ToDoItem('köpa julklappar', new Date(2032, 11, 24)),
      new ToDoItem('åka till OS i Stockholm', new Date(2026, 7, 3))
    ];

    // lista utan förseningar
    let list = new ToDoList('Viktigt!', 'yellow', toDoItems);
    console.log(list.toString());

    // lista med försenad uppgift
    list.add(new ToDoItem('nyårsfest', new Date(2015, 11, 31), new Date(2016, 2, 2)));
    console.log(list.toString());
  }
} catch (e) {
  console.error('ERROR: ', e.message);
}
