/**
 * Module for the Player class.
 *
 * @module src/Player
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const Hand = require('./Hand')

/**
 *  Class representing a player.
 */
class Player {
  /**
   * Creates a player.
   *
   * @param {string} nickName
   * @param {number} [standValue = 14]
   * @param {Hand} [hand = new Hand()]
   */
  constructor (nickName, standValue = 14, hand = new Hand()) {
    /**
     * The player's hand.
     *
     * @type {Hand}
     */
    this._hand = hand.copy()

    /**
     * The player's nick name.
     *
     * @type {string}
     */
    this._nickName = nickName

    /**
     * The player's stand value.
     *
     * @type {number}
     */
    this._standValue = standValue
  }

  /**
   * Returns a value indicating whether the player can hit or not.
   *
   * @returns {boolean}
   */
  get canHit () {
    return this._hand.value <= this._standValue &&
      this._hand.count < 5
  }

  /**
   * Gets the number of playing cards in the hand.
   *
   * @returns {number}
   */
  get handCount () {
    return this._hand.count
  }

  /**
   * Gets the player's hand's value, the sum of the ranks.
   *
   * @returns {number}
   */
  get handValue () {
    return this._hand.value
  }

  /**
   *
   * @returns {boolean}
   */
  get isBusted () {
    return this._hand.value > 21
  }

  /**
   *
   * @returns {boolean}
   */
  get isNaturalWinner () {
    return this._hand.value === 21 ||
      (this._hand.value < 21 && this._hand.count === 5)
  }

  /**
   *
   * @returns {string}
   */
  get nickName () {
    return this._nickName
  }

  /**
   * Adds playing card(s) to the player's hand.
   *
   * @param {PlayingCard|PlayingCard[]} playingCards
   */
  addToHand (playingCards) {
    this._hand.add(playingCards)
  }

  /**
   * Discards all playing cards of the player's hand.
   *
   * @returns {PlayingCard[]}
   */
  discardHand () {
    return this._hand.discardAll()
  }

  /**
   * Returns an object to stringify.
   *
   * @returns {{nickName: *, hand: *, text: string}}
   */
  toJSON () {
    return {
      nickName: this._nickName,
      hand: this._hand,
      text: this.toString()
    }
  }

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  toString () {
    return `${this._nickName}: ${this._hand.toString()}`
  }
}

// Exports.
module.exports = Player
