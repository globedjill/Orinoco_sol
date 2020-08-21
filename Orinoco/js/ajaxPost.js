function ajaxPost(url, callback,envoi1) {
    let request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener('readystatechange', function () {
        if (request.readyState === 4 && request.status === 201) {
            callback(request.responseText);
        } else { console.log('impossible de contacter le serveur'); }
    });
    request.send(envoi1);
};