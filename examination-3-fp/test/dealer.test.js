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

  describe('dealer#shuffle', () => {
    it('should be defined', (done) => {
      expect(dealer).to.have.property('shuffle').that.is.a('Function');
      done();
    });

    it('should be a pure function', (done) => {
      const arr = Array.apply(null, {
        length: 10
      });
      expect(dealer.shuffle(arr)).to.not.equal(arr);
      done();
    });
  });
});
