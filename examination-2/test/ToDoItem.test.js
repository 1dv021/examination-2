/**
 * Tests for the ToDoItem type.
 *
 * @author Mats Loock
 * @version 1.0.1
 */

'use strict';

const expect = require('chai').expect;
const should = require('chai').should;

describe('ToDoItem - Using public properties (file: Ellipse.js)', () => {
  const TEXT = 'Lorem ipsum';
  const DUE_DATE = new Date('2016-10-03 00:00:00');
  const FINISHED_DATE = new Date('2016-09-30');

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
        done();
      });

      it('should not throw a TypeError if the text is set to a String object', (done) => {
        expect(() => {
          toDoItem.text = new String(TEXT);
        }).to.not.throw(TypeError);
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
          toDoItem.text = TEXT.repeat(10);
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
    });

    describe('finishedDate', () => {
      let toDoItem;

      beforeEach(() => {
        // Create a new ToDoItem before every test.
        toDoItem = new ToDoItem(TEXT, DUE_DATE);
      });

      it('should return undefined if not set by the constructor function', (done) => {
        expect(toDoItem.finishedDate).to.eql(undefined);
        done();
      });

      it('should be able to be changed', (done) => {
        toDoItem.finishedDate = FINISHED_DATE;
        expect(toDoItem.finishedDate).to.eql(FINISHED_DATE);
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
        let date = DUE_DATE;
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

  describe('Prototype', () => {
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
        done();
      });
    });

    describe('toJson method', () => {
      it('should be defined', (done) => {
        expect(ToDoItem.prototype).to.have.property('toJson').that.is.a('Function');
        done();
      });

      it('should return a string', (done) => {
        expect(toDoItem.toJson()).to.be.a.string;
        done();
      });

      it('should return valid JSON', (done) => {
        //expect(toDoItem.clone()).to.not.equal(toDoItem);
        done();
      });
    });

  //   describe('toString method', () => {
  //     it('should be defined as an own property', (done) => {
  //       expect(ToDoItem.prototype.hasOwnProperty('toString')).to.equal(true);
  //       done();
  //     });
  //
  //     it('{ a = 13.2, b = 42.1 } should return { a: 13.2, b: 42.1, area: 1745.8, circumference: 196.0 }', (done) => {
  //       let toDoItem = new ToDoItem(13.2, 42.1);
  //       expect(toDoItem.toString()).to.equal('{ a: 13.2, b: 42.1, area: 1745.8, circumference: 196.0 }');
  //       done();
  //     });
  //   });
  });
});
