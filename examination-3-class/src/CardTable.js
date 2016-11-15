/**
 * Module for the CardTable class.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const Dealer = require('./Dealer');
const DrawPile = require('./DrawPile');
const Outcomes = require('./Outcomes');
const Player = require('./Player');
const PlayingCard = require('./PlayingCard');
const ns = require('./ns');

/**
 *  Class representing a card table.
 */
const CardTable = (function() {

  const internal = ns();

  class CardTable {
    /**
     * Creates a card table.
     *
     * @param {string} tableName
     * @param {string[]} nickNames
     */
    constructor(tableName, nickNames) {
      /**
       * The card table's dealer.
       *
       * @type {Dealer}
       */
      internal(this).dealer = new Dealer(
        new DrawPile(PlayingCard.createPlayingCards()).shuffle());

      /**
       * The outcomes of playing rounds.
       *
       * @type {Array}
       */
      internal(this).outcomes = [];

      /**
       * The card table's seat positions with players
       *
       * @type {Player[]}
       */
      internal(this).seatPositions = new Array(7);
      for (let i = 0; i < 7; i++) {
        if (nickNames[i]) {
          internal(this).seatPositions[i] = new Player(nickNames[i]);
        }
      }

      /**
       * The card table's name.
       *
       * @type {string}
       */
      internal(this).tableName = tableName;
    }

    /**
     * ...
     *
     * @returns {*[]}
     */
    get outcomes() {
      return [...internal(this).outcomes];
    }

    /**
     * ...
     *
     * @returns {string}
     */
    get tableName() {
      return internal(this).tableName;
    }

    /**
     * ...
     *
     * @param numberOfRounds
     */
    play(numberOfRounds = 1) {
      for (let i = 0; i < numberOfRounds; i++) {
        this.playRound();
      }
    }

    /**
     * ...
     *
     */
    playRound() {
      // Deal one card to each player.
      internal(this).seatPositions
        .filter(x => x)
        .map(x => x.addToHand(internal(this).dealer.deal()));

      // Dealer plays each player.
      internal(this).outcomes = internal(this).outcomes.concat(
        internal(this).seatPositions
          .filter(x => x)
          .map(x => this.playTurn(x)));
    }

    /**
     * ...
     *
     * @param player
     * @returns {Object}
     */
    playTurn(player) {
      const dealer = internal(this).dealer;

      // The player draws the second card.
      player.addToHand(dealer.deal());

      // The player draws cards until the player stands.
      while (player.canHit()) {
        player.addToHand(dealer.deal());
      }

      // If the player hasn't won, the dealer draws
      // cards until the dealer stands.
      if (!player.isNaturalWinner && !player.isBusted) {
        while (dealer.canHit()) {
          dealer.addToHand(dealer.deal());
        }
      }

      // Determine the outcome.
      let winner = dealer;
      if (player.isNaturalWinner ||
        player.handValue < 21 &&
        (dealer.isBusted ||
        player.handValue > dealer.handValue)) {
        winner = player;
      }

      let outcome = Object.freeze({
        dealer: JSON.stringify(
          Object.assign(dealer.toJSON(), {
            outcome: dealer === winner ? Outcomes.WIN : Outcomes.LOSE,
            busted: dealer.isBusted
          })),
        player: JSON.stringify(
          Object.assign(player.toJSON(), {
            outcome: player === winner ? Outcomes.WIN : Outcomes.LOSE,
            busted: player.isBusted
          }))
      });

      // Discard the dealer's and the player's cards.
      dealer.collectDiscardedPlayingCards(
        [...dealer.discardHand(), ...player.discardHand()]);

      return outcome;
    }

    /**
     * Returns an object to stringify.
     *
     * @returns {{nickName: *, hand: *, text: string}}
     */
    toJSON() {
      return {
        dealer: internal(this).dealer,
        seatingPositions: internal(this).seatPositions,
        outcomes: internal(this).outcomes,
        text: this.toString()
      };
    }

    /**
     * Returns a string representing the object.
     *
     * @returns {string}
     */
    toString() {
      return internal(this).dealer.toString() + '\n' +
        internal(this).seatPositions.join(', ').toString();
    }
  }

  return CardTable;
}());

// Exports.
module.exports = CardTable;
