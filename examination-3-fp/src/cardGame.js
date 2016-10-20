'use strict';

const cardMaker = require('./cardMaker');
const cardTable = require('./cardTable');

let dealer;
let player;

/**
 * Calculates the score (after a finished round).
 *
 * @returns {string}
 */
const calculateScore = () => {
  let dealerHandValue = dealer.hand.getValue();
  let playerHandValue = player.hand.getValue();
  let score = [player.toString(), dealer.toString(), dealer.nickName];

  if (playerHandValue > 21) {
    score[0] += ' BUSTED!';
  } else if (dealerHandValue > 21) {
    score[1] += ' BUSTED!';
  }

  if (playerHandValue === 21 ||
    dealerHandValue > 21 ||
    playerHandValue < 21 && playerHandValue > dealerHandValue) {
    score[2] = player.nickName;
  }

  score[2] += ' win!';

  return score.join('\n');
};

/**
 * Initializes a new round. 
 */
const init = () => {
  const playingCards = cardMaker.createDeck();
  dealer = cardTable.createDealer(playingCards);
  dealer.shuffle();

  player = cardTable.createPlayer();
};

/**
 * Plays a round.
 */
const playRound = () => {
  player.hand.add(dealer.nextCard());

  while (player.canHit()) {
    player.hand.add(dealer.nextCard());
  }

  if (player.hand.getValue() < 21 && player.hand.getCount() < 5) {
    while (dealer.canHit(player.hand.getValue())) {
      dealer.hand.add(dealer.nextCard());
    }
  }
};

// Exports
module.exports = {
  calculateScore,
  init,
  playRound
};
