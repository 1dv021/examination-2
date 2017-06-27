/**
 * Tests for the statistics module.
 *
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const statistics = require('../src/statistics')
const expect = require('chai').expect

// Exceptions
describe('Exceptions.', () => {
  it('descriptiveStatistics(null] should throw TypeError', done => {
    expect(() => {
      statistics.descriptiveStatistics(null)
    }).to.throw(TypeError)
    done()
  })

  it('descriptiveStatistics([]) should throw Error', done => {
    expect(() => {
      statistics.descriptiveStatistics([])
    }).to.throw(Error)
    done()
  })
})

// Arguments
describe('Arguments.', () => {
  it('descriptiveStatistics([4, 2, 6, 1, 3, 7, 5, 3] should return an object and not modify the argument', done => {
    let arg = [4, 2, 6, 1, 3, 7, 5, 3]
    let res = statistics.descriptiveStatistics(arg)
    expect(res).to.be.an('object')
    expect(arg).to.eql([4, 2, 6, 1, 3, 7, 5, 3])
    done()
  })
})

// Return values
describe('Return values.', () => {
  it('descriptiveStatistics([4, 2, 6, 1, 3, 7, 5, 3] should return {{max: 7, mean: 3.875, median: 3.5, min: 1, mode: [3], range: 6}}', done => {
    expect(statistics.descriptiveStatistics([4, 2, 6, 1, 3, 7, 5, 3])).to.eql({
      max: 7,
      mean: 3.875,
      median: 3.5,
      min: 1,
      mode: [3],
      range: 6
    })
    done()
  })

  it('descriptiveStatistics([3, 5, 2, -5, 9, 2, -5, 5, 10, 4, 1, 0, -1, 9, 0] should return {{max: 10, mean: 2.6, median: 2, min: -5, mode: [-5, 0, 2, 5, 9], range: 15}}', done => {
    expect(statistics.descriptiveStatistics([3, 5, 2, -5, 9, 2, -5, 5, 10, 4, 1, 0, -1, 9, 0])).to.eql({
      max: 10,
      mean: 2.6,
      median: 2,
      min: -5,
      mode: [-5, 0, 2, 5, 9],
      range: 15
    })
    done()
  })

  it('descriptiveStatistics([5, 1, 1, 1, 3, -2, 2, 5, 7, 4, 5, 16]) should return {max: 16, mean: 4, median: 3.5, min: -2, mode: [1, 5], range: 18}', done => {
    expect(statistics.descriptiveStatistics([5, 1, 1, 1, 3, -2, 2, 5, 7, 4, 5, 16])).to.eql({
      max: 16,
      mean: 4,
      median: 3.5,
      min: -2,
      mode: [1, 5],
      range: 18
    })
    done()
  })

  it('descriptiveStatistics([5.3, 5.3, 1.9, 1.9, 5.3]) should return {max: 5.3, mean: 3.94, median: 5.3, min: 1.9, mode: [5.3], range: 3.4}', done => {
    expect(statistics.descriptiveStatistics([5.3, 5.3, 1.9, 1.9, 5.3])).to.eql({
      max: 5.3,
      mean: 3.94,
      median: 5.3,
      min: 1.9,
      mode: [5.3],
      range: 3.4
    })
    done()
  })
  it('descriptiveStatistics([5, 1, 5, 1, 5]) should return {max: 5, mean: 3.4, median: 5, min: 1, mode: [5], range: 4}', done => {
    expect(statistics.descriptiveStatistics([5, 1, 5, 1, 5])).to.eql({
      max: 5,
      mean: 3.4,
      median: 5,
      min: 1,
      mode: [5],
      range: 4
    })
    done()
  })

  it('descriptiveStatistics([5, 1, 1, 5, 5, 1]) should return {max: 5, mean: 3, median: 3, min: 1, mode: [1, 5], range: 4}', done => {
    expect(statistics.descriptiveStatistics([5, 1, 1, 5, 5, 1])).to.eql({
      max: 5,
      mean: 3,
      median: 3,
      min: 1,
      mode: [1, 5],
      range: 4
    })
    done()
  })

  it('descriptiveStatistics([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2]) should return {max: 5, mean: 1.5, median: 1.5, min: -2, mode: [-2, 5], range: 7}', done => {
    expect(statistics.descriptiveStatistics([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2])).to.eql({
      max: 5,
      mean: 1.5,
      median: 1.5,
      min: -2,
      mode: [-2, 5],
      range: 7
    })
    done()
  })
})
