//recuperation et affichage des ours
        //fonction recuperation du prix total 
    function prixTotal() {
        const tablePrix = [0];
        if (recupLocal != 0) {
            for (var i = 0; i < recupLocal.length; i++) {
                const recupPrix = recupLocal[i].prix/100 * recupLocal[i].quantite;
                tablePrix.push(recupPrix);
            }
        } 
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        return tablePrix.reduce(reducer) + ' €';
    }

const main = document.querySelector('main');
main.className = 'column';
main.id = 'mainPanier';
        //titre page
    const titrePanier = document.createElement('h2');
    titrePanier.textContent = 'Votre panier';
        //ligne legende
    const divLegende = document.createElement('div');
    divLegende.className = 'row divLegende';
    const divCheckSupr = document.createElement('div');/* div */
    divCheckSupr.className = "row divCheckSupr";
    const labelSupr = document.createElement('label');/* label checkbox */
    labelSupr.className = 'labelSupr';
    labelSupr.name = 'supprim';
    labelSupr.textContent = 'Tous Sélectionner';
    const supprimer = document.createElement('input');// checkbox supprimer
    supprimer.name = 'supprim';
    supprimer.type = 'checkbox';
    supprimer.className = 'buttonSuppr';
    const bouttonSuppression = document.createElement('button');
    bouttonSuppression.textContent = 'Supprimer';
    bouttonSuppression.className = 'bouttonSupression plusDinfo';
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
    buttonValiderPanier.className = 'plusDinfo';
    buttonValiderPanier.textContent = 'Passer la commande';

    //creation des elements de reference 
    const form = document.createElement('div');
    form.className = 'row mepForm';
    const divFormu = document.createElement('div');
    divFormu.id = 'divFormu';

    //creation du total  
    const divVal = document.createElement('div'); 
    divVal.className = 'column divVal';
    const totalNumber = document.createElement('p');
    totalNumber.className = 'totalNumber';
    totalNumber.textContent = 'Total : ' + prixTotal();

    //je garde mon panier visible lors du scroll
    window.addEventListener('scroll', function () {
        if (this.scrollY > 220) {
            divVal.className = 'column divVal scroll';
            divFormu.className ='divFormu';

        } else if (this.scrollY <= 220) {
            divVal.className = "column divVal";
            divFormu.className = '';
        }
    });

    //creation element panier vide
    function panierVide() {
        const pPanierVide = document.createElement('p');
        pPanierVide.textContent = 'Votre panier est vide';
        main.appendChild(pPanierVide);
    }
    /*function creer element titre*/
    function creerElementTitre() {
        if (recupLocal.length != 0 ) {
            /*ajout des elements titre*/
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
            panierVide();  
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
            coul.textContent = "Couleur : " + couleur;
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
            const recupPrix = element.prix/100;
            const affichePrix = document.createElement('p');
            affichePrix.textContent = recupPrix + " €";
         
            const sousTotal = document.createElement('p');
            sousTotal.id = 'sousTotal';
            sousTotal.textContent = (recupPrix * qttVal) + " €";

            /*fonction changer total*/
            quantiteType.addEventListener('input', function () {
                qttVal = quantiteType.value;
                element.quantite = qttVal;
                sousTotal.textContent = (recupPrix * qttVal) + " €";
                totalNumber.textContent = 'Total : ' + prixTotal();
            });

            //Ajout des elements
            form.appendChild(divFormu);
            divFormu.appendChild(article);
            form.appendChild(divVal);
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

//function suppression des articles
bouttonSuppression.addEventListener('click', function () {
    const recupArticle = document.querySelectorAll('article');

    recupArticle.forEach(function (e) {
        let recupChecked = e.childNodes[0].checked;
        const recupQtt = e.childNodes[2].childNodes[0].childNodes[1].textContent;
        if (recupChecked === true) {
            e.remove(e);
            recupLocal.forEach(function (element) {
                let recupQttLocal = "Couleur : " + element.coul;
                let recupIdLocal = element.id
               
                if (e.id === recupIdLocal && recupQttLocal === recupQtt) {
                    recupLocal.splice(element, 1);
                    var ajoutPanier = document.getElementById('ajoutPanier');
                    ajoutPanier.textContent = recupLocal.length;
                    totalNumber.textContent = "Total : " + prixTotal();
                }
            });
        }
        localStorage.setItem('ours', JSON.stringify(recupLocal));
    });
    if (recupLocal.length === 0) {
        main.removeChild(divLegende);
        main.removeChild(titrePanier);
        form.removeChild(divVal);
        panierVide();
    }
});        


    /*passer la commande formulaire d'enregistrement */
buttonValiderPanier.addEventListener('click', function (e) {
    e.preventDefault();
        /*creation des elements*/
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

        /*nom*/ 
        const divNom = document.createElement('div');
        divNom.className = 'row divForm';
        const labelNom = document.createElement('label');
        labelNom.textContent = 'Nom ';
        labelNom.name = 'nom';
        const inputNom = document.createElement('input');
        inputNom.className = 'obligation';
        inputNom.type = 'text';
        inputNom.name = 'nom';
        inputNom.maxLength = '20';
        inputNom.required = 'required';

        /*Prénom*/
        const divPrenom = document.createElement('div');
        divPrenom.className = 'row divForm';
        const labelPrenom = document.createElement('label');
        labelPrenom.textContent = 'Prénom ';
        labelPrenom.name = 'prenom'
        const inputPrenom = document.createElement('input');
        inputPrenom.className = 'obligation';
        inputPrenom.type = 'text';
        inputPrenom.name = 'prenom';
        inputPrenom.maxLength = '20';
        inputPrenom.required = 'required';

        /*Adresse complete*/
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
        inputAdresse.className = 'obligation';
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
        inputVille.className = 'obligation';

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
        inputMail.className = 'obligation';
       
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
        paraRecupNumElm.textContent = "Vous avez " + recupLocal.length + " articles dans votre panier." ;
        const paraRecupTotal = document.createElement('p');
        paraRecupTotal.textContent = 'Pour un Total TTc de : ' + prixTotal();

        //boutton envoyer la commande et attente de la confirmation 
        const divButton = document.createElement('div');
        divButton.id = 'divButton';
        divButton.className = 'row';

        const boutValider = document.createElement('button');
        boutValider.id = 'boutValider';
        boutValider.className = 'plusDinfo';
        const bouttonEnvoyerCommande = document.createElement('input');
        bouttonEnvoyerCommande.type = 'submit';
        bouttonEnvoyerCommande.id = 'buttonEnvoyerCommande';
        bouttonEnvoyerCommande.className = 'plusDinfo';
        const lienConfirmation = document.createElement('a');
        lienConfirmation.href = 'http://retourConfirmation.html';
        lienConfirmation.textContent = 'Confirmer la commande';

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        window.location = "retourConfirmation.html";
        /*const recupInput = fieldset.querySelectorAll('input.obligation');
            recupInput.forEach(function (element) {
                if (element.value === '') {
                    element.style.border = '2px solid red';
                    if (element.style.border === '2px solid red') {
                        const ajoutInfoRequired = document.createElement('p');
                        ajoutInfoRequired.textContent = 'Veillez remplir la case';
                        ajoutInfoRequired.style.color = 'red';
                        ajoutInfoRequired.id = 'pRequired';
                        element.parentNode.appendChild(ajoutInfoRequired);
                        e.preventDefault();
                    }  
                } else {
                    element.style.border = 'initial';
                }
            });*/
            
            /*creation de l'objet contact */
            class nouveauContact {
                constructor(firstName, lastName, address, city, email) {
                    this.firstName = inputPrenom.value;
                    this.lastName = inputNom.value;
                    this.address = inputAdresse.value;
                    this.city = inputVille.value;
                    this.email = inputMail.value;
                    }
                }
            var contactTest = new nouveauContact;

            /*creation du tableau d'id de produit dans le panier */
            var productsTest = [];
            recupLocal.forEach(function (e) {
                productsTest.push(e.id);
            });
            class tableRecap {
                constructor(contact, products , total) {
                    this.contact = contactTest;
                    this.products = productsTest;
                }
            }
            var envoi = JSON.stringify(new tableRecap);
            
            ajaxPost("http://localhost:3000/api/teddies/order", function (res) {
                let retour = localStorage.setItem('retour', res);
            }, envoi);
        let totalCommande = localStorage.setItem('total', prixTotal());
        });
    
        /*boutton annuler*/
        const bouttonAnnulerFormulaire = document.createElement('button');
        bouttonAnnulerFormulaire.textContent = 'Annuler';
        bouttonAnnulerFormulaire.id = 'annulerFormulaire';
        bouttonAnnulerFormulaire.className = 'plusDinfo';

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
        bouttonEnvoyerCommande.appendChild(lienConfirmation);
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



        /*function blurRequired() {
            const recupInput = fieldset.querySelectorAll('input.obligation');
            recupInput.forEach(function (e) {
                e.addEventListener('blur', function () {
                    if (e.value === "") {
                        e.style.border = '2px solid red';
                    } else {
                        if (e.style.border === '2px solid red') {
                            const recupPrequired = document.getElementById('pRequired');
                            e.parentNode.removeChild(recupPrequired);
                        }
                        e.style.border = '1px solid black';
                    }
                });
            });
        }
        blurRequired();
        */
    });
