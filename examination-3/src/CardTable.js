/**
 * Module for the type CardTable.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

require('./array.prototype.shuffle');

const Dealer = require('./Dealer');
const DealerShoe = require('./DealerShoe');
const Player = require('./Player');
const PlayingCard = require('./PlayingCard');
const Ranks = require('./Ranks');
const Suits = require('./Suits');

/**
 * Creates a new CardTable object.
 *
 * @param {number} [numberOfDecks = 1] - The number of decks to put in the dealer shoe.
 * @constructor
 */
function CardTable(numberOfDecks) {

  /**
   *
   * @type {Dealer}
   */
  this.dealer = new Dealer('Dealer');

  /**
   *
   * @type {Player}
   */
  this.player = new Player('Player #1');

  /**
   * The dealer's shoe.
   *
   * @type {DealerShoe}
   */
  this.dealerShoe = new DealerShoe();

  /**
   * The number of decks to load into the dealer's shoe.
   *
   * @type {number}
   */
  this.numberOfDecks = numberOfDecks || 1;
}

/**
 * Creates an array of PlayCard objects.
 *
 * @param {number} numberOfDecks An integer between 1 and 6.
 * @returns {PlayingCard[]}
 */
CardTable.createPlayingCards = function(numberOfDecks) {
  const NUMBER_OF_RANKS = Object.keys(Ranks).length;
  const NUMBER_OF_SUITS = Object.keys(Suits).length;

  let playingCards = [];
  let suit;

  // Decks.
  for (let i = 0; i < numberOfDecks; i += 1) {

    // Suits
    for (let j = 0; j < NUMBER_OF_SUITS; j += 1) {
      suit = Suits[Object.keys(Suits)[j]];

      // Ranks
      for (let k = 0; k < NUMBER_OF_RANKS; k += 1) {
        playingCards.push(new PlayingCard(Ranks[Object.keys(Ranks)[k]], suit));
      }
    }
  }

  return playingCards;
};

/**
 * Calculates the score (after a finished round).
 *
 * @returns {string}
 */
CardTable.prototype.calculateScore = function() {
  let dealerHandValue = this.dealer.handValue;
  let playerHandValue = this.player.handValue;
  let score = [this.player.toString(), this.dealer.toString(), this.dealer.name];

  if (playerHandValue > 21) {
    score[0] += ' BUSTED!';
  } else if (dealerHandValue > 21) {
    score[1] += ' BUSTED!';
  }

  if (playerHandValue === 21 ||
    dealerHandValue > 21 ||
    playerHandValue < 21 && playerHandValue > dealerHandValue) {
    score[2] = this.player.name;
  }

  score[2] += ' win!';

  return score.join('\n');
};

/**
 * Initializes the current CardTable object with playing cards, dealer shoe, dealer and players.
 */
CardTable.prototype.init = function() {
  this.dealerShoe.load(
    CardTable.createPlayingCards(this.numberOfDecks).shuffle());
};

/**
 *
 */
CardTable.prototype.playRound = function() {
  let playerPointValue;

  while (this.player.canDrawPlayingCard()) {
    this.dealer.deal(this.dealerShoe, this.player);
  }

  playerPointValue = this.player.handValue;

  if (playerPointValue < 21) {
    while (this.dealer.canDrawPlayingCard(playerPointValue)) {
      this.dealer.deal(this.dealerShoe, this.dealer);
    }
  }
};

//Exports
module.exports = CardTable;
