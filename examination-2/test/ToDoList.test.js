/**
 * Tests for the ToDoList type.
 *
 * @author Mats Loock
 * @version 1.16.0
 */

'use strict';

const expect = require('chai').expect;

describe('ToDoList', () => {
  const ToDoItem = require('../src/ToDoItem');

  const NAME = 'Lorem ipsum';
  const DEFAULT_COLOR = 'yellow';
  const COLOR = 'red';
  const DEFAULT_TODO_ITEMS = [];
  const TODO_ITEMS = [
    new ToDoItem('ipsum', new Date(2050, 8, 30, 12)),
    new ToDoItem('dolor', new Date(2050, 8, 27, 12)),
    new ToDoItem('lorem', new Date(2016, 8, 28, 12), new Date(2016, 9, 3, 12))
  ];

  let ToDoList;

  describe('Type', () => {
    it('should be defined', (done) => {
      ToDoList = require('../src/ToDoList');
      done();
    });
  });

  describe('Constructor', () => {
    let toDoList;

    beforeEach(() => {
      // Create a new ToDoList before every test.
      toDoList = new ToDoList(NAME);
    });

    it('should be instance of ToDoList', (done) => {
      expect(toDoList).to.be.an.instanceOf(ToDoList);
      done();
    });

    it('should have property name', (done) => {
      expect(toDoList).to.have.property('name');
      done();
    });

    it('should have property color', (done) => {
      expect(toDoList).to.have.property('color');
      done();
    });

    it('should have property toDoItems', (done) => {
      expect(toDoList).to.have.property('toDoItems');
      done();
    });
  });

  describe('Properties', () => {
    describe('name', () => {
      let toDoList;

      beforeEach(() => {
        // Create a new ToDoList before every test.
        toDoList = new ToDoList(NAME);
      });

      it('should return the name', (done) => {
        expect(toDoList.name).to.equal(NAME);
        done();
      });

      it('should be able to be changed', (done) => {
        toDoList.name = 'Odio lectus integer';
        expect(toDoList.name).to.equal('Odio lectus integer');
        done();
      });

      it('should throw a TypeError if the name is set to a non-string value', (done) => {
        expect(() => {
          toDoList.name = undefined;
        }).to.throw(TypeError);
        expect(() => {
          toDoList.name = null;
        }).to.throw(TypeError);
        expect(() => {
          toDoList.name = 42;
        }).to.throw(TypeError);
        expect(() => {
          toDoList.name = {};
        }).to.throw(TypeError);
        expect(() => {
          toDoList.name = [];
        }).to.throw(TypeError);
        expect(() => {
          toDoList.name = new String(NAME);
        }).to.throw(TypeError);
        done();
      });

      it('should throw an Error when if the name is set to an empty string', (done) => {
        expect(() => {
          toDoList.name = '';
        }).to.throw(Error);
        done();
      });

      it('should throw an Error if the text is to a string of a length greater than 30.', (done) => {
        expect(() => {
          toDoList.name = 'A'.repeat(31);
        }).to.throw(Error);
        done();
      });
    });

    describe('color', () => {
      let toDoList;

      beforeEach(() => {
        // Create a new ToDoList before every test.
        toDoList = new ToDoList(NAME);
      });

      it('should return the default color', (done) => {
        expect(toDoList.color).to.equal(DEFAULT_COLOR);
        done();
      });

      it('should be able to be changed', (done) => {
        toDoList.color = COLOR;
        expect(toDoList.color).to.equal(COLOR);
        done();
      });

      it('should throw a TypeError if the color is set to a non-string value', (done) => {
        expect(() => {
          toDoList.color = undefined;
        }).to.throw(TypeError);
        expect(() => {
          toDoList.color = null;
        }).to.throw(TypeError);
        expect(() => {
          toDoList.color = 42;
        }).to.throw(TypeError);
        expect(() => {
          toDoList.color = {};
        }).to.throw(TypeError);
        expect(() => {
          toDoList.color = [];
        }).to.throw(TypeError);
        expect(() => {
          toDoList.color = new String(COLOR);
        }).to.throw(TypeError);
        done();
      });

      it('should throw an Error when if the color is set to an empty string', (done) => {
        expect(() => {
          toDoList.color = '';
        }).to.throw(Error);
        done();
      });

      it('should throw an Error if the color is to a string of a length greater than 20.', (done) => {
        expect(() => {
          toDoList.color = 'A'.repeat(21);
        }).to.throw(Error);
        done();
      });
    });

    describe('toDoItems', () => {
      let toDoList;

      beforeEach(() => {
        // Create a new ToDoList before every test.
        toDoList = new ToDoList(NAME, DEFAULT_COLOR);
      });

      it('should return the default to do items', (done) => {
        expect(toDoList.toDoItems).to.deep.equal(DEFAULT_TODO_ITEMS);
        done();
      });

      it('should be able to be changed', (done) => {
        toDoList.toDoItems = DEFAULT_TODO_ITEMS;
        expect(toDoList.toDoItems).to.deep.equal(DEFAULT_TODO_ITEMS);
        done();
      });

      it('should throw a TypeError if the to do list is set to a non-array value', (done) => {
        expect(() => {
          toDoList.toDoItems = undefined;
        }).to.throw(TypeError);
        expect(() => {
          toDoList.toDoItems = null;
        }).to.throw(TypeError);
        expect(() => {
          toDoList.toDoItems = 42;
        }).to.throw(TypeError);
        expect(() => {
          toDoList.toDoItems = {};
        }).to.throw(TypeError);
        done();
      });

      // DO NOT TEST FOR PRIVACY LEAK!
    });

    describe('hasOverdue', () => {
      let toDoList;

      beforeEach(() => {
        // Create a new ToDoList before every test.
        toDoList = new ToDoList(NAME);
      });

      it('should have property', (done) => {
        expect(toDoList).to.have.property('hasOverdue');
        done();
      });

      it('should return false when none of the ToDoItem objects is overdue', (done) => {
        expect(toDoList).to.have.property('hasOverdue', false);
        done();
      });

      it('should return true when at least one av the ToDoItem objects is overdue', (done) => {
        toDoList.toDoItems = TODO_ITEMS;
        expect(toDoList).to.have.property('hasOverdue', true);
        done();
      });

      it('should throw an Error if the hasOverdue is set (should be read-only!)', (done) => {
        expect(() => {
          toDoList.hasOverdue = true;
        }).to.throw(Error);
        done();
      });
    });
  });

  describe('Prototype methods', () => {
    let toDoList;

    beforeEach(() => {
      // Create a new ToDoList before every test.
      toDoList = new ToDoList(NAME);
    });

    describe('add method', () => {
      it('should be defined', (done) => {
        expect(ToDoList.prototype).to.have.property('add').that.is.a('Function');
        done();
      });

      it('should add a clone and reorder', (done) => {
        toDoList.add(TODO_ITEMS[0]);
        toDoList.add(TODO_ITEMS[1]);
        toDoList.add(TODO_ITEMS[2]);
        let toDoItems = toDoList.toDoItems;
        expect(toDoList.toDoItems.length, 'expected three elements').to.equal(3);
        expect(toDoItems[0], 'unexpected first element').to.deep.equal(TODO_ITEMS[2]);
        expect(toDoItems[1], 'unexpected second element').to.deep.equal(TODO_ITEMS[1]);
        expect(toDoItems[2], 'unexpected third element').to.deep.equal(TODO_ITEMS[0]);
        done();
      });
    });

    describe('removeFinished method', () => {
      it('should be defined', (done) => {
        expect(ToDoList.prototype).to.have.property('removeFinished').that.is.a('Function');
        done();
      });

      it('should remove finished to do items', (done) => {
        toDoList.toDoItems = TODO_ITEMS;
        toDoList.removeFinished();
        expect(toDoList.toDoItems.filter(x => x.isOverdue).length).to.equal(0);
        done();
      });
    });

    describe('clone method', () => {
      it('should be defined', (done) => {
        expect(ToDoList.prototype).to.have.property('clone').that.is.a('Function');
        done();
      });

      it('should return a ToDoItem object', (done) => {
        expect(toDoList.clone()).to.be.an.instanceof(ToDoList);
        done();
      });

      it('should return a copy', (done) => {
        expect(toDoList.clone()).to.not.equal(toDoList);
        expect(toDoList.clone()).to.deep.equal(toDoList);
        done();
      });
    });

    describe('toJson method', () => {
      it('should be defined', (done) => {
        expect(ToDoItem.prototype).to.have.property('toJson').that.is.a('Function');
        done();
      });

      it('should return valid JSON', (done) => {
        toDoList.toDoItems = TODO_ITEMS;
        let json = toDoList.toJson();
        expect(() => {
          JSON.parse(json);
        }).not.to.throw(SyntaxError);
        expect(json.indexOf(NAME), 'expected json to contain \'Lorem ipsum\'').to.not.equal(-1);
        done();
      });
    });

    describe('toString method', () => {
      it('should be defined', (done) => {
        expect(ToDoItem.prototype).to.have.ownProperty('toString');
        expect(ToDoItem.prototype).to.have.property('toString').that.is.a('Function');
        done();
      });

      it('should return a string', (done) => {
        expect(ToDoItem.prototype).to.have.ownProperty('toString');
        expect(toDoList.toString()).to.be.a('string');
        done();
      });

      it('should return valid string when there are no to do items', (done) => {
        expect(toDoList.toString()).to.equal('Lorem ipsum\n');
        done();
      });

      it('should return valid string when overdue', (done) => {
        toDoList.toDoItems = TODO_ITEMS;
        expect(toDoList.toString().substr(0, 22)).to.equal('Lorem ipsum *\n* lorem ');
        done();
      });
    });

    // fromJson
  });
});
