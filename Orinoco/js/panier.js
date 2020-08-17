//recuperation et affichage des ours
        //fonction recuperation du prix total 
    function prixTotal() {
        const tablePrix = [0];
        if (recupLocal != 0) {
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
    const buttonValiderPanier = document.createElement('button');
    buttonValiderPanier.id = 'buttonValiderPanier';
    buttonValiderPanier.textContent = 'Passer la commande';

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
        if (recupLocal.length != 0 ) {
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
            
        } else {
            main.appendChild(pPanierVide);
        }
    }
    creerElementTitre();

    if (recupLocal != 0) {
        recupLocal.forEach(function (element) {
            const article = document.createElement('article');
            article.className = 'row reCuArticle';
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
            form.appendChild(divVal);
            divVal.appendChild(pTotal);
            divVal.appendChild(totalNumber);
            divVal.appendChild(buttonValiderPanier);
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

const recupBouttonSupprimer = document.getElementsByClassName('bouttonSupprPanier');
    //fonction selection individuelle 
for (var i = 0; i < recupBouttonSupprimer.length; i++) {
    if ((recupBouttonSupprimer[i].checked === true) > 0) {
        labelSupr.textContent = 'Tous Déselectionner';
    } else {
        labelSupr.textContent = 'Tous Sélectionner';
    }
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
const recupArticle = document.querySelectorAll('article');

bouttonSuppression.addEventListener('click', function () {
    //fonction suppression article
    recupArticle.forEach(function (e) {
        let recupChecked = e.childNodes[0].checked;

        if (recupChecked === true) {
            e.remove(e);
            for (var i = 0; i < recupLocal.length; i++) {
            let recupIdArticleLocal = recupLocal[i];
            if (recupArticle.value === recupIdArticleLocal.id) {
                   totalNumber.textContent = prixTotal();
                   recupLocal.splice(recupIdArticleLocal, 1);

                    var ajoutPanier = document.getElementById('ajoutPanier');

                   ajoutPanier.textContent = recupLocal.length;
                }
            };
        }
    });
    localStorage.setItem('ours', JSON.stringify(recupLocal));
});        

    
    //passer la commande formulaire d'enregistrement 
    buttonValiderPanier.addEventListener('click', function (e) {
        e.preventDefault();
        console.log(recupLocal);

        //creation des elements 
        const divPopUp = document.createElement('div');
        divPopUp.className = 'column';
        divPopUp.id = 'divPopUp';
        divPopUp.scrollHeight;
        const h4 = document.createElement('h4');
        h4.textContent = 'Passer la commande';
        h4.id = 'h4';
        const divForm = document.createElement('div');
        divForm.className = 'column';
        divForm.id = 'divForm';
        const form = document.createElement('form');
        form.method = 'post';
        form.id = 'form';
        form.className = 'column';
        const fieldset = document.createElement('fieldset');
        fieldset.className = 'column';
        fieldset.id = 'fieldset';
        const legende = document.createElement('legende');
        legende.textContent = 'Coordonnées';
        legende.id = 'legende';

        //nom 
        const divNom = document.createElement('div');
        divNom.className = 'row divForm';
        const labelNom = document.createElement('label');
        labelNom.textContent = 'Nom ';
        labelNom.name = 'nom'
        const inputNom = document.createElement('input');
        inputNom.type = 'text';
        inputNom.name = 'nom';
        //inputNom.value = 'Ajouter un nom'; 
        inputNom.maxLength = '20';
        inputNom.required = 'true';

        //Prénom  
        const divPrenom = document.createElement('div');
        divPrenom.className = 'row divForm';
        const labelPrenom = document.createElement('label');
        labelPrenom.textContent = 'Prénom ';
        labelPrenom.name = 'prenom'
        const inputPrenom = document.createElement('input');
        inputPrenom.type = 'text';
        inputPrenom.name = 'prenom';
        //inputNom.value = 'Ajouter un nom'; 
        inputPrenom.maxLength = '20';
        inputPrenom.required = 'true';

        //Adresse complete
        const legendeAdresse = document.createElement('legende');
        legendeAdresse.textContent = 'Adresse';
        const divNumAdresse = document.createElement('div');
        divNumAdresse.className = 'row divForm';
        const numLabelAdresse = document.createElement('label');
        numLabelAdresse.textContent = 'N°';
        numLabelAdresse.name = 'num';
        const numInputAdresse = document.createElement('input');
        numInputAdresse.type = 'number';
        numInputAdresse.name = 'num';
        const divAdresse = document.createElement('div');
        divAdresse.className = 'row divForm';
        const labelAdresse = document.createElement('label');
        labelAdresse.textContent = 'Nom de la rue ';
        labelAdresse.name = 'adresse'
        const inputAdresse = document.createElement('input');
        inputAdresse.type = 'text';
        inputAdresse.name = 'adresse';
        inputAdresse.required = 'true';
        const divCpAdresse = document.createElement('div');
        divCpAdresse.className = 'row divForm';
        const cpLabelAdresse = document.createElement('label');
        cpLabelAdresse.textContent = 'Code Postale';
        cpLabelAdresse.name = 'cp';
        const cpInputAdresse = document.createElement('input');
        cpInputAdresse.type = 'number';
        cpInputAdresse.name = 'cp';
        cpInputAdresse.required = 'true';
        const divVille = document.createElement('div');
        divVille.className = 'row divForm';
        const labelVille = document.createElement('label');
        labelVille.textContent = 'Ville ';
        labelVille.name = 'ville'
        const inputVille = document.createElement('input');
        inputVille.type = 'text';
        inputVille.name = 'ville';
        inputVille.required = 'true';

        //tel et mail
        const legendeMail = document.createElement('legende');
        legendeMail.textContent = 'Vous contacter';
        const divMail = document.createElement('div');
        divMail.className = 'raw divForm';
        const labelMail = document.createElement('label');
        labelMail.name = 'mail';
        labelMail.textContent = 'Mail';
        const inputMail = document.createElement('input');
        inputMail.name = 'mail';
        inputMail.type = 'mail';
        inputMail.required = 'true';
        const divConfirmMail = document.createElement('div');
        divConfirmMail.className = 'raw divForm';
        const labelConfirmMail = document.createElement('label');
        labelConfirmMail.name = 'confirmMail';
        labelConfirmMail.textContent = 'Confirmer votre Mail';
        const inputConfirmMail = document.createElement('input');
        inputConfirmMail.name = 'confirmMail';
        inputConfirmMail.type = 'mail';
        const divTel = document.createElement('div');
        divTel.className = 'raw divForm';
        const labelTel = document.createElement('label');
        labelTel.name = 'tel';
        labelTel.textContent = 'N° Tél';
        const inputTel = document.createElement('input');
        inputTel.name = 'tel';
        inputTel.type = 'tel';

        //recap
        const divRecap = document.createElement('div');
        divRecap.id = 'divRecap';
        divRecap.className = 'row';
        const h5Recap = document.createElement('h5');
        h5Recap.textContent = 'Recaputilatif';
        h5Recap.id = 'h5Recap';
        const divRecapElm = document.createElement('div');
        divRecapElm.id = 'divRecapElm';
        const paraRecupNumElm = document.createElement('p');
        paraRecupNumElm.textContent = "Nombre d'article dans votre panier : " + recupLocal.length;
        const paraRecupTotal = document.createElement('p');
        paraRecupTotal.textContent = 'pour : ' + prixTotal();

        //boutton envoyer la commande et attente de la confirmation 
        const divButton = document.createElement('div');
        divButton.id = 'row divButton';
        const bouttonEnvoyerCommande = document.createElement('button');
        bouttonEnvoyerCommande.textContent = 'Confirmer la commande';
        bouttonEnvoyerCommande.id = 'buttonEnvoyerCommande';

        bouttonEnvoyerCommande.addEventListener('click', function (e) {
            e.preventDefault();

            class nouveauContact {
                constructor(prenom, nom, adresse, ville, mail) {
                    this.prenom = inputPrenom.value;
                    this.nom = inputNom.value;
                    this.adresse = inputAdresse.value;
                    this.ville = inputVille.value;
                    this.mail = inputMail.value;
                }
            }
            var contact = new nouveauContact;
            var products = [];
            recupLocal.forEach(function (e) {
                products.push (e.id);
            });
            console.log(products);
            console.log(contact);

            function ajaxPost(url, callback) {
                var request = new XMLHttpRequest();
                request.addEventListener('readystatechange', function () {
                    console.log('essai');

                    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                        callback(request.responseText);
                    }
                });

                request.open("POST", url);
                request.setRequestHeader("Content-Type", "application/json");
                request.send(products, contact);
            }

            ajaxPost("http://localhost:3000/api/teddies/order", function (rep) {
                var ajaxPostEssai = JSON.parse(rep);
            });
        });
       
        //boutton annuler  
        const bouttonAnnulerFormulaire = document.createElement('button');
        bouttonAnnulerFormulaire.textContent = 'Annuler';
        bouttonAnnulerFormulaire.id = 'annulerFormulaire';

        bouttonAnnulerFormulaire.addEventListener('click', function () {
            divPopUp.remove(divPopUp);
        });

        main.appendChild(divPopUp);
        divPopUp.appendChild(h4);
        divPopUp.appendChild(divForm);
        divForm.appendChild(form);
        form.appendChild(fieldset);
        form.appendChild(divRecap);
        divRecap.appendChild(h5Recap);
        divRecap.appendChild(divRecapElm);
        divRecapElm.appendChild(paraRecupNumElm);
        divRecapElm.appendChild(paraRecupTotal);
        form.appendChild(divButton);
        divButton.appendChild(bouttonEnvoyerCommande);
        divButton .appendChild(bouttonAnnulerFormulaire);
        fieldset.appendChild(legende);
        fieldset.appendChild(divNom);
        divNom.appendChild(labelNom);
        divNom.appendChild(inputNom);
        fieldset.appendChild(divPrenom);
        divPrenom.appendChild(labelPrenom);
        divPrenom.appendChild(inputPrenom);
        fieldset.appendChild(legendeAdresse);
        fieldset.appendChild(divNumAdresse);
        divNumAdresse.appendChild(numLabelAdresse);
        divNumAdresse.appendChild(numInputAdresse);
        fieldset.appendChild(divAdresse);
        divAdresse.appendChild(labelAdresse);
        divAdresse.appendChild(inputAdresse);
        fieldset.appendChild(divCpAdresse);
        divCpAdresse.appendChild(cpLabelAdresse);
        divCpAdresse.appendChild(cpInputAdresse);
        fieldset.appendChild(divVille);
        divVille.appendChild(labelVille);
        divVille.appendChild(inputVille);
        
        fieldset.appendChild(legendeMail);
        fieldset.appendChild(divMail);
        divMail.appendChild(labelMail);
        divMail.appendChild(inputMail);
        fieldset.appendChild(divConfirmMail);
        divConfirmMail.appendChild(labelConfirmMail);
        divConfirmMail.appendChild(inputConfirmMail);
        fieldset.appendChild(divTel);
        divTel.appendChild(labelTel);
        divTel.appendChild(inputTel);
    });


