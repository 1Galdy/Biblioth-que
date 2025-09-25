// Récupérer les éléments HTML

const formLivre = document.querySelector("#formLivre");
const tbodyLivres = document.querySelector("#tableLivres tbody");
const formUtilisateur = document.querySelector("#formUtilisateur");
const tableUtilisateurs = document.querySelector("#tableUtilisateurs tbody");
const formEmprunt = document.querySelector("#formEmprunt");
const tableEmprunts = document.querySelector("#tableEmprunts tbody");

// Fonction ajouterLivre
function ajouterLivre(titre, auteur, quantite) {
    if (!titre || !auteur || !quantite) {
        return { succes: false, message: "Tous les champs sont obligatoires" };
    }

    quantite = parseInt(quantite);
    if (isNaN(quantite) || quantite <= 0) {
        return { succes: false, message: "Quantité invalide" };
    }

    let livres = JSON.parse(localStorage.getItem("livres") || "[]");

    const livreExistant = livres.find(l => l.titre === titre && l.auteur === auteur);
    if (livreExistant) {
        livreExistant.quantite += quantite;
        localStorage.setItem("livres", JSON.stringify(livres));
        return { succes: true, message: "Quantité mise à jour pour le livre existant", livre: livreExistant };
    }

    const nouveauLivre = {
        id: Date.now(),
        titre: titre,
        auteur: auteur,
        quantite: quantite
    };

    livres.push(nouveauLivre);
    localStorage.setItem("livres", JSON.stringify(livres));

    return { succes: true, message: "Livre ajouté avec succès", livre: nouveauLivre };
}


function afficherLivres(liste = null) {
    const livres = liste || JSON.parse(localStorage.getItem("livres") || "[]");
    tbodyLivres.innerHTML = "";

    livres.forEach((livre, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${livre.titre}</td>
            <td>${livre.auteur}</td>
            <td>${livre.quantite}</td>
            <td>
                <button class="actionBtn modifier" onclick="ouvrirModalModifier(${index})">Modifier</button>
                <button class="actionBtn supprimer" onclick="supprimerLivre(${index})">Supprimer</button>
            </td>
        `;
        tbodyLivres.appendChild(tr);
    });
}

//Fonction supprimerLivre
function supprimerLivre(index) {
    let livres = JSON.parse(localStorage.getItem("livres") || "[]");
    livres.splice(index, 1);
    localStorage.setItem("livres", JSON.stringify(livres));
    alert("Livre supprimé");
    afficherLivres();
}


//Fonction modifierLivre
function modifierLivre(index) {
    const livres = JSON.parse(localStorage.getItem("livres") || "[]");
    const livre = livres[index];

    const titre = document.querySelector("#editTitre").value;
    const auteur = document.querySelector("#editAuteur").value;
    const quantite = document.querySelector("#editQuantite").value;

    if (!titre ||!auteur ||!quantite) {
        return;
    }
    const nouvelleQuantite = parseInt(quantite);
    if (isNaN(nouvelleQuantite) || nouvelleQuantite <= 0) {
        alert("Quantité invalide");
        return;
    }
    livres[index] = {
        id: livre.id,
        titre: titre,
        auteur: auteur,
        quantite: nouvelleQuantite
    };
    localStorage.setItem("livres", JSON.stringify(livres));
}

//Rechercher des livres
function rechercherLivres(criteres) {
    const livres = JSON.parse(localStorage.getItem("livres") || "[]");

    const titre = criteres.titre ? criteres.titre.toLowerCase() : null;
    const auteur = criteres.auteur ? criteres.auteur.toLowerCase() : null;

    const resultat = livres.filter(livre => {
        if (titre && !livre.titre.toLowerCase().includes(titre)) return false;
        if (auteur && !livre.auteur.toLowerCase().includes(auteur)) return false;
        return true;
    });

    return resultat;
}

// ajouter un utilisateur
function ajouterUtilisateur(nom, prenom, email) {
    if (!nom ||!prenom || !email) {
        return { succes: false, message: "Tous les champs sont obligatoires" };
    }
    const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs") || "[]");
    const utilisateurExistant = utilisateurs.find(u => u.email === email);
    if (utilisateurExistant) {
        return { succes: false, message: "Cet utilisateur existe déjà   ou cet email est déjà utilisé" };
    }
    const nouvelUtilisateur = {
        id: Date.now(),
        nom: nom,
        prenom: prenom,
        email: email
    };
    utilisateurs.push(nouvelUtilisateur);
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));

    return { succes: true, message: "Utilisateur ajouté avec succès", utilisateur: nouvelUtilisateur };
}

// Fonction supprimer un utilisateur
function supprimerUtilisateur(index) {
    let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs") || "[]");
    utilisateurs.splice(index, 1);
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
    afficherUtilisateurs();
}

// Fonction modifier un utilisateur
function modifierUtilisateur(index) {
    const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs") || "[]");
    const utilisateur = utilisateurs[index];

    const nom = document.querySelector("#editNom").value;
    const prenom = document.querySelector("#editPrenom").value;
    const email = document.querySelector("#editEmail").value;    
    if (!nom ||!prenom ||!email) {
        return;
    }
    utilisateurs[index] = {
        id: utilisateur.id,
        nom: nom,
        prenom: prenom,
        email: email
    };
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));

    afficherUtilisateurs();
}

// Afficher les utilisateurs
function afficherUtilisateurs(liste = null) {
    const utilisateurs = liste || JSON.parse(localStorage.getItem("utilisateurs") || "[]");
    tableUtilisateurs.innerHTML = "";

    utilisateurs.forEach((utilisateur, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${utilisateur.nom}</td>
            <td>${utilisateur.prenom}</td>
            <td>${utilisateur.email}</td>
            <td>
                <button class="actionBtn modifier" onclick="ouvrirModifierUtilisateur(${index})">Modifier</button>
                <button class="actionBtn supprimer" onclick="supprimerUtilisateur(${index})">Supprimer</button>
            </td>
        `;
        tableUtilisateurs.appendChild(tr);
    });
}

