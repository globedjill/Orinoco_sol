//affichage de chaque teddys dynamiquement dans la page ours.html  
ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
    var table = JSON.parse(reponse);
   
    table.forEach(function (element) {
        const article = document.createElement('article');
        const picture = document.createElement('picture');
        const img = document.createElement('img');
        img.src = element.imageUrl;
        const mep = document.createElement('div');
        mep.className = "mep";
        const divPrixNom = document.createElement('div');
        divPrixNom.id = 'divPrixNom';
        divPrixNom.className = 'row';
        const para = document.createElement('p');
        para.textContent = 'Prix: ';
        para.id = 'prix';
        const span = document.createElement('span');
        span.textContent = element.price/100 + " €";
        span.className = 'prix';
        const mepBoutton = document.createElement('div');
        mepBoutton.className = 'bouton';

        const paraNom = document.createElement('p');
        paraNom.id = 'paraNom';
        paraNom.textContent = element.name;
        const boutton2 = document.createElement('a');
        boutton2.className = "plusDinfo";
        boutton2.href = "orinoco/html/pageProduit.html?"+ element._id;
        boutton2.textContent = "Voir l'article";

        //Insertion dans la page
        const main = document.querySelector('main');
        main.appendChild(article);
        article.appendChild(picture);
        picture.appendChild(img);
        //div gene
        article.appendChild(mep);
        mep.appendChild(divPrixNom);
        divPrixNom.appendChild(paraNom);
        divPrixNom.appendChild(para);
        para.appendChild(span);
        mep.appendChild(boutton2);
    });
});
