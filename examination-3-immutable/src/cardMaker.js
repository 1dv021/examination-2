/**
 * Module for card maker functions.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const utils = require('./utils');

/**
 * Enum for ranks.
 *
 * @enum {number}
 */
const Ranks = Object.freeze({
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13,
  ACE: 14,
});

/**
 * Enum for suits.
 *
 * @enum {string}
 */
const Suits = Object.freeze({
  CLUBS: '♣',
  DIAMONDS: '♦',
  HEARTS: '♥',
  SPADES: '♠'
});

/**
 * A playing card.
 *
 * @typedef {Object} PlayingCard
 * @property {Ranks} rank - The playing card's rank.
 * @property {Suits} suit - The playing card's suit.
 * @property {function} toJSON - Returns an object to stringify.
 * @property {function} toString - Returns a string representing the object.
 */

/**
 * The playingCardPrototype represents the prototype of the PlayingCard object.
 *
 * @type {{toJSON: playingCardPrototype.toJSON, toString: playingCardPrototype.toString}}
 */
const playingCardPrototype = {
  /**
   * Returns an object to stringify.
   *
   * @returns {{rank: {Rank}, suit: {Suit}, text: {string}}}
   */
  toJSON: function() {
    return {
      rank: this.rank,
      suit: this.suit,
      text: this.toString()
    };
  },

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  toString: function() {
    return (this.rank > 10 ?
        Object.keys(Ranks)[this.rank - 2].substr(0, 1) :
        this.rank) +
      this.suit;
  }
};

/**
 * Creats a new playing card.
 *
 * @param {Ranks} rank
 * @param {Suits} suit
 * @returns {PlayingCard}
 */
const createPlayingCard = (rank, suit) =>
  Object.freeze(Object.create(playingCardPrototype, {
    'rank': {
      enumerable: true,
      value: rank
    },

    'suit': {
      enumerable: true,
      value: suit
    }
  }));

/**
 * Creates 52 playing cards.
 *
 * @returns {PlayingCard[]}
 */
const createPlayingCards = () => {
  let playingCards =
    new Array(Object.keys(Suits).length * Object.keys(Ranks).length);
  let i = 0;

  for (let suitKey of Object.keys(Suits)) {
    for (let rankKey of Object.keys(Ranks)) {
      playingCards[i++] = createPlayingCard(Ranks[rankKey], Suits[suitKey]);
    }
  }

  return Object.freeze(playingCards);
};

/**
 * A draw pile of playing cards.
 *
 * @typedef {Object} DrawPile
 * @property {number} count - The number of playing cards the draw pile consists of.
 * @property {PlayingCard[]} playingCards - The draw pile's playing cards.
 * @property {function} combine - Returns a copy of the draw pile, combined with the additional playing cards.
 * @property {function} draw - Returns the drawn card(s) and a copy of the draw pile, with the remaining playing cards.
 * @property {function} shuffle - Returns a copy of the draw pile, with shuffled playing cards.
 * @property {function} toJSON - Returns an object to stringify.
 * @property {function} toString - Returns a string representing the object.
 */

/**
 * The drawPilePrototype represents the prototype of the DrawPile object.
 *
 * @type {{combine: drawPilePrototype.combine, draw: drawPilePrototype.draw, shuffle: drawPilePrototype.shuffle, toJSON: drawPilePrototype.toJSON, toString: drawPilePrototype.toString}}
 */
const drawPilePrototype = {
  /**
   * Returns a copy of the draw pile, combined with the additional playing cards.
   *
   * @param {PlayingCard[]} playingCards
   * @returns {DrawPile}
   */
  combine: function(playingCards) {
    return createDrawPile([...this.playingCards, playingCards]);
  },

  /**
   * Returns the drawn card(s) and a copy of the draw pile, with the remaining playing cards.
   *
   * @param {number} [count = 1] - The numnber of playing cards to draw.
   * @returns {Object} result
   * @returns {PlayingCard[]} result.playingCards - The drawn playing cards.
   * @returns {DrawPile} result.drawPile - The copy of the draw pile, with the remaining playing cards.
   */
  draw: function(count = 1) {
    const remainingPlayingCards = [...this.playingCards];

    return {
      playingCards: remainingPlayingCards.splice(0, count),
      drawPile: createDrawPile(remainingPlayingCards)
    };
  },

  /**
   * Returns a copy of the draw pile, with shuffled playing cards.
   *
   * @returns {DrawPile}
   */
  shuffle: function() {
    return createDrawPile(utils.shuffle(this.playingCards));
  },

  /**
   * Returns an object to stringify.
   */
  toJSON: function() {
    return {
      playingCards: this.playingCards
    };
  },

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  toString: function() {
    return this.playingCards.join(' ');
  }
};

/**
 * Creates a draw pile of playing cards.
 *
 * @param {PlayingCard[]} [playingCards = createPlayingCards()]
 * @returns {DrawPile}
 */
const createDrawPile = (playingCards = createPlayingCards()) =>
  Object.freeze(Object.create(drawPilePrototype, {
    'count': {
      enumerable: true,
      value: playingCards.length
    },

    'playingCards': {
      enumerable: true,
      value: Object.freeze([...playingCards])
    }
  }));

// Exports
module.exports = {
  createDrawPile,
  createPlayingCard,
  createPlayingCards,
  Ranks,
  Suits,
};

// /**
//  * Creates a playing card.
//  *
//  * @param {Rank} rank
//  * @param {Suit} suit
//  * @returns {PlayingCard}
//  */
// const createPlayingCard = (rank, suit) => {
//   return Object.freeze({
//     rank,
//     suit,
//     toString: () =>
//       (rank > 10 ?
//         (Object.keys(Ranks)[rank - 2]).substr(0, 1) :
//         rank) +
//       suit
//   });
// };
