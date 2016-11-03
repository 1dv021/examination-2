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
 * @property {Rank} rank - The playing card's rank.
 * @property {Suit} suit - The playing card's suit.
 * @property {function} toJSON - Returns an object to stringify.
 * @property {function} toString - Returns a string representing the object.
 */

/**
 * @type {{toJSON: protoPlayingCard.toJSON, toString: protoPlayingCard.toString}}
 */
const playingCardProto = {
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
 * @param {Rank} rank
 * @param {Suit} suit
 * @returns {PlayingCard}
 */
const createPlayingCard = (rank, suit) =>
  Object.create(playingCardProto, {
    'rank': {
      enumerable: true,
      configurable: false,
      writable: false,
      value: rank
    },
    'suit': {
      enumerable: true,
      configurable: false,
      writable: false,
      value: suit
    }
  });

/**
 * Creates 52 playing cards.
 *
 * @returns {PlayingCard[]}
 */
const createPlayingCards = () => {
  let playingCards = [];

  for (let suitKey of Object.keys(Suits)) {
    for (let rankKey of Object.keys(Ranks)) {
      playingCards.push(createPlayingCard(Ranks[rankKey], Suits[suitKey]));
    }
  }

  return playingCards;
};

/**
 * A draw pile of playing cards.
 *
 * @typedef {Object} Deck
 * @property {number} count - The number of playing cards the draw pile consists of.
 * @property {PlayingCard[]} playingCards - The draw pile's playing cards.
 * @property {function} combine - Returns a copy of the draw pile, combined with the additional playing cards.
 * @property {function} draw - Returns the drawn card(s) and a copy of the draw pile, with the remaining playing cards.
 * @property {function} shuffle - Returns a copy of the draw pile, with shuffled playing cards.
 * @property {function} toJSON - Returns an object to stringify.
 * @property {function} toString - Returns a string representing the object.
 */

/**
 * 
 */
const drawPilePrototype = {
  /**
   * Returns a copy of the draw pile, combined with the additional playing cards.
   *
   * @param {PlayingCard[]} playingCards
   * @returns {Deck}
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
   * @returns {Deck}
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
const createDrawPile = (playingCards = createPlayingCards()) => {
  return Object.create(drawPilePrototype, {
    'count': {
      enumerable: true,
      value: playingCards.length
    },

    'playingCards': {
      enumerable: true,
      value: [...playingCards]
    }
  });
};


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
