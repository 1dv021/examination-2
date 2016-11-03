'use strict';

/**
 *
 * @param rank
 * @param suit
 */
const factoryPlayingCard = (rank, suit) =>
  Object.create(protoPlayingCard, {
    'rank': {
      enumerable: true,
      configurable: false,
      writable: false,
      value: rank
    },
    'suit': {
      enumerable: true,
      configurable: false,
      writable: false,
      value: suit
    }
  });

/**
 *
 * @type {{toJSON: protoPlayingCard.toJSON, toString: protoPlayingCard.toString}}
 */
const protoPlayingCard = {
  /**
   *
   * @returns {{rank: *, suit: *, text: *}}
   */
  toJSON: function() {
    return {
      rank: this.rank,
      suit: this.suit,
      text: this.toString()
    };
  },

  /**
   *
   * @returns {*}
   */
  toString: function() {
    return (this.rank > 10 ?
        Object.keys(Ranks)[this.rank - 2].substr(0, 1) :
        this.rank) +
      this.suit;
  }
};

/**
 *
 * @param rank
 * @param suit
 * @returns {protoPlayingCard}
 */
const factoryPlayingCard2 = function(rank, suit) {
  return Object.create(protoPlayingCard, {
    'rank': {
      enumerable: true,
      configurable: false,
      writable: false,
      value: rank
    },
    'suit': {
      enumerable: true,
      configurable: false,
      writable: false,
      value: suit
    }
  });
};
