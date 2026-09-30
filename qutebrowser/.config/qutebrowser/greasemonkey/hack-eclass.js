// ==UserScript==
// @name         Hack da E-Class OBE Absensie 
// @version      1.0
// @encoding     utf-8
// @description  A script to show outline of all the element exist on page. (origin: Debug-CSS Firefox Extension)
// @author       Hamadah2O2 
// @license      MIT
// @match        *://eclass.umc.ac.id/kelas_kuliah/pertemuan/*
// @run-at       document-end
// ==/UserScript==


(function () {
    id_matkul = window.location.href.split("pertemuan/")[1];
    cardPertemuan = document.querySelectorAll(".content__wrap .col.mb-4 .row .col-md-3.mb-4");
    cardPertemuan.forEach(e => {
        footer = e.querySelector(".card-footer");
        id_pertemuan = footer.querySelector("a").href.split("pertemuan/")[1];
        button_absen = document.createElement("a");
        button_absen.href = 'https://eclass.umc.ac.id/kelas_kuliah/hadir/'+ id_matkul + '/' + id_pertemuan;
        button_absen.textContent = "Absen";
        button_absen.classList.add("btn");
        button_absen.classList.add("btn-light");
        button_absen.classList.add("ms-2");
        footer.appendChild(button_absen);
    });
})();

// javascript:(function(){id_matkul=window.location.href.split("pertemuan/")[1];cardPertemuan=document.querySelectorAll(".content__wrap .col.mb-4 .row .col-md-3.mb-4");cardPertemuan.forEach(e=>{footer=e.querySelector(".card-footer");id_pertemuan=footer.querySelector("a").href.split("pertemuan/")[1];button_absen=document.createElement("a");button_absen.href=`https://eclass.umc.ac.id/kelas_kuliah/hadir/${id_matkul}/${id_pertemuan}`;button_absen.textContent="Absen";button_absen.classList.add("btn");button_absen.classList.add("btn-secondary");button_absen.classList.add("ms-2");footer.appendChild(button_absen);});})();

