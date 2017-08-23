/**
 * Module for PlayingCard.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const Ranks = require('./Ranks');
const Suits = require('./Suits');

/**
 *  Class representing a playing card.
 */
class PlayingCard {
  /**
   * Creates a playing card.
   *
   * @param {Ranks} rank
   * @param {Suits} suit
   */
  constructor(rank, suit) {
    /**
     * The playing card's rank.
     *
     * @type {Ranks}
     */
    this.rank = rank;

    /**
     * The playing card's suit.
     *
     * @type {Suits}
     */
    this.suit = suit;

    Object.freeze(this);
  }

  /**
   * Returns an object to stringify.
   *
   * @returns {{rank: Ranks, suit: Suits, text: string}}
   */
  toJSON() {
    return {
      rank: this.rank,
      suit: this.suit,
      text: this.toString()
    };
  }

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  toString() {
    return (this.rank > 10 ?
        Object.keys(Ranks)[this.rank - 2].substr(0, 1) :
        this.rank) +
      this.suit;
  }

  /**
   * Creates 52 playing cards.
   *
   * @returns {PlayingCard[]}
   */
  static createPlayingCards() {
    let playingCards =
      new Array(Object.keys(Suits).length * Object.keys(Ranks).length);
    let i = 0;

    for (let suitKey of Object.keys(Suits)) {
      for (let rankKey of Object.keys(Ranks)) {
        playingCards[i++] = new PlayingCard(Ranks[rankKey], Suits[suitKey]);
      }
    }

    return playingCards;
  };

}

// Exports.
module.exports = PlayingCard;
