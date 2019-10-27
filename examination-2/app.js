/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const PlayingCard = require('./src/PlayingCard')
const Ranks = require('./src/Ranks')
const Suits = require('./src/Suits')

const card = new PlayingCard(Ranks.FIVE, Suits.HEARTS)

console.log(card)

// const game = require('./src/game')

// let numberOfPlayers = Number.parseInt(process.argv[2])
// if (Number.isNaN(numberOfPlayers) || numberOfPlayers < 1 || numberOfPlayers > 40) {
//   console.log('--- Defaults to 7 players ---')
//   numberOfPlayers = 7
// }

// const results = game.playRound(numberOfPlayers)

// for (const result of results) {
//   console.log(result, '\n')
// }