// Écoute du formulaire d'ajout d'utilisateur
formUtilisateur.addEventListener("submit", function(e) {
    e.preventDefault();

    const nom = document.querySelector("#nomUtilisateur").value;
    const prenom = document.querySelector("#prenomUtilisateur").value;
    const email = document.querySelector("#emailUtilisateur").value;

    const resultat = ajouterUtilisateur(nom, prenom, email);
    alert(resultat.message);

    formUtilisateur.reset();
    afficherUtilisateurs();
});


// Écoute du formulaire de modification d'utilisateur
// Écoute du formulaire
formLivre.addEventListener("submit", function(e) {
    e.preventDefault();

    const titre = document.querySelector("#titreLivre").value;
    const auteur = document.querySelector("#auteurLivre").value;
    const quantite = document.querySelector("#quantiteLivre").value;

    const resultat = ajouterLivre(titre, auteur, quantite);
    alert(resultat.message);

    formLivre.reset();
    afficherLivres();
});

// ecoute du bouton de recherche
document.querySelector("#btnRecherche").addEventListener("click", function() {
    const titre = document.querySelector("#rechercheTitre").value;
    const auteur = document.querySelector("#rechercheAuteur").value;

    const resultats = rechercherLivres({ titre, auteur });
    afficherLivres(resultats); // On va modifier afficherLivres pour accepter un tableau en paramètre
});

// Bouton pour réinitialiser le tableau
    document.querySelector("#btnReset").addEventListener("click", function() {
    afficherLivres(); // Affiche tous les livres
});


// Affiche les livres au chargement 


// Afficher Formulaire de modification livre
function ouvrirModalModifier(index) {
    const livres = JSON.parse(localStorage.getItem("livres") || "[]");
    const livre = livres[index];
    // Pré-remplir le formulaire avec les anciennes valeurs
    document.querySelector("#editIndex").value = index;
    document.querySelector("#editTitre").value = livre.titre;
    document.querySelector("#editAuteur").value = livre.auteur;
    document.querySelector("#editQuantite").value = livre.quantite;

    document.querySelector("#modalModifier").style.display = "flex";
}

// Fermer le modal de modification
document.querySelector("#btnAnnuler").addEventListener("click", function() {
    document.querySelector("#modalModifier").style.display = "none";
});

// Sauvegarder les modifications
document.querySelector("#formModifier").addEventListener("submit", function(e) {
    e.preventDefault();

    const index = document.querySelector("#editIndex").value;
    modifierLivre(index);

    afficherLivres();
    document.querySelector("#modalModifier").style.display = "none";
});

function ouvrirModifierUtilisateur(index) {
    const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs") || "[]");
    const utilisateur = utilisateurs[index];
    console.log(index);
    // Pré-remplir le formulaire avec les anciennes valeurs
    document.querySelector("#editIndexUser").value = index;
    document.querySelector("#editNom").value = utilisateur.nom;
    document.querySelector("#editPrenom").value = utilisateur.prenom;
    document.querySelector("#editEmail").value = utilisateur.email;
    document.querySelector("#modalModifierUser").style.display = "flex";
}
document.querySelector("#btnAnnulerUser").addEventListener("click", function() {
    document.querySelector("#modalModifierUser").style.display = "none";
});

document.querySelector("#formModifierUser").addEventListener("submit", function(e) {
    e.preventDefault();
    const index = document.querySelector("#editIndexUser").value;
    modifierUtilisateur(index);
    document.querySelector("#modalModifierUser").style.display = "none";
    afficherUtilisateurs();
    alert("Utilisateur modifié avec succès");
});

