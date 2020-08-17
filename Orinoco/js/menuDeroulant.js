// creation du widget panier
    let recupLocal = [];

    if (localStorage.getItem('ours')) {
        recupLocal = JSON.parse(localStorage.getItem('ours'));
}

        var ajoutPanier = document.getElementById('ajoutPanier');
        if (recupLocal.length === 0) {
            ajoutPanier.style.opacity = '0';
        } else {
            ajoutPanier.textContent = recupLocal.length;
        }