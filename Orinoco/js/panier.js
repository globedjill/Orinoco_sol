//recuperation et affichage des ours
ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
    var table = JSON.parse(reponse);
    const recupLocal = JSON.parse(localStorage.getItem('ours'));
    console.log(recupLocal);

        //fonction recuperation du prix total
    function prixTotal() {
        const tablePrix = [0];
        if (recupLocal != null) {
            for (var i = 0; i < recupLocal.length; i++) {
                const recupPrix = recupLocal[i].prix * recupLocal[i].quantite;
                tablePrix.push(recupPrix);
            }
        } 
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        return tablePrix.reduce(reducer) + ' €';
    }

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
    labelSupr.textContent = 'Tous Sélectionner';
    const supprimer = document.createElement('input');// checkbox supprimer
    supprimer.name = 'supprim';
    supprimer.type = 'checkbox';
    supprimer.className = 'buttonSuppr';
    const bouttonSuppression = document.createElement('button');
    bouttonSuppression.textContent = 'Supprimer';
    bouttonSuppression.className = 'bouttonSupression';
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
    form.className = 'column mepForm';
    form.method = 'post';
    form.action = 'traitement.php';

    //creation du total
    const divVal = document.createElement('div');
    divVal.className = 'row divVal';
    const pTotal = document.createElement('p');
    pTotal.className = 'pTotal';
    pTotal.textContent = 'Total : ';
    const totalNumber = document.createElement('p');
    totalNumber.className = 'totalNumber';
    totalNumber.textContent = prixTotal();

    //creation element panier vide 
    const pPanierVide = document.createElement('p');
    pPanierVide.textContent = 'Votre panier est vide';

    //function creer element titre
    function creerElementTitre() {
        if (recupLocal.length != 0 || recupLocal.length != "") {
            //ajout des elements titre  
            main.appendChild(titrePanier);
            main.appendChild(divLegende);
            divLegende.appendChild(divCheckSupr);
            divCheckSupr.appendChild(supprimer);
            divCheckSupr.appendChild(labelSupr);
            divCheckSupr.appendChild(bouttonSuppression);
            divLegende.appendChild(divParaPrix);
            divParaPrix.appendChild(pPrixTeddy);
            divParaPrix.appendChild(pSsTotalTeddy);
            main.appendChild(form);
            main.appendChild(divVal);
            divVal.appendChild(pTotal);
            divVal.appendChild(totalNumber);
        } else {
            main.appendChild(pPanierVide);
        }
    }
    creerElementTitre();

    if (recupLocal != null) {
        recupLocal.forEach(function (element) {
            const article = document.createElement('article');
            article.className = 'row article';
            article.id = element.id;

            const image = element.image;
            const img = document.createElement('img');
            img.className = 'imagePanier';
            img.src = image;

            const divMepForm = document.createElement('div');
            divMepForm.className = 'divMepForm';

            const divNomCouleur = document.createElement('div');
            divNomCouleur.className = 'row mepDivPanier';
            const nomRecup = element.nomTeddy;
            const nom = document.createElement('h3');
            nom.textContent = nomRecup;
            const couleur = element.coul;
            const coul = document.createElement('p');
            coul.className = 'mepCoul';
            coul.textContent = couleur;

            const recupQuantite = element.quantite;
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
            const recupPrix = element.prix;
            const affichePrix = document.createElement('p');
            affichePrix.textContent = recupPrix + " €";
         
            const sousTotal = document.createElement('p');
            sousTotal.id = 'sousTotal';
            sousTotal.textContent = (recupPrix * qttVal) + " €";

            //fonction changer total
            quantiteType.addEventListener('input', function () {
                qttVal = quantiteType.value;
                element.quantite = qttVal;
                sousTotal.textContent = (recupPrix * qttVal) + " €";
                totalNumber.textContent = prixTotal();
            })

            //Ajout des elements  
            form.appendChild(article);
            article.appendChild(bouttonSupprimer);
            article.appendChild(img);
            article.appendChild(divMepForm);
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
    }

    //supprimer des elements du panier 
    const recupBouttonSupprimer = document.getElementsByClassName('bouttonSupprPanier');
    const recupArticle = document.getElementsByClassName('article');

    //fonction selection individuelle
    for (var i = 0; i < recupBouttonSupprimer.length; i++) {
        recupBouttonSupprimer[i].addEventListener('click', function () {
            for (var i = 0; i < recupBouttonSupprimer.length; i++) {
                if ((recupBouttonSupprimer[i].checked === true)>0) {
                    labelSupr.textContent = 'Tous Déselectionner';
                } else {
                    labelSupr.textContent = 'Tous Sélectionner';
                }
            }
        });
    }

    //fonction tous selectionner a partir du boutton general  
    supprimer.addEventListener('click', function () {
        if (supprimer.checked === true) {
            labelSupr.textContent = 'Tous Déselectionner';
            for (var i = 0; i < recupBouttonSupprimer.length; i++) {
                recupBouttonSupprimer[i].checked = true;
            }
        } else {
            labelSupr.textContent = 'Tous Sélectionner';
                for (var i = 0; i < recupBouttonSupprimer.length; i++) {
                    recupBouttonSupprimer[i].checked = false;
                }
        }
    });

   
    //function suppression des elements
    bouttonSuppression.addEventListener('click', function () {
            for (var i = 0; i < recupArticle.length; i++) {
                var recupChecked = recupArticle[i].childNodes[0].checked;
                var recupIdArticle = recupArticle[i].id;
                var recupIdArticleLocal = recupLocal[i].id;
                var recupArticleLocal = recupLocal.indexOf(recupLocal[i]);
                if (recupChecked === true) {
                    if (recupIdArticleLocal === recupIdArticle) {

                        recupArticle[i].remove(recupArticle[i]);
                        recupLocal.splice(recupArticleLocal, 1);

                        localStorage.setItem('ours', JSON.stringify(recupLocal));
                        totalNumber.textContent = prixTotal();
                        var ajoutPanier = document.getElementById('ajoutPanier');
                        ajoutPanier.textContent = recupLocal.length;
                    }
                }
            }
            console.log(recupLocal);
    });
});

