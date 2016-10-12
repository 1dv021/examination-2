/**
 * Module for app.
 *
 * @author Mats Loock
 * @version 1.0.0
 *
 * 21 (kortspelet), 2-10 deltagare, 52 kort.
 *
 * Äss har valfritt värdet 1 eller 14, övriga kort har sina vanliga värden.
 *
 * Given ger ett kort till den förste spelaren. Given delar sedan ut ett kort till.
 * Om spelarens båda kort har värdet 21 får han tillbaka sin insats och lika mycket till.
 * Har han fått mer än 21så tillfaller insatsen given.
 * Har han fått mindre än 21 kan han anse sig nöjd med vad han fått eller begära in fler kort.
 * Har han efter 5 kort fortfarande mindre än 21 så får han ändå tillbaka insatsen och lika mycket till från given.
 *
 * Om spelaren anser sig nöjd skall given spela mot honom. Given tar då upp kort ett efter ett och lägger dem
 * med framsidan upp på bordet.
 * Blir resultatet 21, får given insatsen.
 * Blir resultatet över 21 förlorar given insatsen och lika mycket till.
 * Stannar given på ett resultat under 21 jämförs givens hand med spelarens. Är spelarens hand högst, då får han
 * insatsen och lika mycket till av given, men annars tillfaller insatsen given.
 *
 * FÖRENKLINGAR
 * Ess har bara värdet 1. Endast en spelare förutom given.
 */

'use strict';

const CardTable = require('./src/CardTable');
const cardTable = new CardTable();

cardTable.init();
cardTable.playRound();
console.log(cardTable.calculateScore());
