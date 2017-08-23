/**
 * Created by mats on 2015-05-25.
 */

'use strict';

Array.prototype.shuffle = function() {
  let index;

  for (let i = this.length - 1; i > 1; i -= 1) {
    index = Math.floor(Math.random() * (i + 1));
    this[index] = this.splice(i, 1, this[index])[0];
  }

  return this;
};
