function get(_sRessourceUrl) {
    // instanciation de xhr
    let xhr=new XMLHttpRequest();
    
    // Ouverture de la connexion
    xhr.open('GET','http://localhost:5629'+_sRessourceUrl);
    
    // Tâche à effectuer à chaque changement de readystate (passage d'une étape de réception)
    // 1 => Open, 2=> Send, 3=> En cours de réception, 4=> Fin de réception
    xhr.onreadystatechange=function(evt){
        if(evt.currentTarget.readyState < XMLHttpRequest.DONE){return;}
        var objt = JSON.parse(evt.currentTarget.response);
        console.log(objt);
    }

    // Envoi de la requête
    xhr.send();
}

get('/postit/1')