//recuperation et affichage des ours  
const regex = /\?/;
var recherche = window.location.search.replace(regex, "");

ajaxGet("http://localhost:3000/api/teddies/"+recherche, function (reponse) {
    var table = JSON.parse(reponse);
    const main = document.querySelector('main');

    var article = document.createElement('article');
    article.className = 'afficher';
    var picture = document.createElement('picture');
    var h2 = document.createElement('h2');
    var img = document.createElement('img');
    var div = document.createElement('div');
    div.className = 'column divDescription';
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
    input.value = "1";
    var div6 = document.createElement('div');
    div6.className = 'row';
    var bouttonAjouterAuPanier = document.createElement('button');
    bouttonAjouterAuPanier.className = "plusDinfo";
    bouttonAjouterAuPanier.textContent = "Ajouter au panier";
    var bouttonContinuerMesAchats = document.createElement('a');
    bouttonContinuerMesAchats.href = "../../index.html";
    bouttonContinuerMesAchats.title = 'Retour aux articles';
    bouttonContinuerMesAchats.id = 'bouttonContinuerMesAchats';
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

    img.src = table.imageUrl;
    h2.textContent = table.name;
    span.textContent = table.price/100 + " €";
    description.textContent = table.description;

    for (var i = 0; i < table.colors.length; i++) {
        var creer = document.createElement('option');
        creer.textContent = table.colors[i];
        select.appendChild(creer);
        }

    var locGet =[];

    if (localStorage.getItem('ours')) {
        locGet = JSON.parse(localStorage.getItem('ours'));
    }

    bouttonAjouterAuPanier.addEventListener('click', function () {  
        class oursPanier {
            constructor(id, nomTeddy, image, quantite, prix, coul ) {
                this.id = table._id;
                this.nomTeddy = h2.textContent;
                this.image = img.src;
                this.quantite = input.value;
                this.prix = table.price;
                this.coul = select.value;
            }
        }   
        var nouveauPanier = new oursPanier();

        if (nouveauPanier.coul === '--Choisir la couleur--') {
            popUp(); 
            buttonOk.addEventListener('click', function () {
                divPopUpAlert.remove(divPopUpAlert);

            });
            return;
        }
        // je parcour mon tableau  
        let ajout = true;
        locGet.forEach(function (e) {
            if (e.id === nouveauPanier.id && e.coul === nouveauPanier.coul) {

                if (confirm()) {
                    e.quantite = parseInt(e.quantite) + parseInt(nouveauPanier.quantite);
                    nouveauPanier = e;
                    locGet.splice(locGet.indexOf(e), 1);
                } else {
                    ajout = false;
                }
            } 
        });
        if (ajout) {
            locGet.push(nouveauPanier);
            localStorage.setItem('ours', JSON.stringify(locGet));
        }
        const recupLocal = JSON.parse(localStorage.getItem('ours'));

        function ajoutPanier() {
            var recupAjoutPanier = document.getElementById('ajoutPanier');
            var ajoutPanier = document.getElementById('ajoutPanier');
            if (recupLocal.length === 0) {
                recupAjoutPanier.style.opacity = '0';
            } else {
                recupAjoutPanier.style.opacity = '1';
                ajoutPanier.textContent = recupLocal.length;
            }
        }
        ajoutPanier();
    });
});

/*class addPopUp {
    constructor(main, divContainer, para, buttonOk,buttonAnnuler) {
        this.main = document.querySelector('main');
        this.divPopUp = document.createElement('div');
        this.para = document.createElement('p');
        this.buttonOk = document.createElement('button');
        this.buttonAnnuler = document.createElement('button');
    }
    popUpAlert() {
        divPopUp.id = "divPopUpAlert";
        para.id = "paraAlert";
        para.textContent = 'Oups !!! vous devez choisir une couleur';
        buttonOk.id = 'buttonOk';
        buttonOk.className = 'plusDinfo';
        buttonOk.textContent = 'Ok j\'y remidie';

        main.appendChild(divPopUp);
        divPopUp.appendChild(paraAlert);
        divPopUp.appendChild(buttonOk);
    }
}*/

function popUp() {
    const main = document.querySelector('main');
    const divPopUp = document.createElement('div');
    divPopUp.id = "divPopUpAlert";
    const paraAlert = document.createElement('p');
    paraAlert.id = "paraAlert";
    paraAlert.textContent = 'Oups !!! vous devez choisir une couleur';
    const buttonOk = document.createElement('button');
    buttonOk.id = 'buttonOk';
    buttonOk.className = 'plusDinfo';
    buttonOk.textContent = 'Ok j\'y remidie';

    main.appendChild(divPopUp);
    divPopUp.appendChild(paraAlert);
    divPopUp.appendChild(buttonOk);
}
function popUpConfirm() {
    const main = document.querySelector('main');
    const divPopUp = document.createElement('div');
    divPopUp.id = "divPopUpConfirm";
    const paraAlert = document.createElement('p');
    paraConfirm.id = "paraConfirm";
    paraConform.textContent = "Vous aver déja " + e.quantite + " produits du même type dans votre panier. Voulez vous que nous ajoutions cette quantite aux produits ?";
    const divBoutton = document.createElement('div');
    divBoutton.id = "divBoutton";
    const buttonOkConfirrm = document.createElement('button');
    buttonOkConfirm.id = 'buttonOk';
    buttonOkConfirm.className = 'plusDinfo';
    buttonOkConfirm.textContent = 'Ok j\'y remidie';
    const buttonAnnulerConfirm = document.createElement('button');
    buttonAnnulerConfirm.id = 'buttonAnnuler';
    buttonAnnulerConfirm.className = 'plusDinfo';
    buttonAnnulerConfirm.textContent = 'Annuler';

    main.appendChild(divPopUp);
    divPopUp.appendChild(paraAlert);
    divPopUp.appendChild(divBoutton);
    divBoutton.appendChild(buttonOk);
    divBoutton.appendChild(buttonAnnuler);
}
