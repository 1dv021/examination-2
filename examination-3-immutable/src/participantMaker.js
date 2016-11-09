/**
 * Module for participant maker functions.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const handMaker = require('./handMaker');

/**
 * A participant at the card table.
 *
 * @typedef {Object} Participant
 * @property {string} nickName - The participant's nick name.
 * @property {Hand} hand - The particpant's hand.
 * @property {function} add - Returns a copy of the participant where the playing card has been added to the hand.
 * @property {function} canHit - ...
 * @property {function} discard - Returns a copy of the participant where  one or more playing cards has been discared of the hand.
 * @property {function} discardAll - Returns a copy of the participant where all playing cards has been discared of the hand.
 * @property {function} toJSON - Returns an object to stringify.
 * @property {function} toString - Returns a string representing the object.
 */

/**
 * ...
 *
 * @type {{add: participantPrototype.add, canHit: participantPrototype.canHit, discard: participantPrototype.discard, discardAll: participantPrototype.discardAll, toJSON: participantPrototype.toJSON, toString: participantPrototype.toString}}
 */
const participantPrototype = {
  /**
   * Returns a copy of the participant where the playing card has been added to the hand.
   *
   * @param {PlayingCard} playingCard
   * @returns {Participant}
   */
  add: function(playingCard) {
    return createParticipant(this.nickName, this.hand.add(playingCard));
  },

  /**
   * ...
   *
   * @param {number} standValue
   * @returns {boolean}
   */
  canHit: function(standValue = 14) {
    return this.hand.value <= standValue && this.hand.count < 5;
  },

  /**
   * Returns a copy of the participant where  one or more playing cards has been discarded of the hand.
   *
   * @param {PlayingCard[]} playingCardsToDiscard
   * @returns {Participant}
   */
  discard: function(playingCardsToDiscard) {
    return createParticipant(this.nickName,
      this.hand.discard(playingCardsToDiscard));
  },

  /**
   * Returns a copy of the participant where all playing cards has been discared of the hand.
   *
   * @returns {Participant}
   */
  discardAll: function() {
    return createParticipant(this.nickName);
  },

  /**
   * Returns an object to stringify.
   *
   * @returns {{nickName: {string}, hand: {Hand}}}
   */
  toJSON: function() {
    return {
      nickName: this.nickName,
      hand: this.hand
    };
  },

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  toString: function() {
    return `${this.nickName}: ${this.hand}`;
  }
};

/**
 * Creates a new participant.
 *
 * @param {string} nickName
 * @param {Hand} hand
 * @returns {Participant}
 */
const createParticipant = (nickName, hand = handMaker.createHand()) =>
  Object.freeze(Object.create(participantPrototype, {
    'hand': {
      enumerable: true,
      value: hand
    },

    'nickName': {
      enumerable: true,
      value: nickName
    }
  }));

/**
 * A dealer at the card table.
 *
 * @typedef {Object} Dealer
 * @property {string} nickName - The dealer's nick name.
 * @property {Hand} hand - The dealer's hand.
 * @property {function} draw - Adds a playing card to the delear's hand.
 * @property {function} discard - Discards one or more playing cards of the delear's hand.
 * @property {function} discardAll - Discards all playing cards of the dealer's hand.
 * @property {function} toJSON - Returns an object to stringify.
 * @property {function} toString - Returns a string representing the object.
 */

/**
 *
 * @type {{add: dealerPrototype.add, collectDiscardedPlayingCards: dealerPrototype.collectDiscardedPlayingCards, deal: dealerPrototype.deal, discardAll: dealerPrototype.discardAll, shuffle: dealerPrototype.shuffle}}
 */
const dealerPrototype = {
  /**
   * Returns a copy of the dealer where the playing card has been added to the hand.
   *
   * @param {PlayingCard} playingCard
   * @returns {Dealer}
   */
  add: function(playingCard) {
    return createDealer(this.drawPile, this.discardPile,
      this.nickName, this.hand.add(playingCard));
  },

  /**
   * ...
   *
   * @param {PlayingCard[]}discardedPlayingCards
   * @returns {Dealer}
   */
  collectDiscardedPlayingCards: function(discardedPlayingCards) {
    return createDealer(this.drawPile,
      [...this.discardPile, ...discardedPlayingCards],
      this.nickName, this.hand);
  },

  /**
   * ...
   *
   * @param {number} count
   * @returns {{playingCards: (*|handPrototype.playingCards|{enumerable, value}|drawPilePrototype.playingCards|PlayingCard[]), dealer}}
   */
  deal: function(count = 1) {

    let drawPile = this.drawPile;
    let discardPile = this.discardPile;

    // If only one card left in the draw pile reuse the cards in the discard pile.
    if (drawPile.count === 1) {
      drawPile = drawPile.combine(discardPile);
      discardPile = [];
    }

    let result = drawPile.draw(count);

    return {
      playingCards: result.playingCards,
      dealer: promoteToDealer(createParticipant(this.nickName, this.hand),
        result.drawPile.shuffle(), discardPile)
    };
  },

  /**
   * Returns a copy of the participant where all playing cards has been discared of the hand.
   *
   * @returns {Dealer}
   */
  discardAll: function() {
    return createDealer(this.drawPile, this.discardPile, this.nickName);
  },

  /**
   *
   * @returns {Dealer}
   */
  shuffle: function() {
    return createDealer(this.drawPile.shuffle(), this.discardPile,
      this.nickName, this.hand);
  },
};

/**
 * ...
 *
 * @param {Participant} participant
 * @param {DrawPile} drawPile
 * @param {PlayingCard[]} discardPile
 * @returns {Dealer}
 */
const promoteToDealer = (participant, drawPile, discardPile = []) => {

  Object.setPrototypeOf(dealerPrototype, participantPrototype);
  let dealer = Object.create(dealerPrototype, {
    'discardPile': {
      enumerable: true,
      value: Object.freeze([...discardPile])
    },

    'drawPile': {
      enumerable: true,
      value: drawPile
    }
  });

  return Object.freeze(Object.assign(dealer, participant));
};

/**
 * ...
 *
 * @param {Participant} participant
 */
const demoteFromDealer = (participant) =>
  createParticipant(participant.nickName, participant.hand);

/**
 * Creats a new dealer.
 *
 * @param {DrawPile} drawPile
 * @param {PlayingCard[]} [discardPile = []]]
 * @param {string} [nickName = 'Dealer']
 * @param {Hand} [hand = handMaker.createHand()]
 * @returns {Dealer}
 */
const createDealer = (drawPile, discardPile = [], nickName = 'Dealer',
  hand = handMaker.createHand()) =>
  promoteToDealer(createParticipant(nickName, hand), drawPile, discardPile);

// Exports
module.exports = {
  createDealer,
  createParticipant,
  promoteToDealer,
  demoteFromDealer
};
