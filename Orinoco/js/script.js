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

//affichage de chaque teddys dynamiquement dans la page ours.html
ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
    var table = JSON.parse(reponse);
    console.log(table);
   
    table.forEach(function (element) {
        const article = document.createElement('article');
        const picture = document.createElement('picture');
        const img = document.createElement('img');
        img.src = element.imageUrl;
        const mep = document.createElement('div');
        mep.className = "mep";
        const description = document.createElement('div');
        description.className = 'description';
        const h2 = document.createElement('h2');
        const para = document.createElement('p');
        para.textContent = 'Prix: ';
        const span = document.createElement('span');
        span.textContent = element.price + " €";
        span.className = 'prix';
        const mepBoutton = document.createElement('div');
        mepBoutton.className = 'bouton';
        const boutton = document.createElement('a');
        boutton.className = 'plusDinfo';
        boutton.textContent = 'Ajouter au Panier';
        const boutton2 = document.createElement('a');
        boutton2.className = "plusDinfo";
        boutton2.href = "pageProduit.html?"+ element._id;
        boutton2.textContent = "Voir l'article";

        //Insertion dans la page 
        const main = document.querySelector('main');
        main.appendChild(article);
        article.appendChild(picture);
        picture.appendChild(img);
        article.appendChild(mep);
        mep.appendChild(description);
        description.appendChild(h2);
        h2.appendChild(para);
        para.appendChild(span);
        mep.appendChild(mepBoutton);
        mepBoutton.appendChild(boutton);
        mepBoutton.appendChild(boutton2);
    });
});
