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
 * @returns {object[]}
 */
const createDeck = (numberOfDecks = 1) => {
  let deck = [];

  for (let i = 0; i < numberOfDecks; i++) {
    let pc = createPlayingCards();
    deck = deck.concat(pc);
  }

  return Object.freeze(deck);
};

/**
 * @returns {object[]}
 */
const createPlayingCards = () => {
  const NUMBER_OF_RANKS = Object.keys(Ranks).length;
  const NUMBER_OF_SUITS = Object.keys(Suits).length;

  let playingCards = [];
  let suit;

  // Suits
  for (let i = 0; i < NUMBER_OF_SUITS; i++) {
    suit = Suits[Object.keys(Suits)[i]];

    // Ranks
    for (let j = 0; j < NUMBER_OF_RANKS; j++) {
      playingCards.push(createPlayingCard(Ranks[Object.keys(Ranks)[j]], suit));
    }
  }

  return Object.freeze(playingCards);
};

/**
 * @returns {object}
 */
const createPlayingCard = (rank, suit) => {
  let text = (rank === 1 || rank > 10 ? (Object.keys(Ranks)[rank - 1]).substr(0, 1) : rank) + suit;

  return Object.freeze({
    rank,
    suit,
    toString: () => text
  });
};

const getPlayingCardValuePointSum = (playingCards) => {
  // Ace one point!
  let sum = playingCards.reduce((sum, x) => sum + x.rank, 0);

  // Ace 1 or 14 points!
  let numberOfAces = playingCards.filter(x => x.rank === Ranks.ACE).length;
  while (numberOfAces-- > 0 && sum + 13 < 21) {
    sum += 13;
  }

  return sum;
};

// Exports
module.exports = {
  createDeck,
  createPlayingCards,
  createPlayingCard,
  getPlayingCardValuePointSum
};
