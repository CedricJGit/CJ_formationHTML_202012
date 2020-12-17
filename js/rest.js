var BASE_URL = 'http://localhost:3131';

// Objet permettant les appels http
let Crud = function (baseurl) {

    function get(_sRessourceUrl, callback) {
        // instanciation de xhr
        let xhr=new XMLHttpRequest();
        
        // Ouverture de la connexion
        xhr.open('GET', baseurl+_sRessourceUrl);
        
        // Tâche à effectuer à chaque changement de readystate (passage d'une étape de réception)
        // 1 => Open, 2=> Send, 3=> En cours de réception, 4=> Fin de réception
        xhr.onreadystatechange = function(evt){
            if(evt.currentTarget.readyState < XMLHttpRequest.DONE){return;}
            var objt = JSON.parse(evt.currentTarget.response);
            console.log(objt);

            
            callback(objt);
        };

        // Envoi de la requête
        xhr.send();
    }

    /**
     * Création d'une ressource sur _sRessourceUrl
     * @param {uri} _sRessourceUrl chemin du post
     * @param {object} _sRessource data à envoyer
     */
    function post(_sRessourceUrl, _sRessource){
        // instanciation de xhr
        let xhr=new XMLHttpRequest();
        
        // Ouverture de la connexion
        xhr.open('POST', baseurl+_sRessourceUrl);
        
        // Spécification... 
        xhr.setRequestHeader('Content-Type','application/json');    // ...du type de contenu
        xhr.setRequestHeader('Accept','application/json');          // ... de ce qui est attendu en retour

        xhr.onreadystatechange = function(evt){
            if(xhr.readyState < 4){return;}
            
            console.log(JSON.parse(xhr.response));
        };

        // Envoi de la requête avec transformation en JSON du contenu objet
        xhr.send(JSON.stringify(_sRessource)); 
    }

    /**
     * Suppression d'une ressource sur _sRessourceUrl 
     * @param {uri} _sRessourceUrl 
     */
    function remove(_sRessourceUrl){
        // instanciation de xhr
        let xhr=new XMLHttpRequest();
        
        // Ouverture de la connexion
        xhr.open('DELETE', baseurl+_sRessourceUrl);

        xhr.onreadystatechange = function(evt){
            if(xhr.readyState < 4){return;}
            console.log(JSON.parse(xhr.response));
        };
        
        // Envoi de la requête
        xhr.send();
    }


    /**
     * Mise à jour d'une ressource sur _sRessourceUrl
     * @param {uri} _sRessourceUrl chemin du post
     * @param {object} _sRessource data à envoyer
     */
    function put(_sRessourceUrl, _sRessource){
        // instanciation de xhr
        let xhr=new XMLHttpRequest();
        
        // Ouverture de la connexion
        xhr.open('PUT', baseurl+_sRessourceUrl);
        
        // Spécification... 
        xhr.setRequestHeader('Content-Type','application/json');    // ...du type de contenu
        xhr.setRequestHeader('Accept','application/json');          // ... de ce qui est attendu en retour

        xhr.onreadystatechange = function(evt){
            if(xhr.readyState < 4){return;}
            
            console.log(JSON.parse(xhr.response));
        };

        // Envoi de la requête avec transformation en JSON du contenu objet
        xhr.send(JSON.stringify(_sRessource)); 
    }

    // pour les accès extérieurs de l'instance de ces fonctions
    this.recup=get;
    this.creer=post;
    this.maj=put;
    this.suppr=remove;
};

//let crud = new Crud(BASE_URL);