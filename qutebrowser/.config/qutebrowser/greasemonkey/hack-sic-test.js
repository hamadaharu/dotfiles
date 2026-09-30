// ==UserScript==
// @name         SIC, Dont tell them im quit
// @namespace    https://greasyfork.org/en/users/Hamadah2O2
// @version      20250905
// @description  Like its said, dont tell SIC, Even if i change window nor tabs
// @author       Couchy
// @match        *://*.dibimbing.id/test/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
 
(function() {
'use strict';
 
Object.defineProperties(document, { 'hidden': {value: false}, 'visibilityState': {value: 'visible'} });
 
window.addEventListener(
  'visibilitychange', evt => evt.stopImmediatePropagation(), true);

})();
