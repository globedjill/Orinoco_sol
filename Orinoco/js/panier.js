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
//recuperation et affichage des ours
ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
    var table = JSON.parse(reponse);

    const main = document.querySelector('main');
    main.className = 'column';
        //titre page
    const titrePanier = document.createElement('h2');
    titrePanier.textContent = 'Votre panier';
        //ligne legende
    const divLegende = document.createElement('div');
    divLegende.className = 'row divLegende';

    const divCheckSupr = document.createElement('div');// div 
    divCheckSupr.className = "row divCheckSupr";
    const labelSupr = document.createElement('label');// label checkbox
    labelSupr.className = 'labelSupr';
    labelSupr.name = 'supprim';
    labelSupr.textContent = 'Supprimer';
    const supprimer = document.createElement('input');// checkbox supprimer
    supprimer.name = 'supprim';
    supprimer.type = 'checkbox';
    supprimer.className = 'buttonSuppr';
    supprimer.textContent = 'supprimer';
    const divParaPrix = document.createElement('div');// div prix
    divParaPrix.className = 'row divParaPrix';
    const pPrixTeddy = document.createElement('p'); // para Prix init 
    pPrixTeddy.textContent = 'Prix';
    pPrixTeddy.className = 'pPrixTeddy';
    const pSsTotalTeddy = document.createElement('p');// para Sous-total prix 
    pSsTotalTeddy.textContent = 'Sous-Total';
    pSsTotalTeddy.className = 'pSsTotalTeddy';

        //creation des elements de reference
    const form = document.createElement('form');
    form.className = 'row mepForm';
    form.method = 'post';
    form.action = 'traitement.php';

    const divMepForm = document.createElement('div');
    divMepForm.className = 'divMepForm';
    
    const recupLocal = JSON.parse(localStorage.getItem('ours'));

    const image = recupLocal.image;
    const img = document.createElement('img');
    img.className = 'imagePanier';
    img.src = image;

    const divNomCouleur = document.createElement('div');
    divNomCouleur.className = 'row mepDivPanier';
    const nomRecup = recupLocal.nomTeddy;
    const nom = document.createElement('h3');
    nom.textContent = nomRecup;
    const couleur = recupLocal.coul;
    const coul = document.createElement('p');
    coul.className = 'mepCoul';
    coul.textContent = couleur;

    const recupQuantite = recupLocal.quantite;
    const divQuant = document.createElement('div');
    divQuant.className = 'row mepDivQuant';
    const quantiteType = document.createElement('input');
    quantiteType.type = 'number';
    quantiteType.className = 'mepQtt';
    var qttVal = quantiteType.value = recupQuantite;
    const quantiteLabel = document.createElement('label');
    quantiteLabel.textContent = 'Qté ';
    const divBouttonQtePrix = document.createElement('div');
    divBouttonQtePrix.className = 'row divBouttonQtePrix';
    const bouttonSupprimer = document.createElement('input');
    bouttonSupprimer.type = 'checkbox';
    bouttonSupprimer.className = 'bouttonSupprPanier';

    const divPrix = document.createElement('div');
    divPrix.className = 'row divPrix';
    const recupPrix = recupLocal.prix;
    const affichePrix = document.createElement('p');
    affichePrix.textContent = recupPrix + " €";

    const sousTotal = document.createElement('p');
    sousTotal.textContent = (recupPrix * qttVal) + " €";

        //Ajout des elements
    main.appendChild(titrePanier);
    main.appendChild(divLegende);
    divLegende.appendChild(divCheckSupr);
    divCheckSupr.appendChild(supprimer);
    divCheckSupr.appendChild(labelSupr);
    divLegende.appendChild(divParaPrix);
    divParaPrix.appendChild(pPrixTeddy);
    divParaPrix.appendChild(pSsTotalTeddy);
    main.appendChild(form);
    form.appendChild(bouttonSupprimer);
    form.appendChild(img);
    form.appendChild(divMepForm);
    divMepForm.appendChild(divNomCouleur);
    divNomCouleur.appendChild(nom);
    divNomCouleur.appendChild(coul);
    divMepForm.appendChild(divBouttonQtePrix);
    divBouttonQtePrix.appendChild(divQuant);
    divQuant.appendChild(quantiteLabel);
    divQuant.appendChild(quantiteType);
    divBouttonQtePrix.appendChild(divPrix);
    divPrix.appendChild(affichePrix);
    divPrix.appendChild(sousTotal);
});