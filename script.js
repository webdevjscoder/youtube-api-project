'use strict';

let pageToken = {};

$('.popup').hide();
$('.overlay-background').hide();

$('.js-search-button').click(function() {
    searchYouTube();
});

 $('.page-button').click(function() {
    pageToken.current = $(this).val() === "next" ? pageToken.nextPage : pageToken.prevPage;
    searchYouTube();
});

$('.overlay-background').click(function() {
    $('.popup').hide();
    $('.overlay-background').hide();
});

 $('.js-search-results').on('click', '.thumbnails', function() {
     $('.popup').show();
     $('.overlay-background').show();
     $(window).scrollTop(0);
     $('.popup iframe').attr('src', 'https://www.youtube.com/embed/'+$(this).attr('videoId'));
});

function searchYouTube() {
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        dataType: 'json',
        type: 'GET',
        data: {
            q: $('.js-search-box').val(),
            part: 'snippet',
            maxResults: 5,
            pageToken: pageToken.current
        }
    }) .done(function(data) {
        pageToken.nextPage = data.nextPageToken;
        pageToken.prevPage = data.prevPageToken;

        let html = "";
        $.each(data['items'], function(index, value) {
            html += `<div><div class="title">${value.snippet.title}</div>`;
            html += `<div><div class="url"><a href="https://www.youtube.com/watch?v=${value.id.videoId}" target="_blank">${value.id.videoId}</a></div>`;
            html += `<div><img class="thumbnails" src="${value.snippet.thumbnails.medium.url}" videoId="${value.id.videoId}" alt="Video thumbnails."></div>`;
            html += `</div>`;
        });
        $('.js-search-results').html(html);
    })
}
//allows users to search
//for videos



//parameters being used
//-part set to 'snippet'
//-key set to string 'my key'
//maxResults set to 5 (default)
//type set to 'GET'


//based on the search results
//page will display thumbnail images
//that match search result


