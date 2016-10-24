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
 * @returns {PlayingCard[]}
 */
const createDeck = (numberOfDecks = 1) => {
  let deck = [];

  for (let i = 0; i < numberOfDecks; i++) {
    deck = deck.concat(createPlayingCards());
  }

  return deck;
};

/**
 * A playing card.
 *
 * @typedef {Object} PlayingCard
 * @property {Rank} rank - The playing card's rank.
 * @property {Suit} suit - The playing card's suit.
 * @property {function} toString - Returns a string representing the object.
 */

/**
 * Creates a playing card.
 *
 * @param {Rank} rank
 * @param {Suit} suit
 * @returns {PlayingCard}
 */
const createPlayingCard = (rank, suit) => {
  return Object.freeze({
    rank,
    suit,
    toString: () => (rank === 1 || rank > 10 ? (Object.keys(Ranks)[rank - 1]).substr(0, 1) : rank) + suit
  });
};

/**
 * Creates 52 playing cards.
 *
 * @returns {PlayingCard[]}
 */
const createPlayingCards = () => {
  let playingCards = [];

  for (let s of Object.keys(Suits)) {
    for (let r of Object.keys(Ranks)) {
      playingCards.push(createPlayingCard(Ranks[r], Suits[s]));
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
