// ==UserScript==
// @name         Otakudesu Ads Remover 
// @version      1.0
// @encoding     utf-8
// @description  A script to remove ads.
// @author       HamadaHaru 
// @license      MIT
// @match        *://otakudesu.blog/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const removeAds = () => {
        document.querySelectorAll(".iklan").forEach(e => {
            e.remove();
        });
        document.querySelector(".iklanpost").remove();
    }

    const observer = new MutationObserver(m => {
        removeAds();
    });

    observer.observe(document.body, {
        childList: true,
        subtree:true
    });
})();


