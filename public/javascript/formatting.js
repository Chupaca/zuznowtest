'use strict'

var rowArraySearchView = {};
var searchedFilmsIds = [];

function setToSearchRow(type, value, id, remove) {
    if (remove) {
        delete rowArraySearchView[type].splice(rowArraySearchView[type].indexOf(id), 1)
        $(".row_preview_item[data-value='" + value + "'][data-id=" + id + "]").remove()

    } else {
        if (rowArraySearchView[type]) {
            rowArraySearchView[type].push(id)
        } else {
            rowArraySearchView[type] = []
            rowArraySearchView[type].push(id)
        }

        let html = `<li class="list-inline-item row_preview_item" style="padding:5px 10px;font-size:12px;background:#818181;margin-right:5px;color:#fff;" data-id="${id}" data-value="${value}">
         ${value}
         <a href="#">
          <span class="glyphicon glyphicon-remove remove_search_choice"></span>
         </a>
        </li>`

        $("#search_row").append(html);
        bindEvents()
    }
    searchByChoices(rowArraySearchView, type)
}


function bindEvents() {
    $(".remove_search_choice").unbind().click(function (e) {
        e.preventDefault()
        let item = $(this).closest("li")
        $("a[data-value='" + $(item).data("value") + "'][data-id=" + $(item).data("id") + "]").trigger("click")
    })
}

function buildSearchedPreviewINTOWarp(fonded, warp) {
    let html = ''
    if (fonded.length) {
        fonded.forEach(element => {
            html += `<a href="#" class="finded_films"><span data-filmid="${element.film_id}">${element.title} - ${element.release_year}</span><br>
            <span style="font-size:8px;">
            ${element.description}
            </span></a><br>`
        });
    }
    $(warp).html(html).fadeIn(200)
    $(".finded_films").unbind().click(function () {
        $("#searched_text_warp").html("").fadeOut(200)
        $.get(`/videostore/${$(this).find("span").data("filmid")}`)
            .then(({ resultsFilmsHTML, filmsIds }) => {
                $("#row_warp").html(resultsFilmsHTML)
                searchedFilmsIds = filmsIds;
                $("#search_results").text(filmsIds.length)
            })
    })
}


function buildSearchedPreviewINTOWarpNotFilms(type, items, warp) {
    let html = ''
    if (items.length) {
        items.forEach(element => {
            html += `<a href="#" class="finded_films"><span data-searchtype="${type}" data-id="${element[type + "_id"]}">
            ${(element.name || (element.first_name + " " + element.last_name))}</span></a><br>`
        });
    }
    $(warp).html(html).fadeIn(200)
    $(".finded_films").unbind().click(function () {
        $("#searched_text_warp").html("").fadeOut(200)
        $.get(`/${type}/${$(this).find("span").data("id")}`)
            .then(({ resultsFilmsHTML, filmsIds }) => {
                $("#row_warp").html(resultsFilmsHTML)
                searchedFilmsIds = filmsIds;
                $("#search_results").text(filmsIds.length)
            })
    })
}

function buildLodTable(log) {
   if(Object.keys(log).length){
       $("#row_warp_logs").append(`<tr><td>${log.date}</td><td>${log.type}</td><td>${log.value}</td><td>${log.count}</td></tr>`)
   }
}