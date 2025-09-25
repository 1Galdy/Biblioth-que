// Structure de données principales
const bibliotheque = {
    livres: [],
    utilisateurs: [],
    emprunts: [],
    prochainIdLivre: 1,
    prochainIdUtilisateur: 1,
    prochainIdEmprunt: 1
};
let html = ``;

function ajouterLivre(titre, auteur, quantite) {
    // Vérifier que tous les champs sont renseignés
    if (!titre || !auteur || quantite === undefined || quantite === null) {
        return { succes: false, message: "Tous les champs sont obligatoires" };
    }

    if (quantite < 0) {
        return { succes: false, message: "Quantité invalide" };
    }

    // Récupérer les livres depuis le localStorage (ou créer une liste vide)
    const livresJSON = localStorage.getItem("bibliotheque");
    const livres = livresJSON ? JSON.parse(livresJSON) : [];

    // Récupérer ou initialiser l’ID suivant
    let prochainId = parseInt(localStorage.getItem("prochainIdLivre") || "1");

    // Créer le nouveau livre
    const nouveauLivre = {
        id: prochainId,
        titre: titre,
        auteur: auteur,
        quantite: Number(quantite),
        disponible: true
    };

    // Ajouter le livre à la liste
    livres.push(nouveauLivre);

    // Sauvegarder dans le localStorage
    localStorage.setItem("bibliotheque", JSON.stringify(livres));
    localStorage.setItem("prochainIdLivre", (prochainId + 1).toString());

    livreLocalStorage();

    return {
        succes: true,
        message: "Livre ajouté avec succès",
        livre: nouveauLivre
    };
}

// Test de la fonction ajouterLivre
/*console.log(ajouterLivre("Le Petit Prince", "Antoine de Saint-Exupéry", "978-3-16-148410-0", 1943, "Fiction"));
console.log(ajouterLivre("1984", "George Orwell", "978-0-452-28423-4", 1949, "Dystopie"));
console.log(ajouterLivre("Moby-Dick", "Herman Melville", "978-0-14-243724-7", 1851, "Adventure"));*/


function rechercherLivres(criteres) {
    const auteur = criteres.auteur ? String(criteres.auteur).toLowerCase() : null;
    const genre = criteres.genre ? String(criteres.genre).toLowerCase() : null;
    const titre = criteres.titre ? criteres.titre.toLowerCase() : null;

    const resultat = bibliotheque.livres.filter(function(livre) {
        if (titre && !livre.titre.toLowerCase().includes(titre)) return false;
        if (auteur && !livre.auteur.toLowerCase().includes(auteur)) return false;
        if (genre && !livre.genre.toLowerCase().includes(genre)) return false;
        return true;
    });

    return resultat;
}

function ajouterUtilisateur(nom, email, telephone) {
    // TODO: Implémenter l'ajout d'utilisateur
    // - Valider l'email (format correct)
    if (!email.includes('@') || !email.includes('.')) {
        return { succes: false, message: "Email invalide" };
    }
    const utilisateurExistant = bibliotheque.utilisateurs.find(utilisateur => utilisateur.email === email);
    if (utilisateurExistant) {
        return { succes: false, message: "Cet utilisateur existe déjà" };
    }
    // - Créer l'utilisateur avec ID unique
    const nouvelUtilisateur = {
        id: bibliotheque.prochainIdUtilisateur++,
        nom: nom,
        email: email,
        telephone: telephone
    };
    bibliotheque.prochainIdUtilisateur++;
    
    bibliotheque.utilisateurs.push(nouvelUtilisateur);
    return { succes: true, message: "Utilisateur ajouté avec succès", utilisateur: nouvelUtilisateur };
}

function emprunterLivre(utilisateurId, livreId) {
    const user = bibliotheque.utilisateurs.find(u =>u.id === utilisateurId)
    if(!user) return {succes:false, message:"Utilisateur introuvable"}
    const livre = bibliotheque.livres.find(l => l.id === livreId);
    if (livre && livre.quantite > 0) {
        livre.quantite--; // Décrémenter
        return {succes : true, message: `Livre emprunté. Quantité restante: ${livre.quantite}`};
    }
    
    return false;
}

