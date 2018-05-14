'use strict'

$("input").click((e) => {
    e.stopPropagation()
    // e.preventDefault()
})

$("#search_btn").click((e) => {
    e.stopPropagation()
    e.preventDefault()
    let text_search = $("#free_text").val()
    let type_search = $(".handler_search_filter").find("input:checked").data("value")
    $("#searched_page_warp").empty()
    autoCompleteAndSearch(text_search, type_search, true, (flag, fonded, log) => {
        if (flag) {
            buildSearchedPreviewINTOWarp(fonded, $("#searched_page_warp"))
            buildLodTable(log)
            $("#search_results").text(fonded.length)
        }
        else {
            buildSearchedPreviewINTOWarpNotFilms(type_search, fonded, $("#searched_page_warp"))
            buildLodTable(log)
            $("#search_results").text(fonded.length)
        }
        $("#searched_text_warp").html("").fadeOut(200)
    })

})
$('.dropdown_choices a').unbind("click").on('click', function (e) {
    e.stopPropagation()
    e.preventDefault()
    $(this).find("input").trigger("click");
    setToSearchRow($(this).data('type'), $(this).data('value'), $(this).data('id'), !$(this).find("input").prop("checked"))
});


function searchByChoices(choices, type) {
    if (!Object.keys(choices).length) {
        $("#preview_table").empty()
    } else {
        $.get("/videostore/choices/search?data=" + JSON.stringify(choices))
            .then(({ resultsFilmsHTML, filmsIds }) => {
                $("#row_warp").html(resultsFilmsHTML)
                searchedFilmsIds = filmsIds;
                $("#search_results").text(filmsIds.length)
            })
    }
}

$("#free_text").keyup(function () {
    let text_search = $(this).val()
    let type_search = $(".handler_search_filter").find("input:checked").data("value")
    if (text_search.length > 2) {
        autoCompleteAndSearch(text_search, type_search, false, (flag, fonded) => {
            if (flag) {
                buildSearchedPreviewINTOWarp(fonded, $("#searched_text_warp"))
            }
            else {
                buildSearchedPreviewINTOWarpNotFilms(type_search, fonded, $("#searched_text_warp"))
            }
        })
    } else {
        $("#searched_text_warp").html("").fadeOut(200)
    }
})

function autoCompleteAndSearch(text_search, type_search, log, callback) {
    let url, flag = false;
    if (type_search == "title" || type_search == "description") {
        url = `/videostore/search?type=${type_search}&text=${text_search}&log=${log}`
        flag = true
    } else {
        url = `/${type_search}/search?text=${text_search}&log=${log}`
    }
    $.get(url)
        .then(({ log, resultGet }) => {

            callback(flag, resultGet, log)

        })
}