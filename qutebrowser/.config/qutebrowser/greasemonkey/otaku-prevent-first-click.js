// ==UserScript==
// @name         Blokir Popup Rebrandly
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Melumpuhkan script pop-under sess_click_ntap
// @match        *://otakudesu.best/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Semua kode di dalam fungsi ini akan disuntikkan langsung ke halaman web
    function suntikKeHalaman() {
        // SENJATA 1: Kunci variabel agar selalu bernilai 1 (Tidak bisa diubah ke 0)
        try {
            Object.defineProperty(window, 'sess_click_ntap', {
                get: function() { 
                    return 1; // Selalu laporkan bahwa nilainya 1
                },
                set: function(value) {
                    console.log("🛡️ Script nakal mencoba mengubah variabel jadi " + value + ", tapi berhasil diblokir!");
                },
                configurable: false // Jangan izinkan script lain menghapus jebakan ini
            });
        } catch (e) {
            console.error("Gagal mengunci variabel:", e);
        }

        // SENJATA 2: Timpa fungsi window.open di halaman asli
        const originalOpen = window.open;
        window.open = function(url, name, features) {
            if (url && (url.includes('rebrand.ly') || url.includes('crc/'))) {
                console.warn("🛡️ BAM! Tab baru nakal ke " + url + " diblokir dari Page Context!");
                return null; 
            }
            // Izinkan jika bukan url nakal
            return originalOpen(url, name, features);
        };
    }

    // --- PROSES PENYUNTIKAN (MENEMBUS SANDBOX) ---
    // Membuat tag <script> baru, memasukkan kode kita, dan menempelkannya ke halaman
    const scriptTag = document.createElement('script');
    scriptTag.textContent = '(' + suntikKeHalaman.toString() + ')();';
    
    // Suntikkan ke bagian paling atas dokumen (head atau html)
    (document.head || document.documentElement).appendChild(scriptTag);
})();
