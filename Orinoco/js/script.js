/*Formulaire*/ 
/*var valid = document.getElementById('bouton_valid_form');
var nom = document.getElementById('nom');
var nom_manquant = document.getElementById('nom_manquant');
var nom_valid = /^[a-zA-ZéèïîÉÈÎÏ][a-zéèêçîï]+([-'\s][a-zA-ZéèïîÉÈÎÏ][a-zéèêçîï]+)?/;

valid.addEventListener('click', validation);

function validation(event) {
    if (nom.validity.valueMissing) {
        event.preventDefault();
        nom_manquant.textContent = ' veuiller renseigner un NOM';
        nom_manquant.style.color = 'red';
        nom.style.backgroundColor = 'red';

    } else if (nom_valid.test(nom.value) == false) {
        event.preventDefault();
        nom_manquant.textContent = 'Veuiller renseigner un nom correct';
        nom_manquant.style.color = 'red';
        nom.style.backgroundColor = 'orange';
    } else {

    }
}*/

/*Canvas*/

var canvas = document.getElementById('canvas1');
var contexte = canvas.getContext('2d');

contexte.beginPath();
contexte.lineWidth = '1';
contexte.strokeStyle = 'red';
contexte.moveTo(100, 50);
contexte.lineTo(300, 150);
contexte.stroke();

contexte.beginPath();
contexte.lineWidth = '1';
contexte.strokeStyle = 'green';
contexte.moveTo(50, 100);
contexte.lineTo(300, 150);
contexte.stroke();

contexte.beginPath();
contexte.lineWidth = '1';
contexte.strokeStyle = 'white';
contexte.moveTo(50, 100);
contexte.lineTo(100, 50);
contexte.stroke();

contexte.beginPath();
contexte.lineWidth = '5';
contexte.strokeStyle = 'pink';
contexte.arc(75, 100, 50, 0, Math.PI);
contexte.stroke();

contexte.beginPath();
contexte.lineWidth = '5';
contexte.fillStyle = 'violet';
contexte.arc(200, 100, 50, 0, 2 * Math.PI);
contexte.fill();






