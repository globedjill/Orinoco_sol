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
    bouttonAjouterAuPanier.id = "bouttonAjouterAu Panier";
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

    //affichage des couleurs pour chaque ours
    for (var i = 0; i < table.colors.length; i++) {
        var creer = document.createElement('option');
        creer.textContent = table.colors[i];
        select.appendChild(creer);
    }

    //preparation au stockage des ours dans le storage
    var locGet =[];
    if (localStorage.getItem('ours')) {
        locGet = JSON.parse(localStorage.getItem('ours'));
    }

    /*au clic sur le boutton ajouter au panier je crée mon ours et je sauvegarde dans le storage*/
    bouttonAjouterAuPanier.addEventListener('click', function (e) {

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

        //popup alert si la couleur et pas selectionner 
        if (nouveauPanier.coul === '--Choisir la couleur--') {
            popUp();
            buttonOk.addEventListener('click', function () {
                divPopUpAlert.remove(divPopUpAlert);
            });
            return;
        }
        let ajout = true;
        locGet.forEach(function (e) {
            //si mon ours et deja dans mon panier j'ajoute ou pas la quantite dans mon panier 
            if (e.id === nouveauPanier.id && e.coul === nouveauPanier.coul) {
                ajout = false;
                popUpConfirm();
                paraConfirm.textContent = "Vous avez déja " + e.quantite + " produits du même type dans votre panier. Voulez vous que nous ajoutions cette quantitée aux produits ? ";
                document.getElementById('buttonOkConfirm').addEventListener('click', function () {
                    e.quantite = parseInt(e.quantite) + parseInt(nouveauPanier.quantite);
                    nouveauPanier = e;
                    localStorage.setItem('ours', JSON.stringify(locGet));
                    divPopUpConfirm.remove(divPopUpConfirm);
                });
                document.getElementById('buttonAnnulerConfirm').addEventListener('click', function () {
                    divPopUpConfirm.remove(divPopUpConfirm);
                    ajout = false;
                });
            }
        });
        //j'ajoute mon ours dans mon panier et dans le local  
        if (ajout) {
            locGet.push(nouveauPanier);
            localStorage.setItem('ours', JSON.stringify(locGet));
            //permet de scale la quantite panier lors de l'ajout 
            function scale() {
                const recupAjoutPanier = document.getElementById('ajoutPanier');
                recupAjoutPanier.style.animationDuration = '500ms';
                recupAjoutPanier.style.animationName = 'panier';
                setTimeout(function () {
                    recupAjoutPanier.style.animationDuration = '0';
                    recupAjoutPanier.style.animationName = 'none';
                }, 500);
            }
            scale();
        }
        const recupLocal = JSON.parse(localStorage.getItem('ours'));

      
        //j'affiche ou pas la quantite dans mon panier
        function ajoutPanier() {
            const recupAjoutPanier = document.getElementById('ajoutPanier');
            if (recupLocal.length === 0) {
                recupAjoutPanier.style.opacity = '0';
            } else {
                recupAjoutPanier.style.opacity = '1';
                recupAjoutPanier.textContent = recupLocal.length;
            }
        }
        ajoutPanier();
    });
});


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
    buttonOk.textContent = 'Ok j\'y remedie';

    main.appendChild(divPopUp);
    divPopUp.appendChild(paraAlert);
    divPopUp.appendChild(buttonOk);
}
function popUpConfirm() {
    const main = document.querySelector('main');
    const divPopUp = document.createElement('div');
    divPopUp.id = "divPopUpConfirm";
    const paraConfirm = document.createElement('p');
    paraConfirm.id = "paraConfirm";
    paraConfirm.textContent = "";
    const divBoutton = document.createElement('div');
    divBoutton.id = "divBoutton";
    const buttonOkConfirm = document.createElement('button');
    buttonOkConfirm.id = 'buttonOkConfirm';
    buttonOkConfirm.className = 'plusDinfo';
    buttonOkConfirm.textContent = 'Oui bien sur';
    const buttonAnnulerConfirm = document.createElement('button');
    buttonAnnulerConfirm.id = 'buttonAnnulerConfirm';
    buttonAnnulerConfirm.className = 'plusDinfo';
    buttonAnnulerConfirm.textContent = 'Oh que non';

    main.appendChild(divPopUp);
    divPopUp.appendChild(paraConfirm);
    divPopUp.appendChild(divBoutton);
    divBoutton.appendChild(buttonOkConfirm);
    divBoutton.appendChild(buttonAnnulerConfirm);
}