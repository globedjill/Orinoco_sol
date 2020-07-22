function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + '' + req.statusText + '' + url);
        }
    });
    req.addEventListener('error', function () {
        console.error("Erreur reseaux avec l'URL" + url);
    });
    req.send(null);
}

ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
    var table = JSON.parse(reponse);
    var recherche = window.location.search;
    console.log(table);
    console.log(recherche);

    for (var i = 0; i < table.length; i++) {
        var id = table[i]._id;
        console.log(id);
    }
    if (recherche === id) {
        console.log('test');
    }
});
