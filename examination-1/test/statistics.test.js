/**
 * Tests for the statistics module.
 *
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const statistics = require('../src/statistics')
const expect = require('chai').expect

// ------------------------------------------------------------------ maximum
describe('maximum', () => {
  // exceptions
  it('maximum(null) should throw TypeError', done => {
    expect(() => {
      statistics.maximum(null)
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed argument is not an array.')
    done()
  })

  it('maximum([]) should throw Error', done => {
    expect(() => {
      statistics.maximum([])
    }).to.throw(Error).and
    .to.have.property('message', 'The array contains no elements.')
    done()
  })

  it(`maximum([1, 2, 3, '4']) should throw TypeError`, done => {
    expect(() => {
      statistics.maximum([1, 2, 3, '4'])
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed array contains not just numbers.')
    done()
  })

  // no effect on the argument
  it('maximum([4, 2, 6, 1, 3, 7, 5, 3]) should return a number and not modify the argument', done => {
    let arg = [4, 2, 6, 1, 3, 7, 5, 3]
    let res = statistics.maximum(arg)
    expect(res).to.be.an('number')
    expect(arg).to.eql([4, 2, 6, 1, 3, 7, 5, 3])
    done()
  })

  // return value
  it('maximum([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2]) should return 5}', done => {
    expect(statistics.maximum([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2])).to.eql(5)
    done()
  })

  it('maximum([-42, -84, -2, -3]) should return -2}', done => {
    expect(statistics.maximum([-42, -84, -2, -3])).to.eql(-2)
    done()
  })
})

// ------------------------------------------------------------------ mean
describe('mean', () => {
  // exceptions
  it('mean(null) should throw TypeError', done => {
    expect(() => {
      statistics.mean(null)
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed argument is not an array.')
    done()
  })

  it('mean([]) should throw Error', done => {
    expect(() => {
      statistics.mean([])
    }).to.throw(Error).and
    .to.have.property('message', 'The array contains no elements.')
    done()
  })

  it(`mean([1, 2, 3, '4']) should throw TypeError`, done => {
    expect(() => {
      statistics.mean([1, 2, 3, '4'])
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed array contains not just numbers.')
    done()
  })

  // no effect on the argument
  it('mean([4, 2, 6, 1, 3, 7, 5, 3]) should return a number and not modify the argument', done => {
    let arg = [4, 2, 6, 1, 3, 7, 5, 3]
    let res = statistics.mean(arg)
    expect(res).to.be.an('number')
    expect(arg).to.eql([4, 2, 6, 1, 3, 7, 5, 3])
    done()
  })

  // return value
  it('mean([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2]) should return 1.5}', done => {
    expect(statistics.mean([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2])).to.eql(1.5)
    done()
  })

  it('mean([-42, -84, -2, -3]) should return -32.75}', done => {
    expect(statistics.mean([-42, -84, -2, -3])).to.eql(-32.75)
    done()
  })
})

// ------------------------------------------------------------------ median
describe('median', () => {
  // exceptions
  it('median(null) should throw TypeError', done => {
    expect(() => {
      statistics.median(null)
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed argument is not an array.')
    done()
  })

  it('median([]) should throw Error', done => {
    expect(() => {
      statistics.median([])
    }).to.throw(Error).and
    .to.have.property('message', 'The array contains no elements.')
    done()
  })

  it(`median([1, 2, 3, '4']) should throw TypeError`, done => {
    expect(() => {
      statistics.median([1, 2, 3, '4'])
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed array contains not just numbers.')
    done()
  })

  // no effect on the argument
  it('median([4, 2, 6, 1, 3, 7, 5, 3]) should return a number and not modify the argument', done => {
    let arg = [4, 2, 6, 1, 3, 7, 5, 3]
    let res = statistics.median(arg)
    expect(res).to.be.an('number')
    expect(arg).to.eql([4, 2, 6, 1, 3, 7, 5, 3])
    done()
  })

  // return value
  it('median([4, 2, 6, 1, 3, 7, 5, 3]) should return 3.5}', done => {
    expect(statistics.median([4, 2, 6, 1, 3, 7, 5, 3])).to.eql(3.5)
    done()
  })

  it('median([4, 2, 6, -1, 3, 5, 3]) should return 3}', done => {
    expect(statistics.median([4, 2, 6, -1, 3, 5, 3])).to.eql(3)
    done()
  })
})

// ------------------------------------------------------------------ minimum
describe('minimum', () => {
  // exceptions
  it('minimum(null) should throw TypeError', done => {
    expect(() => {
      statistics.minimum(null)
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed argument is not an array.')
    done()
  })

  it('minimum([]) should throw Error', done => {
    expect(() => {
      statistics.minimum([])
    }).to.throw(Error).and
    .to.have.property('message', 'The array contains no elements.')
    done()
  })

  it(`minimum([1, 2, 3, '4']) should throw TypeError`, done => {
    expect(() => {
      statistics.minimum([1, 2, 3, '4'])
    }).to.throw(TypeError).and
    .to.have.property('message', 'The passed array contains not just numbers.')
    done()
  })

  // no effect on the argument
  it('minimum([4, 2, 6, 1, 3, 7, 5, 3]) should return a number and not modify the argument', done => {
    let arg = [4, 2, 6, 1, 3, 7, 5, 3]
    let res = statistics.minimum(arg)
    expect(res).to.be.an('number')
    expect(arg).to.eql([4, 2, 6, 1, 3, 7, 5, 3])
    done()
  })

  // return value
  it('minimum([2, 5, 1, 1, 5, 5, 2, 2, 2, 2]) should return 1}', done => {
    expect(statistics.minimum([2, 5, 1, 1, 5, 5, 2, 2, 2, 2])).to.eql(1)
    done()
  })

  it('minimum([-42, -84, -2, -3]) should return -84}', done => {
    expect(statistics.minimum([-42, -84, -2, -3])).to.eql(-84)
    done()
  })
})

describe('mode', () => {
})

describe('range', () => {
})

describe('standardDeviation', () => {
})

describe('descriptiveStatistics', () => {
})

// // Exceptions
// describe('Exceptions.', () => {
//   it('descriptiveStatistics(null] should throw TypeError', done => {
//     expect(() => {
//       statistics.descriptiveStatistics(null)
//     }).to.throw(TypeError)
//     done()
//   })

//   it('descriptiveStatistics([]) should throw Error', done => {
//     expect(() => {
//       statistics.descriptiveStatistics([])
//     }).to.throw(Error)
//     done()
//   })
// })

// // Arguments
// describe('Arguments.', () => {
//   it('descriptiveStatistics([4, 2, 6, 1, 3, 7, 5, 3] should return an object and not modify the argument', done => {
//     let arg = [4, 2, 6, 1, 3, 7, 5, 3]
//     let res = statistics.descriptiveStatistics(arg)
//     expect(res).to.be.an('object')
//     expect(arg).to.eql([4, 2, 6, 1, 3, 7, 5, 3])
//     done()
//   })
// })

// // Return values
// describe('Return values.', () => {
//   it('descriptiveStatistics([4, 2, 6, 1, 3, 7, 5, 3] should return {{max: 7, mean: 3.875, median: 3.5, min: 1, mode: [3], range: 6}}', done => {
//     expect(statistics.descriptiveStatistics([4, 2, 6, 1, 3, 7, 5, 3])).to.eql({
//       max: 7,
//       mean: 3.875,
//       median: 3.5,
//       min: 1,
//       mode: [3],
//       range: 6
//     })
//     done()
//   })

//   it('descriptiveStatistics([3, 5, 2, -5, 9, 2, -5, 5, 10, 4, 1, 0, -1, 9, 0] should return {{max: 10, mean: 2.6, median: 2, min: -5, mode: [-5, 0, 2, 5, 9], range: 15}}', done => {
//     expect(statistics.descriptiveStatistics([3, 5, 2, -5, 9, 2, -5, 5, 10, 4, 1, 0, -1, 9, 0])).to.eql({
//       max: 10,
//       mean: 2.6,
//       median: 2,
//       min: -5,
//       mode: [-5, 0, 2, 5, 9],
//       range: 15
//     })
//     done()
//   })

//   it('descriptiveStatistics([5, 1, 1, 1, 3, -2, 2, 5, 7, 4, 5, 16]) should return {max: 16, mean: 4, median: 3.5, min: -2, mode: [1, 5], range: 18}', done => {
//     expect(statistics.descriptiveStatistics([5, 1, 1, 1, 3, -2, 2, 5, 7, 4, 5, 16])).to.eql({
//       max: 16,
//       mean: 4,
//       median: 3.5,
//       min: -2,
//       mode: [1, 5],
//       range: 18
//     })
//     done()
//   })

//   it('descriptiveStatistics([5.3, 5.3, 1.9, 1.9, 5.3]) should return {max: 5.3, mean: 3.94, median: 5.3, min: 1.9, mode: [5.3], range: 3.4}', done => {
//     expect(statistics.descriptiveStatistics([5.3, 5.3, 1.9, 1.9, 5.3])).to.eql({
//       max: 5.3,
//       mean: 3.94,
//       median: 5.3,
//       min: 1.9,
//       mode: [5.3],
//       range: 3.4
//     })
//     done()
//   })
//   it('descriptiveStatistics([5, 1, 5, 1, 5]) should return {max: 5, mean: 3.4, median: 5, min: 1, mode: [5], range: 4}', done => {
//     expect(statistics.descriptiveStatistics([5, 1, 5, 1, 5])).to.eql({
//       max: 5,
//       mean: 3.4,
//       median: 5,
//       min: 1,
//       mode: [5],
//       range: 4
//     })
//     done()
//   })

//   it('descriptiveStatistics([5, 1, 1, 5, 5, 1]) should return {max: 5, mean: 3, median: 3, min: 1, mode: [1, 5], range: 4}', done => {
//     expect(statistics.descriptiveStatistics([5, 1, 1, 5, 5, 1])).to.eql({
//       max: 5,
//       mean: 3,
//       median: 3,
//       min: 1,
//       mode: [1, 5],
//       range: 4
//     })
//     done()
//   })

//   it('descriptiveStatistics([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2]) should return {max: 5, mean: 1.5, median: 1.5, min: -2, mode: [-2, 5], range: 7}', done => {
//     expect(statistics.descriptiveStatistics([-2, 5, 1, 1, 5, 5, 2, -2, 2, -2])).to.eql({
//       max: 5,
//       mean: 1.5,
//       median: 1.5,
//       min: -2,
//       mode: [-2, 5],
//       range: 7
//     })
//     done()
//   })
// })
