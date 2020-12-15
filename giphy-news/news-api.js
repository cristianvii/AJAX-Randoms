function setEleDisplay(id, display) {
    var ele = document.getElementById(id);
    if (!ele ) {
        console.error('Element with id ' + id + ' not found in document.');
        return;
    }
    ele.style.display = display;
}

function showEle(id) { setEleDisplay(id, 'block');  }
function hideEle(id) { setEleDisplay(id, 'none');  }

function makeHeadline(title, output) {
    output.push('<div class="headline">');
    output.push('<a href="#article" onclick="showGIFs(\''
     + encodeURIComponent(title).replace(/'/g, "\\'") 
     + '\')">');
    output.push(title);
    output.push('</a>');
    output.push('</div>');
    return output;
}

function showHeadlines() {    
    var headlinesURL = "https://newsapi.org/v2/top-headlines"
    + "?"
    + "country=us"
    + "&"
    + "category=entertainment"
    + "&"
    + "apiKey=4d17fa114b504a19a80b0c3c1c343e7b";

    var req = new XMLHttpRequest();
    req.open("GET", headlinesURL, true);

    req.onload = function () {
        hideEle('ajax-wait');
        var newsData = JSON.parse(req.responseText);
        var output = [];
        for ( var articleIdx = 0; 
            articleIdx < newsData.articles.length; 
            articleIdx++) {
        output = makeHeadline(newsData.articles[articleIdx].title, output);
      }
        document.getElementById('headlines').innerHTML = output.join('\r');
     };

    req.onerror = function () {
        hideEle('ajax-wait');
        document.getElementById('error').innerHTML =
         'There was an error retrieving headlines. Please try again.';
         showEle('error');
    };

    req.send();

    showEle('ajax-wait');
}

function addGIFImg(imageContainerId, imgSrc) {
    var newImg = document.createElement('img');
    newImg.src = imgSrc;
    var containerEle = document.getElementById(imageContainerId);
    containerEle.appendChild()
}

function showGIFs(searchTerm) {
    var gifsURL = "http://api.giphy.com/v1/gifs/search" +
    "?" +
    "rating=g" +
    "&" +
    "q=" + searchTerm +
    "&" +
    "apiKey=UdO7u798KoisXWYHJXVZ4cPvHjkL4HH0";

    var req = new XMLHttpRequest();
    req.open("GET", gifsURL, true);

    req.onload = function () {
        hideEle('ajax-wait');
        var gifData = JSON.parse(req.responseText);
        for (var gifIdx = 0; gifIdx < gifData.data.length; gifIdx++) {
            console.log(gifData.data[gifIdx].images.orignial.url);
            addGIFImg('gifs', gifData.data[gifIdx].images.original.url);
        }
     };

     req.onerror = function () {
        hideEle('ajax-wait');
        document.getElementById('error').innerHTML =
         'There was an error retrieving headlines. Please try again.';
         showEle('error');
    };

    req.send();

    showEle('ajax-wait');
}

window.addEventListener('load', showHeadlines);









