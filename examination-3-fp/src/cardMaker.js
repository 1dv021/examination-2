/**
 * Module for card marker functions.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const Ranks = require('./Ranks');
const Suits = require('./Suits');

/**
 * Creates a deck of playing cards.
 *
 * @param {number} [numberOfDecks = 1]
 * @returns {Object[]}
 */
const createDeck = (numberOfDecks = 1) => {
  let deck = [];

  for (let i = 0; i < numberOfDecks; i++) {
    deck = deck.concat(createPlayingCards());
  }

  return deck;
};

/**
 * Creates a playing card.
 *
 * @param {Rank} rank
 * @param {Suit} suit
 * @returns {Object}
 */
const createPlayingCard = (rank, suit) => {

  /**
   * Gets theh rank.
   */
  const getRank = () => rank;

  /**
   * Gets theh suit.
   */
  const getSuit = () => suit;

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  const toString = () => {
    return (rank === 1 || rank > 10 ? (Object.keys(Ranks)[rank - 1]).substr(0, 1) : rank) + suit;
  };

  return Object.freeze({
    getRank,
    getSuit,
    toString
  });
};

/**
 * Creates 52 playing cards.
 *
 * @returns {Object[]}
 */
const createPlayingCards = () => {
  const NUMBER_OF_RANKS = Object.keys(Ranks).length;
  const NUMBER_OF_SUITS = Object.keys(Suits).length;

  let playingCards = [];

  // Suits
  for (let i = 0; i < NUMBER_OF_SUITS; i++) {
    let suit = Suits[Object.keys(Suits)[i]];

    // Ranks
    for (let j = 0; j < NUMBER_OF_RANKS; j++) {
      playingCards.push(createPlayingCard(Ranks[Object.keys(Ranks)[j]], suit));
    }
  }

  return playingCards;
};

// Exports
module.exports = {
  createDeck,
  createPlayingCard,
  createPlayingCards
};
