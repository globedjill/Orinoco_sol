// creation du widget panier
ajaxGet("http://localhost:3000/api/teddies/", function (reponse) {
    var table = JSON.parse(reponse);
    const recupLocal = JSON.parse(localStorage.getItem('ours'));

    function ajoutPanier() {
        //console.log(recupLocal.length);
        var ajoutPanier = document.getElementById('ajoutPanier');
        if (recupLocal.length < 1) {
            var recupAjoutPanier = document.getElementById('ajoutPanier');
            recupAjoutPanier.style.opacity = '0';
        } else {
            ajoutPanier.textContent = recupLocal.length;
        }
    }
    ajoutPanier();
});