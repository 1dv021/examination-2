/**
 * Module for participant maker functions.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

const cardMaker = require('./cardMaker');
const handMaker = require('./handMaker');
const utils = require('./utils');

/**
 * A participant at the card table.
 *
 * @typedef {Object} Participant
 * @property {string} nickName - The participant's nick name.
 * @property {Hand} hand - The particpant's hand.
 * @property {function} draw - Adds a playing card to the participant's hand.
 * @property {function} discard - Discards one or more playing cards of the participant's hand.
 * @property {function} discardAll - Discards all playing cards of the pariticpant's hand.
 * @property {function} toJSON - Returns an object to stringify.
 * @property {function} toString - Returns a string representing the object.
 */

/**
 * 
 * @type {{toJSON: protoPlayingCard.toJSON, toString: protoPlayingCard.toString}}
 */
const participantPrototype = {
  /**
   * 
   */
  draw: function(playingCard) {
    return createParticipant(this.nickName, this.hand.add(playingCard));
  },

  /**
   * 
   */
  discard: function(playingCardsToDiscard) {
    return createParticipant(this.nickName,
      this.hand.discard(playingCardsToDiscard));
  },

  /**
   * 
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
 * Creats a new participant.
 *
 * @param {string} nickName
 * @param {Hand} hand
 * @returns {Object}
 */
const createParticipant = (nickName, hand = handMaker.createPlayingHand()) =>
  Object.create(participantPrototype, {
    'hand': {
      enumerable: true,
      value: hand
    },

    'nickName': {
      enumerable: true,
      value: nickName
    }
  });

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
 */
const dealerPrototype = {
  deal: function() {
    // If only one card left in the draw pile reuse the cards in the discard pile.
    if (this.drawPile.length === 1) {
      this.drawPile =  utils.shuffle(
        this.drawPile.concat(this.discardPile.splice(0)));
    }

    return this.drawPile.shift();
  },

  shuffle: function() {
    this.drawPile = utils.shuffle(this.drawPile);
  },
};

/**
 * 
 */
const promoteToDealer = (participant, playingCards, discardPile = []) => {

  Object.setPrototypeOf(dealerPrototype, participantPrototype);
  let dealer = Object.create(dealerPrototype, {
    'discardPile': {
      enumerable: true,
      value: discardPile
    },

    'drawPile': {
      enumerable: true,
      value: [...playingCards]
    }
  });

  return Object.assign(dealer, participant);
};

/**
 * 
 */
const demoteFromDealer = (participant) =>
  createParticipant(participant.nickName, participant.hand);

// Exports
module.exports = {
  createParticipant,
  promoteToDealer,
  demoteFromDealer
};
