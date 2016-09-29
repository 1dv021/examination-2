/**
 * Tests for the ToDoList type.
 *
 * @author Mats Loock
 * @version 1.16.0
 */

'use strict';

const expect = require('chai').expect;

describe('ToDoList', () => {
  const NAME = 'Lorem ipsum';
  const COLOR = 'red';
  const DEFAULT_COLOR = 'yellow';
  const TODO_ITEMS = [];

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
        done();
      });

      it('should not throw a TypeError if the name is set to a String object', (done) => {
        expect(() => {
          toDoList.name = new String(NAME);
        }).to.not.throw(TypeError);
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
        done();
      });

      it('should not throw a TypeError if the color is set to a String object', (done) => {
        expect(() => {
          toDoList.color = new String(NAME);
        }).to.not.throw(TypeError);
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
  });

  // describe('isDone', () => {
  //   let toDoList;
  //
  //   beforeEach(() => {
  //     // Create a new ToDoList before every test.
  //     toDoList = new ToDoList(TEXT, DUE_DATE);
  //   });
  //
  //   it('should have property', (done) => {
  //     expect(toDoList).to.have.property('isDone');
  //     done();
  //   });
  //
  //   it('should return false', (done) => {
  //     expect(toDoList).to.have.property('isDone', false);
  //     done();
  //   });
  //
  //   it('should return true', (done) => {
  //     toDoList.finishedDate = FINISHED_DATE;
  //     expect(toDoList).to.have.property('isDone', true);
  //     done();
  //   });
  //
  //   it('should throw an Error if the isDone is set (should be read-only!)', (done) => {
  //     expect(() => {
  //       toDoList.isDone = true;
  //     }).to.throw(Error);
  //     done();
  //   });
  // });
  //
  // describe('isOverdue', () => {
  //   let toDoList;
  //
  //   beforeEach(() => {
  //     // Create a new ToDoList before every test.
  //     toDoList = new ToDoList(TEXT, DUE_DATE);
  //   });
  //
  //   it('should have property', (done) => {
  //     expect(toDoList).to.have.property('isOverdue');
  //     done();
  //   });
  //
  //   it('should return false when finishedDate is set to undefined', (done) => {
  //     expect(toDoList).to.have.property('isOverdue', false);
  //     done();
  //   });
  //
  //   it('should return true', (done) => {
  //     let date = new Date(DUE_DATE);
  //     date.setMonth(DUE_DATE.getMonth() + 1);
  //     toDoList.finishedDate = date;
  //     expect(toDoList).to.have.property('isOverdue', true);
  //     done();
  //   });
  //
  //   it('should throw an Error if the isOverdue is set (should be read-only!)', (done) => {
  //     expect(() => {
  //       toDoList.isOverdue = true;
  //     }).to.throw(Error);
  //     done();
  //   });
  // });
// });

// describe('Prototype', () => {
//   let toDoList;
//
//   beforeEach(() => {
//     // Create a new ToDoList before every test.
//     toDoList = new ToDoList(TEXT, DUE_DATE);
//   });
//
//   describe('clone method', () => {
//     it('should be defined', (done) => {
//       expect(ToDoList.prototype).to.have.property('clone').that.is.a('Function');
//       done();
//     });
//
//     it('should return a ToDoList object', (done) => {
//       expect(toDoList.clone()).to.be.an.instanceof(ToDoList);
//       done();
//     });
//
//     it('should return a copy', (done) => {
//       expect(toDoList.clone()).to.not.equal(toDoList);
//       done();
//     });
//   });
//
//   describe('toJson method', () => {
//     it('should be defined', (done) => {
//       expect(ToDoList.prototype).to.have.property('toJson').that.is.a('Function');
//       done();
//     });
//
//     it('should return a string', (done) => {
//       expect(toDoList.toJson()).to.be.a('string');
//       done();
//     });
//
//     it('should return valid JSON', (done) => {
//       let json = '{"_text":"Lorem ipsum","_dueDate":"' + DUE_DATE.toISOString() + '"}';
//       expect(toDoList.toJson()).to.equal(json);
//       done();
//     });
//   });
//
//   describe('toString method', () => {
//     it('should be defined', (done) => {
//       expect(ToDoList.prototype).to.have.ownProperty('toString');
//       expect(ToDoList.prototype).to.have.property('toString').that.is.a('Function');
//       done();
//     });
//
//     it('should return a string', (done) => {
//       expect(ToDoList.prototype).to.have.ownProperty('toString');
//       expect(toDoList.toString()).to.be.a('string');
//       done();
//     });
//
//     it('should return valid string', (done) => {
//       expect(toDoList.toString()).to.equal('  Lorem ipsum 2016-10-03');
//       done();
//     });
//   });
// });
//
// describe('Static method', () => {
//   let toDoList;
//
//   beforeEach(() => {
//     // Create a new ToDoList before every test.
//     toDoList = new ToDoList(TEXT, DUE_DATE);
//   });
//
//   describe('fromJson  method', () => {
//     it('should be defined', (done) => {
//       expect(ToDoList).to.have.property('fromJson').that.is.a('Function');
//       done();
//     });
//
//     it('should return a ToDoList object', (done) => {
//       expect(ToDoList.fromJson('{\"_text\":\"Lorem ipsum\",\"_dueDate\":\"2016-10-03T00:00:00.000Z\"}')).to.be.an.instanceof(ToDoList);
//       done();
//     });
//   });
// });
});
