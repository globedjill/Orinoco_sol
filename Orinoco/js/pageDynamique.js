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
    console.log(table);
    const regex = /\?/;
    var recherche = window.location.search.replace(regex, "");

    const main = document.querySelector('main');

    var article = document.createElement('article');
    article.className = 'afficher';
    var picture = document.createElement('picture');
    var h2 = document.createElement('h2');
    var img = document.createElement('img');
    var div = document.createElement('div');
    div.className = 'column';
    var div2 = document.createElement('div');
    div2.className = 'description';
    var description = document.createElement('p');
    var p = document.createElement('p');
    p.textContent = 'Prix: ';
    p.id = 'prix';
    var span = document.createElement('span');
    var div3 = document.createElement('div');
    div3.className = 'boutton';
    var div4 = document.createElement('div');
    div4.className = 'row';
    var label = document.createElement('label');
    label.textContent = 'Couleur';
    var select = document.createElement('select');
    var option = document.createElement('option');
    option.textContent = '--Choisir la couleur--';
    var div5 = document.createElement('div');
    div5.className = 'row';
    var label2 = document.createElement('label');
    label2.textContent = 'Quantité';
    var input = document.createElement('input');
    input.type = 'number';
    input.className = 'number';
    input.min = '1';
    input.max = "10";
    input.value = '1';
    var div6 = document.createElement('div');
    div6.className = 'row';
    var bouttonAjouterAuPanier = document.createElement('button');
    bouttonAjouterAuPanier.textContent = "Ajouter au panier";
    var bouttonContinuerMesAchats = document.createElement('a');
    bouttonContinuerMesAchats.href = "ours.html";
    bouttonContinuerMesAchats.title = 'retour';
    var bouttonReturn = document.createElement('i');
    bouttonReturn.className = 'fas fa-undo-alt';

    main.appendChild(article);
    article.appendChild(picture);
    picture.appendChild(img);
    article.appendChild(div);
    div.appendChild(div2);
    div2.appendChild(h2);
    div2.appendChild(description);
    div2.appendChild(p);
    p.appendChild(span);

    div.appendChild(div3);
    div3.appendChild(div4);
    div4.appendChild(label);
    div4.appendChild(select);
    select.appendChild(option);
    div3.appendChild(div5);
    div5.appendChild(label2);
    div5.appendChild(input);

    div.appendChild(div6);
    div6.appendChild(bouttonAjouterAuPanier);
    div6.appendChild(bouttonContinuerMesAchats);
    bouttonContinuerMesAchats.appendChild(bouttonReturn);

    for (var i = 0; i < table.length; i++) {
        var tableId = table[i]._id;
        var result = table[i];
        if (recherche === tableId) {
            img.src = result.imageUrl;
            h2.textContent = result.name;
            span.textContent = result.price + " €";
            description.textContent = result.description;

            for (var i = 0; i < result.colors.length; i++) {
                var creer = document.createElement('option');
                creer.textContent = result.colors[i];
                select.appendChild(creer);
            }
        }
    }

    bouttonAjouterAuPanier.addEventListener('click', function () {
        var quantite = input.value;
        var price = parseInt(document.querySelector('span').textContent);
        var total = quantite * price;
        var couleur = select.value;

        localStorage.setItem('qtt', quantite);
        localStorage.setItem('prix', price);
        localStorage.setItem('total', total);
        localStorage.setItem('couleur', couleur);

    });
});


