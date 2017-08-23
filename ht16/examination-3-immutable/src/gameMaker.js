/**
 * Module for game maker functions.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

/**
 * A game.
 *
 * @typedef {Object} Game
 */

/**
 * The gamePrototype represents the prototype of the Game object.
 *
 */
const gamePrototype = {

  play: function(numberOfRounds = 1) {
    let game = this;
    for (let i = 0; i < numberOfRounds; i++) {
      game = game.playRound();
    }

    return game;
  },

  playRound: function() {
    let game = this;
    const seatPositions = game.players.length;

    // The player draws the first card.
    let result = game.dealer.deal(seatPositions);
    const players = new Array(seatPositions);
    for (let i = 0; i < seatPositions; i++) {
      players[i] = game.players[i].add(result.playingCards[i]);
    }
    game = createGame(result.dealer, players, game.outcomes);

    for (let i = 1; i <= seatPositions; i++) {
      game = game.playTurn(i);
    }

    return game;
  },

  playTurn: function(seatPosition) {
    let dealer = this.dealer;
    let player = this.players[seatPosition - 1];
    let players = [...this.players];

    // The player draws the second card.
    let result = dealer.deal();
    dealer = result.dealer;
    player = player.add(result.playingCards);

    // The player draws cards until the player stands.
    while (player.canHit()) {
      result = dealer.deal();
      dealer = result.dealer;
      player = player.add(result.playingCards);
    }

    // If the player hasn't won, the dealer draws
    // cards until the dealer stands.
    if (player.hand.value < 21 && player.hand.count < 5) {
      while (dealer.canHit()) {
        result = dealer.deal();
        dealer = result.dealer;
        dealer = dealer.add(result.playingCards);
      }
    }

    // Determine the outcome.
    let winner = dealer;
    if (player.hand.value === 21 ||
      player.hand.value < 21 &&
        (player.hand.count === 5 ||
        dealer.hand.value > 21 ||
        player.hand.value > dealer.hand.value)) {
      winner = player;
    }

    let outcome = Object.freeze({
      seatPosition,
      dealer,
      player,
      dealerStatus: '',
      playerStatus: '',
      text: `${winner.nickName} wins!`
    });

    // Discard the dealer's and the player's cards.
    let discardedPlayingCards = [...dealer.hand.playingCards, ...player.hand.playingCards];
    dealer = dealer.discardAll();
    dealer = dealer.collectDiscardedPlayingCards(discardedPlayingCards);
    player = player.discardAll();
    players.splice(seatPosition - 1, 1, player);

    return createGame(dealer, players, [...this.outcomes, outcome]);
  }
};

/**
 * Creats a new game.
 */
const createGame = (dealer, players, outcomes = []) =>
  Object.freeze(Object.create(gamePrototype, {
    'dealer': {
      enumerable: true,
      value: dealer
    },

    'outcomes': {
      enumerable: true,
      value: Object.freeze([...outcomes])
    },

    'players': {
      enumerable: true,
      value: Object.freeze([...players])
    }
  }));


// Exports
module.exports = {
  createGame
};
