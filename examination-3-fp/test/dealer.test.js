'use strict';

const expect = require('chai').expect;

describe('dealer', () => {
  let dealer;

  describe('module', () => {
    it('should be defined', (done) => {
      dealer = require('../src/dealer');
      done();
    });
  });

  // shuffle
  describe('dealer#shuffle', () => {
    it('should be defined', (done) => {
      expect(dealer).to.have.property('shuffle').that.is.a('Function');
      done();
    });

    it('should not return a reference to the same array', (done) => {
      const arr = [...Array(10).keys()];
      expect(dealer.shuffle(arr)).to.not.equal(arr);
      done();
    });

    it('should not affect the argument', (done) => {
      const arr = [...Array(10).keys()];
      const copy = [...arr];
      dealer.shuffle(arr);
      expect(arr).to.deep.equal(copy);
      done();
    });

    it('should contain the same members', (done) => {
      const arr1 = [...Array(10).keys()];
      const arr2 = dealer.shuffle(arr1);
      const containsAll = (arr1, arr2) =>
        arr2.every(arr2Item => arr1.includes(arr2Item))
      const sameMembers = (arr1, arr2) =>
        containsAll(arr1, arr2) && containsAll(arr2, arr1);
      expect(sameMembers(arr1, arr2)).to.be.true;
      done();
    });
  });
});
