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
    input.value = "1";
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

    img.src = table.imageUrl;
    h2.textContent = table.name;
    span.textContent = table.price + " €";
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
            alert('Veiller choisir une couleur');
            return;
        }
        // je parcour mon tableau
        let ajout = true;
        locGet.forEach(function (e) {
            if (e.id === nouveauPanier.id && e.coul === nouveauPanier.coul) {
                if (confirm("Vous aver déja " + e.quantite + " produits du même type dans votre panier. Voulez vous que nous ajoutions cette quantite aux produits ?")) {
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
       
        console.log(locGet);

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

function popUp() {
    //creer element popUp  
    const creerDivPopUP = document.createElement('div');
    creerDivPopUP.id = 'popUp';
    creerDivPopUP.style.position = 'absolute';
    creerDivPopUP.style.top = "30%";
    creerDivPopUP.style.left = "20%";
    creerDivPopUP.style.width = "300px";
    creerDivPopUP.style.backgroundColor = "white";
    creerDivPopUP.style.border = "2px solid black";

    const pPopUp = document.createElement('p');
    pPopUp.textContent = "Vous aver déja " + e.quantite + " produits du meme type dans votre panier. Voulez vous que nous ajoutions cette quantite aux produits ?";

    const divRep = document.createElement('div');
    divRep.id = "row divRep";
    const buttonOk = document.createElement('button');
    buttonOk.id = 'buttonOk';
    buttonOk.textContent = 'OK'
    const buttonAnnuler = document.createElement('button');
    buttonAnnuler.id = 'buttonAnnuler';
    buttonAnnuler.textContent = 'Annuler';

    //insertion popUP windows
    main.appendChild(creerDivPopUP);
    creerDivPopUP.appendChild(pPopUp);
    creerDivPopUP.appendChild(divRep);
    divRep.appendChild(buttonOk);
    divRep.appendChild(buttonAnnuler);
}