function retournerLivre(empruntId) {
    
    console.log("À implémenter : retournerLivre");
    return { succes: false, message: "Fonction à implémenter" };
}

function validerEmail(email) {
    // TODO: Implémenter la validation email
    console.log("À implémenter : validerEmail");
    return false;
}

//--------------------------- Vérification et ajout d'un nouveau livre --------------------------------------

const button = document.getElementById('addDatas');

button.addEventListener('click', ()=>{

    const titre = document.getElementById('titre').value;
    const auteur = document.getElementById('auteur').value;
    const quantite = parseInt(document.getElementById('quantite').value);

    const resultat = ajouterLivre(titre, auteur, quantite);
    console.log(resultat);

    if(resultat){
        livreLocalStorage();
    }
})

//-------------- Récupéré et afficher les données de livre stocké en localStorage ----------------------------------

const livreLocalStorage = () => {
    const livresJSON = localStorage.getItem("bibliotheque");
    if (!livresJSON) return [];
    
    const data = JSON.parse(livresJSON);
    const arrayLivres = document.getElementById('tableauLivres');

    // Utiliser map pour créer un tableau de chaînes HTML pour chaque livre
    const htmlRows = data.map(livre => 
        // La fonction est maintenant une chaîne de caractères pour onclick
        `<tr>
            <td>${livre.titre}</td>
            <td>${livre.auteur}</td>
            <td>${livre.quantite}</td>
            <td><button class="arrayButtonDelete" onclick="deleteLivre('${livre.id}')">Retirer</button></td>
            <td><button class="arrayButtonUpdate" onclick="newForm('${livre.id}')">Modifier</button></td>
        </tr>`
    );

    // Joindre toutes les chaînes du tableau pour former le HTML final
    // et l'injecter dans le tbody (ou le tr qui sert de conteneur)
    arrayLivres.innerHTML = htmlRows.join('');
}

livreLocalStorage();

//-------------- Supprimer un livre stocké en localStorage ----------------------------------

function deleteLivre(id) {
    const livresJSON = localStorage.getItem("bibliotheque");

    if (!livresJSON) {
        alert("Aucune donnée trouvée dans le localStorage.");
        return;
    }

    const livres = JSON.parse(livresJSON);

    const livreExiste = livres.some(livre => livre.id == id);

    if (!livreExiste) {
        alert(`Aucun livre avec l'ID ${id} trouvé dans le localStorage.`);
        return;
    }

    // Supprimer uniquement le livre avec l'id donné
    const livresRestants = livres.filter(livre => livre.id != id);

    // Réécrire dans le localStorage la nouvelle liste sans le livre supprimé
    localStorage.setItem("bibliotheque", JSON.stringify(livresRestants));

    if(livresRestants){
        livreLocalStorage();
    } 
}

//-------------- Afficher un tableau normal vide ----------------------------------

(function basicArray() {
    const livresJSON = localStorage.getItem("bibliotheque");
    if (!livresJSON) return [];
    const data = JSON.parse(livresJSON);
    console.log(data[0].titre);
    const arrayLivres = document.getElementById('tableauLivres');
    
    if(!data) {
        arrayLivres.innerHTML = `<tr><td></td><td></td><td></td><td></td></tr>`;
        return;
    }
})();

//-------------- Modifier les données dans le localStorage ----------------------------------

function updateLivre(updateid, updatetitre, updateauteur, updatequantite) {
    const livresJSON = localStorage.getItem("bibliotheque");

    if (!livresJSON) {
        alert("Aucune donnée trouvée dans le localStorage.");
        return;
    }

    const livres = JSON.parse(livresJSON); // ← obligé pour pouvoir modifier l'intérieur

    const index = livres.findIndex(livre => livre.id == updateid);

    if (index === -1) {
        alert(`Aucun livre avec l'ID ${updateid} trouvé dans le localStorage.`);
        return;
    }

    // Mise à jour des données de ce livre
    livres[index] = {
        id: Number(updateid),
        titre: updatetitre,
        auteur: updateauteur,
        quantite: Number(updatequantite),
        disponible: true // ou garde l'ancien si tu préfères
    };

    // Réécriture dans le localStorage
    localStorage.setItem("bibliotheque", JSON.stringify(livres));

    // Mettre à jour l'affichage (si nécessaire)
    livreLocalStorage();
}

