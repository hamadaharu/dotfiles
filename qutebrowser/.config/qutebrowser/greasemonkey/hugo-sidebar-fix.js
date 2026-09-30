// ==UserScript==
// @name         Hugo Sidebar Fix 
// @version      1.0
// @encoding     utf-8
// @description  Just for my eye
// @author       Hamadah2O2
// @license      MIT
// @match        *://hugo.zan/*
// @run-at       document-start
// ==/UserScript==

(function(){
    'use strict';

    document.addEventListener("DOMContentLoaded", () => {
        const styling = document.createElement("style");

        styling.textContent = `div[x-data="toc"].top-\\[8rem\\] { height: calc(100dvh - 180px); }`

        document.head.appendChild(styling);
        
    });
})();
