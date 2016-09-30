/**
 * Tests for the ToDoItem type.
 *
 * @author Mats Loock
 * @version 1.16.0
 */

'use strict';

const expect = require('chai').expect;

describe('ToDoItem', () => {
  const TEXT = 'Lorem ipsum';
  const DUE_DATE = new Date(2016, 9, 3);
  const FINISHED_DATE = new Date(2016, 8, 30);

  let ToDoItem;

  describe('Type', () => {
    it('should be defined', (done) => {
      ToDoItem = require('../src/ToDoItem');
      done();
    });
  });

  describe('Constructor', () => {
    let toDoItem;

    beforeEach(() => {
      // Create a new ToDoItem before every test.
      toDoItem = new ToDoItem(TEXT, DUE_DATE);
    });

    it('should be instance of ToDoItem', (done) => {
      expect(toDoItem).to.be.an.instanceOf(ToDoItem);
      done();
    });

    it('should have property text', (done) => {
      expect(toDoItem).to.have.property('text');
      done();
    });

    it('should have property dueDate', (done) => {
      expect(toDoItem).to.have.property('dueDate');
      done();
    });

    it('should have property finishedDate', (done) => {
      expect(toDoItem).to.have.property('finishedDate');
      done();
    });
  });

  describe('Properties', () => {
    describe('text', () => {
      let toDoItem;

      beforeEach(() => {
        // Create a new ToDoItem before every test.
        toDoItem = new ToDoItem(TEXT, DUE_DATE);
      });

      it('should return the text', (done) => {
        expect(toDoItem.text).to.equal(TEXT);
        done();
      });

      it('should be able to be changed', (done) => {
        toDoItem.text = 'Odio lectus integer';
        expect(toDoItem.text).to.equal('Odio lectus integer');
        done();
      });

      it('should throw a TypeError if the text is set to a non-string value', (done) => {
        expect(() => {
          toDoItem.text = undefined;
        }).to.throw(TypeError);
        expect(() => {
          toDoItem.text = null;
        }).to.throw(TypeError);
        expect(() => {
          toDoItem.text = 42;
        }).to.throw(TypeError);
        expect(() => {
          toDoItem.text = {};
        }).to.throw(TypeError);
        expect(() => {
          toDoItem.text = [];
        }).to.throw(TypeError);
        expect(() => {
          toDoItem.text = new String(TEXT);
        }).to.throw(TypeError);
        done();
      });

      it('should throw an Error when if the text is set to an empty string', (done) => {
        expect(() => {
          toDoItem.text = '';
        }).to.throw(Error);
        done();
      });

      it('should throw an Error if the text is to a string of a length greater than 50.', (done) => {
        expect(() => {
          toDoItem.text = 'A'.repeat(51);
        }).to.throw(Error);
        done();
      });
    });

    describe('dueDate', () => {
      let toDoItem;

      beforeEach(() => {
        // Create a new ToDoItem before every test.
        toDoItem = new ToDoItem(TEXT, DUE_DATE);
      });

      it('should return the dueDate set by the constructor function', (done) => {
        expect(toDoItem.dueDate).to.eql(DUE_DATE);
        done();
      });

      it('should be able to be changed', (done) => {
        toDoItem.dueDate = FINISHED_DATE;
        expect(toDoItem.dueDate).to.eql(FINISHED_DATE);
        done();
      });

      it('should throw a TypeError if the dueDate is set to an invalid Date object', (done) => {
        expect(() => {
          toDoItem.dueDate = null;
        }).to.throw(TypeError);
        expect(() => {
          toDoItem.dueDate = undefined;
        }).to.throw(TypeError);
        expect(() => {
          toDoItem.dueDate = 42;
        }).to.throw(TypeError);
        expect(() => {
          toDoItem.dueDate = '2016-10-03';
        }).to.throw(TypeError);
        expect(() => {
          toDoItem.dueDate = [];
        }).to.throw(TypeError);
        expect(() => {
          toDoItem.dueDate = {};
        }).to.throw(TypeError);
        done();
      });

      it('should not refer to the Date object argument in the constructor function (privacy leakish)', (done) => {
        expect(toDoItem.dueDate).to.not.equal(DUE_DATE);
        done();
      });

      it('should not be effected - constructor (privacy leakish)', (done) => {
        const date = new Date(DUE_DATE);
        toDoItem = new ToDoItem(TEXT, date);
        date.setMonth(1);
        expect(toDoItem.dueDate).to.not.deep.equal(date);
        done();
      });

      it('should not be effected - get (privacy leakish)', (done) => {
        let date = toDoItem.dueDate;
        date.setMonth(1);
        expect(toDoItem.dueDate).to.not.deep.equal(date);
        done();
      });

      it('should not be effected - set (privacy leakish)', (done) => {
        const date = new Date(DUE_DATE);
        date.setMonth(0);
        toDoItem.dueDate = date;
        date.setMonth(3);
        expect(toDoItem.dueDate).to.not.deep.equal(date);
        done();
      });
    });

    describe('finishedDate', () => {
      let toDoItem;

      beforeEach(() => {
        // Create a new ToDoItem before every test.
        toDoItem = new ToDoItem(TEXT, DUE_DATE, FINISHED_DATE);
      });

      it('should return undefined if not set by the constructor function', (done) => {
        toDoItem = new ToDoItem(TEXT, DUE_DATE);
        expect(toDoItem.finishedDate).to.eql(undefined);
        done();
      });

      it('should return the finished date set by the constructor function', (done) => {
        expect(toDoItem.finishedDate).to.eql(FINISHED_DATE);
        done();
      });

      it('should be able to be changed', (done) => {
        toDoItem.finishedDate = DUE_DATE;
        expect(toDoItem.finishedDate).to.eql(DUE_DATE);
        done();
      });

      it('should be able to be changed to undefined', (done) => {
        toDoItem.finishedDate = undefined;
        expect(toDoItem.finishedDate).to.equal(undefined);
        done();
      });

      it('should throw a TypeError if the finishedDate is set to an invalid Date object (except undefined)', (done) => {
        expect(() => {
          toDoItem.finishedDate = null;
        }).to.throw(TypeError);
        expect(() => {
          toDoItem.finishedDate = 42;
        }).to.throw(TypeError);
        expect(() => {
          toDoItem.finishedDate = '2016-10-03';
        }).to.throw(TypeError);
        expect(() => {
          toDoItem.finishedDate = [];
        }).to.throw(TypeError);
        expect(() => {
          toDoItem.finishedDate = {};
        }).to.throw(TypeError);
        expect(() => {
          toDoItem.finishedDate = undefined;
        }).to.not.throw(TypeError);
        done();
      });

      it('should not refer to the Date object argument in the constructor function (privacy leakish)', (done) => {
        toDoItem = new ToDoItem(TEXT, DUE_DATE, FINISHED_DATE);
        expect(toDoItem.finishedDate).to.not.equal(FINISHED_DATE);
        done();
      });

      it('should not be effected - constructor (privacy leakish)', (done) => {
        const date = new Date(FINISHED_DATE);
        toDoItem = new ToDoItem(TEXT, DUE_DATE, date);
        date.setMonth(1);
        expect(toDoItem.finishedDate).to.not.deep.equal(date);
        done();
      });

      it('should not be effected - get (privacy leakish)', (done) => {
        let date = toDoItem.finishedDate;
        date.setMonth(1);
        expect(toDoItem.finishedDate).to.not.deep.equal(date);
        done();
      });

      it('should not be effected - set (privacy leakish)', (done) => {
        const date = new Date(FINISHED_DATE);
        date.setMonth(0);
        toDoItem.finishedDate = date;
        date.setMonth(3);
        expect(toDoItem.finishedDate).to.not.deep.equal(date);
        done();
      });
    });

    describe('isDone', () => {
      let toDoItem;

      beforeEach(() => {
        // Create a new ToDoItem before every test.
        toDoItem = new ToDoItem(TEXT, DUE_DATE);
      });

      it('should have property', (done) => {
        expect(toDoItem).to.have.property('isDone');
        done();
      });

      it('should return false', (done) => {
        expect(toDoItem).to.have.property('isDone', false);
        done();
      });

      it('should return true', (done) => {
        toDoItem.finishedDate = FINISHED_DATE;
        expect(toDoItem).to.have.property('isDone', true);
        done();
      });

      it('should throw an Error if the isDone is set (should be read-only!)', (done) => {
        expect(() => {
          toDoItem.isDone = true;
        }).to.throw(Error);
        done();
      });
    });

    describe('isOverdue', () => {
      let toDoItem;

      beforeEach(() => {
        // Create a new ToDoItem before every test.
        toDoItem = new ToDoItem(TEXT, DUE_DATE);
      });

      it('should have property', (done) => {
        expect(toDoItem).to.have.property('isOverdue');
        done();
      });

      it('should return false when finishedDate is set to undefined', (done) => {
        expect(toDoItem).to.have.property('isOverdue', false);
        done();
      });

      it('should return true', (done) => {
        let date = new Date(DUE_DATE);
        date.setMonth(DUE_DATE.getMonth() + 1);
        toDoItem.finishedDate = date;
        expect(toDoItem).to.have.property('isOverdue', true);
        done();
      });

      it('should throw an Error if the isOverdue is set (should be read-only!)', (done) => {
        expect(() => {
          toDoItem.isOverdue = true;
        }).to.throw(Error);
        done();
      });
    });
  });

  describe('Prototype methods', () => {
    let toDoItem;

    beforeEach(() => {
      // Create a new ToDoItem before every test.
      toDoItem = new ToDoItem(TEXT, DUE_DATE);
    });

    describe('clone method', () => {
      it('should be defined', (done) => {
        expect(ToDoItem.prototype).to.have.property('clone').that.is.a('Function');
        done();
      });

      it('should return a ToDoItem object', (done) => {
        expect(toDoItem.clone()).to.be.an.instanceof(ToDoItem);
        done();
      });

      it('should return a copy', (done) => {
        expect(toDoItem.clone()).to.not.equal(toDoItem);
        expect(toDoItem.clone()).to.deep.equal(toDoItem);
        done();
      });
    });

    describe('toJson method', () => {
      it('should be defined', (done) => {
        expect(ToDoItem.prototype).to.have.property('toJson').that.is.a('Function');
        done();
      });

      it('should return valid JSON', (done) => {
        let json = toDoItem.toJson();
        expect(() => {
          JSON.parse(json);
        }).not.to.throw(SyntaxError);
        expect(json.indexOf(TEXT), 'expected json to contain \'Lorem ipsum\'').to.not.equal(-1);
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
        expect(toDoItem.toString()).to.be.a('string');
        done();
      });

      it('should return valid string when finished date is undefined', (done) => {
        expect(toDoItem.toString()).to.equal('  Lorem ipsum ' + DUE_DATE.toLocaleDateString());
        done();
      });

      it('should return valid string when finished date is set', (done) => {
        toDoItem.finishedDate = FINISHED_DATE;
        expect(toDoItem.toString()).to.equal('  Lorem ipsum ' + DUE_DATE.toLocaleDateString() + ' ' + FINISHED_DATE.toLocaleDateString());
        done();
      });

      it('should return valid string when overdue', (done) => {
        const date = new Date(DUE_DATE);
        date.setYear(date.getFullYear() + 1);
        toDoItem.finishedDate = date;
        expect(toDoItem.toString()).to.equal('* Lorem ipsum ' + DUE_DATE.toLocaleDateString() + ' ' + date.toLocaleDateString());
        done();
      });
    });
  });
});
