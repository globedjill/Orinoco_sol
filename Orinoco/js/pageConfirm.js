let recupStorage = JSON.parse(localStorage.getItem('retour'));
console.log(recupStorage);
console.log(recupStorage.orderId);
const main = document.querySelector('main');
main.id = 'mainPageConfirm';
main.className = 'column';
const h2 = document.createElement('h2');
h2.id = 'h2PageConfirm';
h2.textContent = 'Confirmation de commande';
const h3 = document.createElement('h3');
h3.id = 'h3PageConfirm';
h3.textContent = "N° de commande : ";
const idOrder = document.createElement('span');
idOrder.id = 'idOrder';
idOrder.textContent = recupStorage.orderId;
const divRecap = document.createElement('div');
divRecap.id = 'divRecap';
divRecap.className = 'column';
const divRemerciement = document.createElement('div');
divRemerciement.id = 'divRemerciement';
const spanNom = document.createElement('span');
spanNom.id = 'spanNom';
spanNom.textContent = recupStorage.contact.firstName;
const remerciement = document.createElement('p');
remerciement.id = 'remerciement';
remerciement.textContent = 'Merci ';
const remerciement2 = document.createElement('p');
remerciement2.id = 'remerciement2';
remerciement2.textContent = " votre commande à bien été enregistrée.";
const divCommande = document.createElement('div');
divCommande.id = 'divCommande';
const titreRecap = document.createElement('h4');
titreRecap.id = 'h4';
titreRecap.textContent = 'Récapitulatif commande';
const paraNbArticle = document.createElement('p');
paraNbArticle.id = 'paraNbArticle';

/* fonction orhographe nombre d'article */
if (recupStorage.products.length === 1) {
    paraNbArticle.innerHTML = "Vous avez commander <span id='nbArticle'>" + recupStorage.products.length +"</span> article.";
} else {
    paraNbArticle.innerHTML = "Vous avez commander <span id='nbArticle'>" + recupStorage.products.length + "</span> articles.";
}
const montantTotalCommande = document.createElement('p');
montantTotalCommande.id = 'montantTotalCommande';
montantTotalCommande.innerHTML = 'Pour un montant Total de <span id="total">' + localStorage.total + '</span>';

/* creation d'un page defil */
const divPageDefil = document.createElement('div');
divPageDefil.id = 'divPageDefil';
divPageDefil.className = 'row';
    /* Premier paragraphe */
const divParaOrderSend = document.createElement('div');
divParaOrderSend.id = 'divParaOrderSend';
divParaOrderSend.className = 'carousel';
const paraCommandeEnvoye = document.createElement('para');
paraCommandeEnvoye.id = 'paraCommandeEnvoyé';
paraCommandeEnvoye.textContent = 'Lorsque votre commande sera envoyé,vous recevrez un mail ou sms pour pouvoir recupérer votre commande selon le choix d\'expedition.';
    /* Second paragraphe */
const divParaQuestion = document.createElement('div');
divParaQuestion.id = 'divParaQuestion';
divParaQuestion.className = 'carousel'; 
const paraQuestion = document.createElement('p');
paraQuestion.id = 'paraQuestion';
paraQuestion.textContent = 'Pour toute question concernant le suivi de votre commande, vos garanties et votre droit de retractation, consulter nos pages d\'aides en ligne ou envoyer un mail en ';
const lienQuestion = document.createElement('a');
lienQuestion.id = 'lienQuestion';
lienQuestion.href = 'contact.html';
lienQuestion.textContent = 'cliquant ici';

main.appendChild(h2);
main.appendChild(h3);
h3.appendChild(idOrder);
main.appendChild(divRecap);
divRecap.appendChild(divRemerciement);
divRemerciement.appendChild(remerciement);
divRemerciement.appendChild(spanNom);
divRemerciement.appendChild(remerciement2);
divRecap.appendChild(divCommande);
divCommande.appendChild(paraNbArticle);
divCommande.appendChild(montantTotalCommande);
main.appendChild(divPageDefil);
divPageDefil.appendChild(divParaOrderSend);
divParaOrderSend.appendChild(paraCommandeEnvoye);
divPageDefil.appendChild(divParaQuestion);
divParaQuestion.appendChild(paraQuestion);
divParaQuestion.appendChild(lienQuestion);

localStorage.clear();

/*defilement des articles*/
var slideIndex = 0;

function diapo() {
    const recupParaDiv = divPageDefil.querySelectorAll('div');

    for (var i = 0; i < recupParaDiv.length; i++) {
        recupParaDiv[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > recupParaDiv.length) {
        slideIndex = 1;
    }
    recupParaDiv[slideIndex - 1].style.display = "block";
    setTimeout(diapo, 5000);
};
diapo();