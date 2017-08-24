/**
 * Module for the Dealer class.
 *
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const playingCardsPile = require('./playingCardsPile')
const Hand = require('./Hand')
const Player = require('./Player')
const PlayingCard = require('./PlayingCard')

/**
 *  Class representing a dealer.
 */
class Dealer extends Player {
  /**
   * Creates a dealer.
   *
   * @param {Object} drawPile
   * @param {Object} discardPile
   * @param {string} nickName
   * @param {number} standValue
   * @param {Hand} [hand = new Hand()]
   */
  constructor (drawPile,
               discardPile = playingCardsPile.createDiscardPile(),
               nickName = 'Dealer', standValue = 18, hand = new Hand()) {
    super(nickName, standValue, hand)

    /**
     * The dealer's draw pile.
     *
     * @type {Object}
     */
    this._drawPile = drawPile.copy()

    /**
     * The dealer's discard pile.
     *
     * @type {Object}
     */
    this._discardPile = discardPile.copy()
  }

  /**
   * Collects the specified playing cards into the discard pile.
   *
   * @param {PlayingCard[]} discardedPlayingCards
   */
  collectDiscardedPlayingCards (discardedPlayingCards) {
    if (!discardedPlayingCards.every(x => x instanceof PlayingCard)) {
      throw new TypeError('Expected references to PlayingCard objects.')
    }

    this._discardPile.add(discardedPlayingCards)
  }

  /**
   * Gets playing cards from the draw pile.
   *
   * @param {number} [count = 1]
   * @returns {PlayingCard[]}
   */
  deal (count = 1) {
    // If only one card left in the draw pile reuse the cards in the discard pile.
    console.log(this._drawPile.count)
    if (this._drawPile.count() === 1) {
      this._drawPile.add(this._discardPile.removeAll())
      this.shuffle()
    }

    return this._drawPile.draw(count)
  }

  /**
   *
   */
  shuffle () {
    this._drawPile.shuffle()
  }

  /**
   * Returns an object to stringify.
   *
   * @returns {{nickName: *, hand: *, text: string}}
   */
  toJSON () {
    return Object.assign(Object.assign({}, super.toJSON()), {
      drawPile: this._drawPile,
      discardPile: this._discardPile,
      text: this.toString()
    })
  }
}

// Exports.
module.exports = Dealer
