'use strict';

const cardGame = require('./src/cardGame');

cardGame.init();
cardGame.playRound();
console.log(cardGame.calculateScore());
