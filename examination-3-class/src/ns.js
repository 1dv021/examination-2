/**
 * Module for "namespace".
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict';

// Store all private properties in a single object.
// https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Contributor_s_Guide/Private_Properties#From_WeakMap_to_Namespace
function ns() {
  const map = new WeakMap();
  return (object) => {
    if (!object) {
      return object;
    }
    if (!map.has(object)) {
      map.set(object, {});
    }
    return map.get(object);
  };
}

// Exports.
module.exports = ns;
