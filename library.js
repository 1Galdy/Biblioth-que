
const bibliotheque = {
    livres: [],
    utilisateurs: [],
    emprunts: [],
    prochainIdLivre: 1,
    prochainIdUtilisateur: 1,
    prochainIdEmprunt: 1
};

function ajouterLivre(titre, auteur, quantite) {
    // - Vérifier que tous les paramètres sont fournis
     if (!titre || !auteur || !quantite ) {
        return { succes: false, message: "Tous les champs sont obligatoires" };
    }
    if(quantite < 0){
        return { succes : false, message:"Année invalide"}
    }
    const nouveauLivre = {
        id: bibliotheque.prochainIdLivre++,
        titre: titre,
        auteur: auteur,
        quantite: quantite,
        disponible: true
    };
    
    bibliotheque.livres.push(nouveauLivre);
    return { succes: true, message: "Livre ajouté avec succès", livre: nouveauLivre };

}


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
  
    if (!email.includes('@') || !email.includes('.')) {
        return { succes: false, message: "Email invalide" };
    }
    const utilisateurExistant = bibliotheque.utilisateurs.find(utilisateur => utilisateur.email === email);
    if (utilisateurExistant) {
        return { succes: false, message: "Cet utilisateur existe déjà" };
    }
 
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


console.log(ajouterUtilisateur("Cheikh Anta", "saadbouH.code@gmail.com", "0612345678"));
ajouterLivre("Le Petit Prince", "Antoine de Saint-Exupéry", 20, "Fiction")
ajouterLivre("1984", "George Orwell",10, "Dystopie");
ajouterLivre("Moby-Dick", "Herman Melville",15,  "Adventure");7


console.log(rechercherLivres({auteur:"George"}))
console.log(emprunterLivre(1,2))




/**
 * Permet de retourner un livre emprunté
 * @param {number} empruntId - ID de l'emprunt
 * @returns {object} Résultat de l'opération
 */
function retournerLivre(empruntId) {
    
    console.log("À implémenter : retournerLivre");
    return { succes: false, message: "Fonction à implémenter" };
}

function validerEmail(email) {
    // TODO: Implémenter la validation email
    console.log("À implémenter : validerEmail");
    return false;
}


// ===================================
// 7. DONNÉES DE TEST
// ===================================

/**
 * Initialise la bibliothèque avec des données de test
 */
function initialiserDonneesTest() {
    // TODO: Ajouter des livres, utilisateurs et emprunts de test
    console.log("À implémenter : initialiserDonneesTest");
}

// ===================================
// 8. FONCTIONNALITÉS BONUS
// ===================================

/**
 * Système de réservation de livres
 * @param {number} utilisateurId - ID de l'utilisateur
 * @param {number} livreId - ID du livre
 * @returns {object} Résultat de la réservation
 */
function reserverLivre(utilisateurId, livreId) {
    // BONUS: Implémenter le système de réservation
    console.log("BONUS à implémenter : reserverLivre");
    return { succes: false, message: "Fonction bonus à implémenter" };
}

/**
 * Système de notation des livres
 * @param {number} utilisateurId - ID de l'utilisateur
 * @param {number} livreId - ID du livre
 * @param {number} note - Note de 1 à 5
 * @param {string} commentaire - Commentaire optionnel
 * @returns {object} Résultat de la notation
 */
function noterLivre(utilisateurId, livreId, note, commentaire = "") {
    // BONUS: Implémenter le système de notation
    console.log("BONUS à implémenter : noterLivre");
    return { succes: false, message: "Fonction bonus à implémenter" };
}

// ===================================
// INSTRUCTIONS POUR L'EXERCICE
// ===================================

/*
INSTRUCTIONS :

1. Implémentez toutes les fonctions marquées "TODO"
2. Utilisez tous les concepts JavaScript vus :
   - Variables (let, const) et types de données
   - Opérateurs (arithmétiques, comparaison, logiques)
   - Conditions (if/else, switch, opérateur ternaire)
   - Boucles (for, while, for...of, forEach)
   - Fonctions (déclarations, expressions, arrow functions)

3. Respectez les bonnes pratiques :
   - Validation des paramètres d'entrée
   - Gestion des cas d'erreur
   - Code lisible et bien commenté
   - Fonctions pures quand possible

4. Testez votre code :
   - Créez des cas de test pour chaque fonction
   - Vérifiez les cas limites
   - Testez avec des données invalides

5. Fonctionnalités bonus (optionnelles) :
   - Système de réservation
   - Notation des livres
   - Interface en ligne de commande
   - Sauvegarde des données

CRITÈRES D'ÉVALUATION :
- Fonctionnalité (40%) : Toutes les fonctions marchent correctement
- Qualité du code (30%) : Code propre, lisible, bien structuré
- Gestion d'erreurs (20%) : Validation et gestion des cas d'erreur
- Innovation (10%) : Fonctionnalités bonus et créativité

BONNE CHANCE ! 🚀
*/


// Vérification

function AddLivres() {

        let titre = document.getElementById("titre").value;
        let auteur = document.getElementById("auteur").value;
        let nombrePages = parseInt(document.getElementById("quantite").value);
        
        alert(titre, auteur, nombrePages);
        ajouterLivre(titre, auteur, nombrePages);
        // ajouterUtilisateur();
        // emprunterLivre(); 
        // rechercherLivres();
}