var BASE_URL = 'http://localhost:3131';

// Objet permettant les appels http
let Crud = function (baseurl) {

    function _get(sRessourceUrl, callback) {
        // instanciation de xhr
        let xhr=new XMLHttpRequest();
        
        // Ouverture de la connexion
        xhr.open('GET', baseurl+sRessourceUrl);
        
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
     * @param {uri} sRessourceUrl chemin du post
     * @param {object} sRessource data à envoyer
     * @param {function} callback Fonction de callback avec injection de retour
     */
    function _post(sRessourceUrl, sRessource, callback){
        // Instanciation de xhr
        let xhr=new XMLHttpRequest();
        
        // Ouverture de la connexion
        xhr.open('POST', baseurl + sRessourceUrl);
        
        // Spécification... 
        xhr.setRequestHeader('Content-Type','application/json');    // ...du type de contenu
        xhr.setRequestHeader('Accept','application/json');          // ... de ce qui est attendu en retour

        xhr.onreadystatechange = function(evt){
            if (xhr.readyState < 4 || xhr.status != 201) { return; }
            console.log(JSON.parse(xhr.response));
            callback(JSON.parse(xhr.response));
        };

        // Envoi de la requête avec transformation en JSON du contenu objet
        xhr.send(JSON.stringify(sRessource)); 
    }

    /**
     * Suppression d'une ressource sur _sRessourceUrl 
     * @param {uri} sRessourceUrl 
     */
    function _remove(sRessourceUrl, callback){
        // instanciation de xhr
        let xhr=new XMLHttpRequest();
        
        // Ouverture de la connexion
        xhr.open('DELETE', baseurl+sRessourceUrl);

        xhr.onreadystatechange = function(evt) {
            if(xhr.readyState < 4 || xhr.status != 200) { return; }
            //console.log(JSON.parse(xhr.response));
            callback();
        };
        
        // Envoi de la requête
        xhr.send();
    }


    /**
     * Mise à jour d'une ressource sur _sRessourceUrl
     * @param {uri} sRessourceUrl chemin du post
     * @param {object} sRessource data à envoyer
     */
    function _put(sRessourceUrl, sRessource, callback){
        // instanciation de xhr
        let xhr=new XMLHttpRequest();
        
        // Ouverture de la connexion
        xhr.open('PUT', baseurl+sRessourceUrl);
        
        // Spécification... 
        xhr.setRequestHeader('Content-Type','application/json');    // ...du type de contenu
        xhr.setRequestHeader('Accept','application/json');          // ... de ce qui est attendu en retour

        xhr.onreadystatechange = function(evt){
            if (xhr.readyState < 4 || xhr.status !== 200) { return; }
            
            //console.log(JSON.parse(xhr.response));
            callback(JSON.parse(xhr.response));
        };

        // Envoi de la requête avec transformation en JSON du contenu objet
        xhr.send(JSON.stringify(sRessource)); 
    }

    // pour les accès extérieurs de l'instance de ces fonctions
    this.recup=_get;
    this.creer=_post;
    this.maj=_put;
    this.suppr=_remove;

    // Gestion d'envoi au serveur soit PUT (si Id présent), soit POST (si pas d'Id dans la ressource)
    this.envoiRessource = function(ressourceUrl, ressource, callback) 
    {
        if (undefined !== ressource.id) 
        {
            _put(ressourceUrl+'/'+ressource.id, ressource, callback);
        } 
        else 
        {
            _post(ressourceUrl, ressource, callback);
        }
    };
};

//let crud = new Crud(BASE_URL);