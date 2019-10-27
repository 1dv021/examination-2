/**
 * Module for hand.
 *
 * @module src/Hand
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const PlayingCard = require('./PlayingCard')
const Ranks = require('./Ranks')

/**
 *  Class representing a playing card hand.
 */
class Hand {
  /**
   * Creates a hand.
   *
   * @param {PlayingCard[]} [playingCards = []]
   */
  constructor (playingCards = []) {
    /**
     * The hand's playing cards.
     *
     * @type {PlayingCard[]}
     */
    this._playingCards = []

    // Combine the empty hand with the playing cards.
    this.add(playingCards)
  }

  /**
   * Gets the number of playing cards in the hand.
   *
   * @returns {number}
   */
  get count () {
    return this._playingCards.length
  }

  /**
   * Gets the hand's value, the sum of the ranks.
   *
   * @returns {number}
   */
  get value () {
    // Compute the hand value where each ace is 14 points.
    let handValue = this._playingCards.reduce((sum, card) => sum + card, 0)

    // ...and count each ace as one point as long as the hand value i greater than 21.
    let numberOfAces = this._playingCards.filter(card => card.rank === Ranks.ACE).length
    while (numberOfAces-- > 0 && handValue > 21) {
      handValue -= 13
    }

    return handValue
  }

  /**
   * Adds playing card(s) to the hand.
   *
   * @param {PlayingCard|PlayingCard[]} playingCards
   * @returns {Hand}
   */
  add (playingCards) {
    if (typeof playingCards[Symbol.iterator] !== 'function') {
      playingCards = [playingCards]
    }
    if (!playingCards.every(x => x instanceof PlayingCard)) {
      throw new TypeError('Expected references to PlayingCard objects.')
    }

    this._playingCards = this._playingCards.concat(playingCards)
  }

  /**
   * Creates a new object that is a copy of the current instance.
   *
   * @returns {Hand}
   */
  copy () {
    return new Hand(this._playingCards)
  }

  /**
   * Discards the playing cards from the hand.
   *
   * @returns {PlayingCard[]}
   */
  discardAll () {
    return this._playingCards.splice(0)
  }

  /**
   * Returns an object to stringify.
   *
   * @returns {{count: number, value: number, playingCards: PlayingCard[], text: string}}
   */
  toJSON () {
    return {
      count: this.count,
      value: this.value,
      playingCards: this._playingCards,
      text: this.toString()
    }
  }

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  toString () {
    return this.count > 0
      ? `${this._playingCards.join(' ')} (${this.value})`
      : '-'
  }
}

// Exports.
module.exports = Hand