//-------------- Créer un formulaire pour modifier les données d'un livre ----------------------------------
let updateId;

const updateButton = document.getElementById('updateDatas');

    updateButton.addEventListener('click', ()=> {

        updateId
        const updatetitre = document.getElementById('updateTitre').value;
        const updateauteur = document.getElementById('updateAuteur').value;
        const updatequantite = document.getElementById('updateQuantite').value;

        if (!updateId || !updatetitre || !updateauteur || !updatequantite) {
            // const datas = `${updateId}, ${updatetitre}, ${updateauteur}, ${updatequantite}  `;
            alert(`Tous les champs sont obligatoires pour modifier un livre. ${datas}`);
        return;
        } else {
            updateLivre(updateId, updatetitre, updateauteur, updatequantite);
        }
    })

//-------------- Afficher le formulaire ----------------------------------
function newForm(id) {
    const form = document.getElementById('UpdateLivres');
    updateId = id;
    if (!form) return;

    form.classList.remove('none'); // Enlève la classe qui cache
    form.classList.add('show');    // Ajoute celle qui montre
}

function closeForm() {
    const form = document.getElementById('UpdateLivres');
    updateId = null; // Réinitialise l'id du livre à modifier
    if (!form) return;

    form.classList.add('none'); // Enlève la classe qui cache
    form.classList.remove('show');    // Ajoute celle qui montre
}


//------------- Gestion de l'ajout des utilisateurs ----------------------------------

const usersLocalStorage = () => {
    const livresJSON = localStorage.getItem("users");
    const arrayLivres = document.getElementById('tableauUsers');

    if (!livresJSON) {
        // Pas de données : afficher une ligne vide avec 5 colonnes (le nombre dans le <thead>)
        arrayLivres.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; font-style: italic; color: gray;">
                    Aucun livre enregistré
                </td>
            </tr>`;
        return;
    }

    const data = JSON.parse(livresJSON);

    if (!data.length) {
        // Tableau vide : même comportement que ci-dessus
        arrayLivres.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; font-style: italic; color: gray;">
                    Aucun livre enregistré
                </td>
            </tr>`;
        return;
    }

    // Si on a des données, on génère les lignes normalement
    const htmlRows = data.map(livre => 
        `<tr>
            <td>${livre.titre}</td>
            <td>${livre.auteur}</td>
            <td>${livre.quantite}</td>
            <td><button class="arrayButtonDelete" onclick="deleteLivre('${livre.id}')">Retirer</button></td>
            <td><button class="arrayButtonUpdate" onclick="newForm('${livre.id}')">Modifier</button></td>
        </tr>`
    ).join('');

    arrayLivres.innerHTML = htmlRows;
};

// Appel initial pour afficher le tableau au chargement de la page
usersLocalStorage();


//------------- Gestion de l'emprunt des livres ----------------------------------

const EmpruntsLocalStorage = () => {
    const livresJSON = localStorage.getItem("Emprunts");
    const arrayLivres = document.getElementById('tableauEmprunts');

    if (!livresJSON) {
        // Pas de données : afficher une ligne vide avec 5 colonnes (le nombre dans le <thead>)
        arrayLivres.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; font-style: italic; color: gray;">
                    Aucun livre enregistré
                </td>
            </tr>`;
        return;
    }

    const data = JSON.parse(livresJSON);

    if (!data.length) {
        // Tableau vide : même comportement que ci-dessus
        arrayLivres.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; font-style: italic; color: gray;">
                    Aucun livre enregistré
                </td>
            </tr>`;
        return;
    }

    // Si on a des données, on génère les lignes normalement
    const htmlRows = data.map(livre => 
        `<tr>
            <td>${livre.titre}</td>
            <td>${livre.auteur}</td>
            <td>${livre.quantite}</td>
            <td><button class="arrayButtonDelete" onclick="deleteLivre('${livre.id}')">Retirer</button></td>
            <td><button class="arrayButtonUpdate" onclick="newForm('${livre.id}')">Modifier</button></td>
        </tr>`
    ).join('');

    arrayLivres.innerHTML = htmlRows;
};

// Appel initial pour afficher le tableau au chargement de la page
EmpruntsLocalStorage();
