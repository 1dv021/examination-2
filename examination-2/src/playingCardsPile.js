/**
 * Module for playing cards piles.
 *
 * @module src/playingCardsPile
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const discardPilePrototype = {

  /**
   * Adds playing cards to the discard pile.
   *
   * @param {PlayingCard[]} playingCards
   */
  add: function (playingCards) {
    this._playingCards = this._playingCards.concat(playingCards)
  },

  /**
   * Gets the number of playing cards in the draw pile.
   *
   * @returns {number}
   */
  count: function () {
    return this._playingCards.length
  },

  /**
   * Creates a new object that is a copy of the current instance.
   *
   * @returns {Object}
   */
  copy: function () {
    const discardPile = createDiscardPile()
    discardPile.add(this._playingCards)
    return discardPile
  },

  /**
   * Removes all playing cards from the discard pile.
   *
   * @returns {PlayingCard[]}
   */
  removeAll: function () {
    return this._playingCards.splice(0)
  },

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  toString: function () {
    return this._playingCards.join(' ')
  }
}

/**
 * Creates a new discard pile.
 *
 * @returns {Object}
 */
function createDiscardPile () {
  return Object.create(discardPilePrototype, {
    /**
     * PlayingCard[]
     */
    _playingCards: {
      enumerable: true,
      value: [],
      writable: true
    }
  })
}

const drawPilePrototype = {

  /**
   * Adds playing cards to the draw pile.
   *
   * @param {PlayingCard[]} playingCards
   */
  add: function (playingCards) {
    this._playingCards = this._playingCards.concat(playingCards)
  },

  /**
   * Creates a new object that is a copy of the current instance.
   *
   * @returns {Object}
   */
  copy: function () {
    return createDrawPile(this._playingCards)
  },

  /**
   * Gets the number of playing cards in the draw pile.
   *
   * @returns {number}
   */
  count: function () {
    return this._playingCards.length
  },

  /**
   * Returns the drawn playing card(s).
   *
   * @param {number} [count = 1] - The number of playing cards to draw.
   * @returns {PlayingCard[]} - The drawn playing cards.
   */
  draw: function (count = 1) {
    if (this._playingCards.length === 0) {
      throw new Error('All playing cards are drawn from the fraw pile.')
    }

    return this._playingCards.splice(0, count)
  },

  /**
    * Shuffles the draw pile's playing cards.
    */
  shuffle: function () {
    let i = this._playingCards.length
    let j
    let x

    while (i) {
      j = (Math.random() * i) | 0 // using bitwise OR 0 to floor a number
      x = this._playingCards[--i]
      this._playingCards[i] = this._playingCards[j]
      this._playingCards[j] = x
    }
  },

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  toString: function () {
    return this._playingCards.join(' ')
  }
}

/**
 * Creates a new draw pile.
 *
 * @param {PlayingCard[]} playingCards
 * @returns {Object}
 */
function createDrawPile (playingCards = []) {
  return Object.create(drawPilePrototype, {
    /**
     * PlayingCard[]
     */
    _playingCards: {
      enumerable: true,
      value: playingCards.slice(0),
      writable: true
    }
  })
}

// Exports.
exports.createDiscardPile = createDiscardPile
exports.createDrawPile = createDrawPile