// Recherche d'utilisateur par email
function rechercherUserByEmail(email) {
    const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs") || "[]");
    const resultat = utilisateurs.filter(user => {
        if (email &&!user.email.toLowerCase().includes(email)) return false;
        return true;
    });
    return resultat;
}
//Reinitialiser tableau utilisateurs
document.querySelector("#btnResetUser").addEventListener("click", function() {
    afficherUtilisateurs(); // Affiche tous les utilisateurs
});
//ecoute du formulaire de recherche d'utilisateur
document.querySelector("#btnRechercheUser").addEventListener("click", function() {
    const email = document.querySelector("#rechercheEmail").value;
    const resultat = rechercherUserByEmail(email);
    afficherUtilisateurs(resultat); // On va modifier afficherUtilisateurs pour accepter un tableau en paramètre)
    console.log(resultat);
});

//Emprunter livre
function emprunterLivre(utilisateurId, livreId) {
    let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs") || "[]");
    let livres = JSON.parse(localStorage.getItem("livres") || "[]");
    let emprunts = JSON.parse(localStorage.getItem("emprunts") || "[]");

    const user = utilisateurs.find(u => u.id === utilisateurId);
    if (!user) return { succes:false, message:"Utilisateur introuvable" };

    const livre = livres.find(l => l.id === livreId);
    if (!livre) return { succes:false, message:"Livre introuvable" };

    // Vérifier si déjà emprunté par le même utilisateur
    const dejaEmprunte = emprunts.find(e => e.userId === utilisateurId && e.livreId === livreId && !e.retourne);
    if (dejaEmprunte) {
        return { succes:false, message:"Cet utilisateur a déjà emprunté ce livre" };
    }

    // Vérifier stock disponible
    if (livre.quantite <= 0) {
        return { succes:false, message:"Livre indisponible (quantité épuisée)" };
    }

    // Mettre à jour la quantité
    livre.quantite--;

    // Créer un emprunt
    const nouvelEmprunt = {
        id: Date.now(), // identifiant unique
        userId: utilisateurId,
        livreId: livreId,
        date: new Date().toISOString(),
        retourne: false
    };

    emprunts.push(nouvelEmprunt);

    // Sauvegarder dans localStorage
    localStorage.setItem("livres", JSON.stringify(livres));
    localStorage.setItem("emprunts", JSON.stringify(emprunts));

    return { succes:true, message:`Livre emprunté avec succès. Restant: ${livre.quantite}` };
}

function remplirSelects() {
    const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs") || "[]");
    const livres = JSON.parse(localStorage.getItem("livres") || "[]");

    const selectUser = document.querySelector("#selectUtilisateur");
    const selectLivre = document.querySelector("#selectLivre");

    selectUser.innerHTML = "<option value=''>-- Sélectionner un utilisateur --</option>";
    selectLivre.innerHTML = "<option value=''>-- Sélectionner un livre --</option>";

    utilisateurs.forEach(u => {
        const option = document.createElement("option");
        option.value = u.id;
        option.textContent = u.nom + " " + u.prenom;
        selectUser.appendChild(option);
    });

    livres.forEach(l => {
        if (l.quantite > 0) { // on ne propose que les livres disponibles
            const option = document.createElement("option");
            option.value = l.id;
            option.textContent = l.titre + " (" + l.quantite + ")";
            selectLivre.appendChild(option);
        }
    });
}

function afficherEmprunts() {
    let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs") || "[]");
    let livres = JSON.parse(localStorage.getItem("livres") || "[]");
    let emprunts = JSON.parse(localStorage.getItem("emprunts") || "[]");

    const tbody = document.querySelector("#tableEmprunts tbody");
    tbody.innerHTML = ""; // vider avant de recharger

    emprunts
      .filter(e => !e.retourne) // seulement ceux en cours
      .forEach(emprunt => {
        const user = utilisateurs.find(u => u.id === emprunt.userId);
        const livre = livres.find(l => l.id === emprunt.livreId);

        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${user ? user.nom + " " + user.prenom : "Utilisateur inconnu"}</td>
          <td>${livre ? livre.titre : "Livre introuvable"}</td>
          <td>
            <button onclick="retournerLivre(${emprunt.id})">♻️ Retourner</button>
          </td>
        `;

        tbody.appendChild(tr);
    });
}

document.querySelector("#formEmprunt").addEventListener("submit", function(e) {
    e.preventDefault();

    const utilisateurId = parseInt(document.querySelector("#selectUtilisateur").value);
    const livreId = parseInt(document.querySelector("#selectLivre").value);

    const resultat = emprunterLivre(utilisateurId, livreId); // fonction qu'on a définie avant

    alert(resultat.message);

    if (resultat.succes) {
        afficherEmprunts(); // mettre à jour le tableau
        remplirSelects();   // mettre à jour le select des livres (quantité)
        this.reset();       // réinitialiser le formulaire
    }
});

document.addEventListener("DOMContentLoaded", function() {
    remplirSelects();
    afficherEmprunts();
    
});
afficherLivres();
    afficherUtilisateurs();


