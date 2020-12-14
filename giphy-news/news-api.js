function setEleDisplay(id, display) {
    var ele = document.getElementById(id);
    if (!ele ) {
        console.error('Element wit id ' + id + ' not found in document.');
        return;
    }
    ele.style.display = display;
}

function showEle(id) { setEleDisplay(id, 'block');  }
function hideEle(id) { setEleDisplay(id, 'none');  }

function showHeadlines() {
    var headlinesURL = "https://newsapi.org/v2/top-headlines" +
    "?" +
    "country=us" +
    "&" +
    "category=entertainment" +
    "&" +
    "apiKey=4d17fa114b504a19a80b0c3c1c343e7b";

    var req = new XMLHttpRequest();
    req.open("GET", headlinesURL, true);

    req.onload = function () {
        hideEle('ajax-wait');
        var newsData = JSON.parse(req.responseText);
        var output = [];
        for ( var articleIdx = 0; 
            articleIdx < newsData.articles.length; 
            articleIdx++) {

        output.push('<div class="headline">');
        output.push(newsData.articles[articleIdx].title);
        output.push('</div>');
      }
        document.getElementById('headlines').innerHTML = output.join('\r');
     };

    req.onerror = function () {
        hideEle('ajax-wait');
        console.log('error');
    };

    req.send();

    showEle('ajax-wait');
}

window.addEventListener('load', showHeadlines);