/**
 * Module for card game functions.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const cardMaker = require('./cardMaker');
const cardTable = require('./cardTable');

/**
 * Calculates the score.
 *
 * @param {Object} dealer
 * @param {Object} player
 * @returns {string}
 */
const calculateScore = (dealer, player) => {
  let dealerHandValue = dealer.getHand().getValue();
  let playerHandValue = player.getHand().getValue();
  let score = [player.toString(), dealer.toString(), dealer.getNickName()];

  if (playerHandValue > 21) {
    score[0] += ' BUSTED!';
  } else if (dealerHandValue > 21) {
    score[1] += ' BUSTED!';
  }

  if (playerHandValue === 21 ||
    dealerHandValue > 21 ||
    playerHandValue < 21 && playerHandValue > dealerHandValue) {
    score[2] = player.getNickName();
  }

  score[2] += ' win!';

  return score.join('\n');
};

/**
 * The dealer plays a player.
 *
 * @param {Object} dealer
 * @param {Object} player
 */
const playTurn = (dealer, player) => {
  while (player.canHit()) {
    player.getHand().add(dealer.drawCard());
  }

  if (player.getHand().getValue() < 21 && player.getHand().getCount() < 5) {
    while (dealer.canHit(player.getHand().getValue())) {
      dealer.getHand().add(dealer.drawCard());
    }
  }
};

/**
 * Plays a new round.
 *
 * @param {number} [numberOfPlayers = 1]
 * @returns {string}
 */
const playRound = (numberOfPlayers = 1) => {
  const result = [];
  const playingCards = cardMaker.createDeck();
  const dealer = cardTable.createDealer(playingCards);
  dealer.shuffle();

  let players = [];

  for (let i = 1; i <= numberOfPlayers; i++) {
    let player = cardTable.createPlayer(i);
    player.getHand().add(dealer.drawCard());
    players.push(player);
  }

  for (let player of players) {
    playTurn(dealer, player);
    result.push(calculateScore(dealer, player));
    let cards = [...player.getHand().discard(), ...dealer.getHand().discard()];
    dealer.throwIntoDiscardPile(cards);
  }

  return result;
};

// Exports
module.exports = {
  calculateScore,
  playRound,
  playTurn
};
