// Chargement du DOM quand bien terminé (Fonction anonyme)
window.addEventListener('load', function(evt) {
    initialisationJS('Thomas Pesquet');

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

function initialisationJS(_sPrenom) {

    let msg = document.querySelector('#jsload');
    msg.style.backgroundColor = 'green';
    // msg.innerText ='JS Ok'
    msg.innerHTML ='Le <span style="font-weight:900"> JS</span> est chargé pour '+_sPrenom
};

function formSubmited(evt) {
    evt.preventDefault();   // Pour ne pas recharger la page
    console.log('Le formulaire est validé');

    console.log(evt.target[0].value);   // Titre
    console.log(evt.target[1].value);   // Date
    console.log(evt.target[2].value);   // Heure
    console.log(evt.target[3].value);   // Commentaire

    let myForm = document.forms['editor-form']  // Autre manière de récupérer les valeurs
    //let dateFormat = moment(myForm['date'].value, 'DD MM YYYY')
    createPostit(myForm['title'].value, evt.target[1].value, evt.target[2].value, evt.target[3].value)
};

// Nouveau post-it
function createPostit(_sTitre, _sDate, sHeure, _sComment) {
    let postit = document.createElement('div');
    
    postit.classList.add('postit');  

    postit.innerHTML = 
        '<div class="postit-titre">'+_sTitre+'</div>\
        <br>\
        Date et heure : \
        <span class="datetime">'+_sDate+'</span>\
        <span class="datetime">'+sHeure+'</span>\
        <h2>Mode d emploi :</h2>'+_sComment+'\
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
        <span class="datetime">'+postitInput.datetime.substring(0,10)+'</span>\
        <span class="datetime">'+postitInput.datetime.substring(11)+'</span>\
        <h2>Mode d emploi :</h2>'+postitInput.description+'\
        <div class="suppr-postit" style="float: right;">\
        <img src="img/suppr.png"/>\
        </div>';

    let liste = document.querySelector('#list');
    liste.append(postit);

    let close = postit.querySelector('.suppr-postit img');
    close.addEventListener('click', supprPostit);
};


// Suppression du post-it
function supprPostit(evt) {
    console.log('Suppression post-it',evt);
    evt.currentTarget.parentElement.parentElement.remove();
}
