// Chargement du DOM quand bien terminé (Fonction anonyme)
addEventListener('load', function(evt) {
    initialisationJS('Thomas Pesquet');

    // Accrochage d'un écouteur d'event sur une balise
    document.querySelector('form').addEventListener('submit', formSubmited);

    // Chargement initial des post-it
    (new Crud(BASE_URL)).recup('/postit', function(mesPostIt){
        console.log('J\'ai fini de recevoir tous mes post-it, voici la liste :', mesPostIt);
        
        mesPostIt.forEach(function(postit) {
            console.log(postit);
            //createPostit(postit.titre, postit.datetime.substring(0,10), postit.datetime.substring(11), postit.description);
            createPostitByObject(postit);
        });
    });
});

function initialisationJS(sPrenom) {

    let msg = document.querySelector('#jsload');
    msg.style.backgroundColor = 'green';
    // msg.innerText ='JS Ok'
    msg.innerHTML ='Le <span style="font-weight:900"> JS</span> est chargé pour '+sPrenom
};

function formSubmited(evt) {
    evt.preventDefault();   // Pour ne pas recharger la page
    console.log('Le formulaire est validé');

    let myForm = document.forms['editor-form']  // Autre manière de récupérer les valeurs
    
    // Construction de l'objet à envoyer au rest
    let postit = { titre:myForm["title"].value, 
                    datetime:myForm["date"].value+"T"+myForm["time"].value,
                    description:myForm["description"].value
                };

    if (myForm['id'].value !== '') {
        postit.id = myForm['id'].value;
    };

    console.log(postit);

    // Appel rest pour l'ajout dans la liste et recup de l'id
    (new Crud(BASE_URL)).envoiRessource('/postit', postit, function(objSaved) {
        if (undefined !== postit.id) 
        {
            // Supprime préalablement l'ancien postit de même id
            document.querySelector('#postit-'+postit.id).remove();
        }
        createPostitByObject(objSaved);
    });

    // Appel rest pour l'ajout dans la liste et recup de l'id
    //(new Crud(BASE_URL)).creer('/postit', postit, function(objSaved) {
    //   createPostitByObject(objSaved);
    //});
    
    // createPostit(myForm['title'].value, evt.target[1].value, evt.target[2].value, evt.target[3].value)
};

// Nouveau post-it
function createPostit(sTitre, sDate, sHeure, sComment) {
    let postit = document.createElement('div');
    
    postit.classList.add('postit');  

    postit.innerHTML = 
        '<div class="postit-titre">'+sTitre+'</div>\
        <br>\
        Date et heure : \
        <span class="datetime">'+sDate+'</span>\
        <span class="datetime">'+sHeure+'</span>\
        <h2>Description :</h2>'+sComment+'\
        <div>\
            <input type="button" value="Supprimer" img="img/suppr" class="suppr-postit">\
        </div>\
        <div class="suppr-postit" style="float: right;">\
        <img src="img/suppr.png"/>\
        </div>';

    let liste = document.querySelector('#list');
    liste.append(postit);

    let close = postit.querySelector('.suppr-postit img');
    close.addEventListener('click', supprPostit);
};

/**
 * Nouveau post-it avec ajout dans la balise div#list par le biais d'un objet postit complet
 * @param {object} postit  objet postit
 */
function createPostitByObject(postitInput) {
    let postit = document.createElement('div');
    
    // Créationde l'id de balise en liens avec l'id du postit dans le rest pour faciliter la suppression
    postit.id = 'postit-'+postitInput.id;

    postit.classList.add('postit');  

    postit.innerHTML = 
        '<div class="postit-titre">'+postitInput.titre+'</div>\
        <br>\
        Date et heure : \
        <span class="datetime postit-date">'+postitInput.datetime.substring(0,10)+'</span>\
        <span class="datetime postit-heure">'+postitInput.datetime.substring(11)+'</span>\
        <h2>Mode d emploi :</h2>\
        <div class="postit-descr">'+postitInput.description+'</div>\
        <div class="suppr-postit" style="float: right;">\
            <img src="img/suppr.png"/>\
        </div>';

    let liste = document.querySelector('#list');
    liste.append(postit);

    let close = postit.querySelector('.suppr-postit img');
    close.addEventListener('click', supprPostit);

    postit.addEventListener('dblclick', majSelectedPostit);
};


// Suppression du post-it
function supprPostit(evt) {
    evt.stopPropagation(); 

    console.log('Suppression post-it',evt);

    var elem = evt.currentTarget.parentElement.parentElement;
    let domPostitId = elem.id.substring(7);
    (new Crud(BASE_URL)).suppr('/postit/'+domPostitId, function() {
        //console.log('Suppression post-it', evt.path[2]);
        //evt.path[2].remove();
        elem.remove();
    });
};


function majSelectedPostit(evt){
    console.log('j\'double-cliqué sur un post-it', evt);

    // Récupérer la balise postit
    var domPostitId = evt.currentTarget;
    console.log(
        domPostitId.id.substring(7),
        domPostitId.querySelector('.postit-titre').innerText,
        domPostitId.querySelector('.postit-date').innerText,
        domPostitId.querySelector('.postit-heure').innerText,
        domPostitId.querySelector('.postit-descr').innerText
    );
    
    document.forms["editor-form"]["id"].value = domPostitId.id.substring(7);
    document.forms["editor-form"]["title"].value = domPostitId.querySelector('.postit-titre').innerText;
    document.forms["editor-form"]["date"].value = domPostitId.querySelector('.postit-date').innerText;
    document.forms["editor-form"]["time"].value = domPostitId.querySelector('.postit-heure').innerText;
    document.forms["editor-form"]["description"].value = domPostitId.querySelector('.postit-descr').innerText;
};