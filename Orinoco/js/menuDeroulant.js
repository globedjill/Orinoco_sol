var mepUl = document.getElementById('mepUl');
var pdt = document.getElementById('lesProduits');
var p = mepUl.querySelectorAll('p');

pdt.addEventListener('mouseenter', function (e) {
    e.preventDefault();
    for (var i = 0; i < p.length; i++) {
        var result = p[i];
        result.style.opacity = "1";
        result.style.animation = "nav 1s";
    }
    pdt.addEventListener('mouseout', function (e) {
        e.preventDefault();
        for (var i = 0; i < p.length; i++) {
            var result = p[i];
            result.style.opacity = "0";
            result.style.animation = "nav 1s";
            }
        });
});

