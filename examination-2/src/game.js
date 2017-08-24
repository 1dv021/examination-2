/**
 * Module for card game functions.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict'

const Dealer = require('./Dealer')
const Player = require('./Player')
const PlayingCard = require('./PlayingCard')
const playingCardsPile = require('./playingCardsPile')
const Ranks = require('./Ranks')
const Suits = require('./Suits')

/**
 * Calculates the score.
 *
 * @param {Dealer} dealer
 * @param {Player} player
 * @returns {string}
 */
function calculateScore (dealer, player) {
  let dealerHandValue = dealer.handValue
  let playerHandValue = player.handValue
  let score = [player.toString(), dealer.toString(), dealer.nickName]

  if (playerHandValue > 21) {
    score[0] += ' BUSTED!'
  } else if (dealerHandValue > 21) {
    score[1] += ' BUSTED!'
  }

  if (player.isNaturalWinner ||
    dealerHandValue > 21 ||
    (playerHandValue < 21 && playerHandValue > dealerHandValue)) {
    score[2] = player.nickName
  }

  score[2] += ' wins!'

  return score.join('\n')
}

/**
 * Creates 52 playing cards.
 *
 * @returns {PlayingCard[]}
 */
function createPlayingCards () {
  let playingCards = new Array(Object.keys(Suits).length * Object.keys(Ranks).length)
  let i = 0

  for (let suitKey of Object.keys(Suits)) {
    for (let rankKey of Object.keys(Ranks)) {
      playingCards[i++] = new PlayingCard(Ranks[rankKey], Suits[suitKey])
    }
  }

  return playingCards
}

/**
 * The dealer plays a player.
 *
 * @param {Dealer} dealer
 * @param {Player} player
 */
function playTurn (dealer, player) {
  while (player.canHit) {
    player.addToHand(dealer.deal())
  }

  if (player.handValue < 21 && player.handCount < 5) {
    while (dealer.canHit) {
      dealer.addToHand(dealer.deal())
    }
  }
}

/**
 * Plays a new round.
 *
 * @param {number} [numberOfPlayers = 1]
 * @returns {string}
 */
function playRound (numberOfPlayers = 1) {
  const result = []
  const playingCards = createPlayingCards()
  const dealer = new Dealer(playingCardsPile.createDrawPile(playingCards))
  dealer.shuffle()

  let players = []

  for (let i = 1; i <= numberOfPlayers; i++) {
    let player = new Player(`Player #${i}`)
    player.addToHand(dealer.deal())
    players.push(player)
  }

  for (let player of players) {
    playTurn(dealer, player)
    result.push(calculateScore(dealer, player))
    let cards = [...player.discardHand(), ...dealer.discardHand()]
    dealer.collectDiscardedPlayingCards(cards)
  }

  return result
}

// Exports
exports.playRound = playRound
