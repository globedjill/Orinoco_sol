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
    const titrePanier = document.createElement('h2');
    titrePanier.textContent = 'Votre panier';
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
    divBouttonQtePrix.className = 'row';
    const bouttonSupprimer = document.createElement('button');
    bouttonSupprimer.className = 'bouttonSupprPanier';
    bouttonSupprimer.textContent = 'Supprimer';

    const divPrix = document.createElement('div');
    divPrix.className = 'row divPrix';
    const recupPrix = recupLocal.prix;
    const affichePrix = document.createElement('p');
    affichePrix.textContent = recupPrix + " €";

    const sousTotal = document.createElement('p');
    sousTotal.textContent = (recupPrix * qttVal) + " €";

        //Ajout des elements
    main.appendChild(titrePanier);
    main.appendChild(form);
    form.appendChild(img);
    form.appendChild(divMepForm);
    divMepForm.appendChild(divNomCouleur);
    divNomCouleur.appendChild(nom);
    divNomCouleur.appendChild(coul);
    form.appendChild(divPrix);
    divPrix.appendChild(affichePrix);
    divPrix.appendChild(sousTotal);
    divMepForm.appendChild(divBouttonQtePrix);
    divBouttonQtePrix.appendChild(divQuant);
    divQuant.appendChild(quantiteLabel);
    divQuant.appendChild(quantiteType);
    divBouttonQtePrix.appendChild(bouttonSupprimer);
   
});