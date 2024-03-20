// import { useState } from 'react';
// import { useParams } from 'react-router-dom';


function UserPage() {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');


    // const handleUpdateUser = () => {
    //     // Envoi d'une requête PUT à l'API pour mettre à jour l'utilisateur
    //     fetch(`http://localhost:3001/api/users/${userId}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json' // Définition de l'en-tête pour indiquer que les données sont au format JSON
    //         },
    //         body: JSON.stringify({ username, password }) // Conversion des données en format JSON
    //     })
    //     .then(response => {
    //         if (!response.ok) { // Vérification si la réponse est un succès (status code 200)
    //             throw new Error('Failed to update user.'); // Lancer une erreur si la mise à jour échoue
    //         }
    //         return response.json(); // Conversion de la réponse en JSON
    //     })
    //     .then(data => {
    //         console.log(data); // Traitement de la réponse
    //         // Traiter la réponse comme nécessaire
    //     })
    //     .catch(error => {
    //         console.error(error); // Gestion des erreurs
    //         // Traiter les erreurs
    //     });
    // };

    // const handleDeleteUser = () => {
    //     // Envoi d'une requête DELETE à l'API pour supprimer l'utilisateur
    //     fetch(`/api/users/${userId}`, {
    //         method: 'DELETE' // Utilisation de la méthode DELETE pour supprimer l'utilisateur
    //     })
    //     .then(response => {
    //         if (!response.ok) { // Vérification si la réponse est un succès (status code 200)
    //             throw new Error('Failed to delete user.'); // Lancer une erreur si la suppression échoue
    //         }
    //         return response.json(); // Conversion de la réponse en JSON
    //     })
    //     .then(data => {
    //         console.log(data); // Traitement de la réponse
    //         // Traiter la réponse comme nécessaire
    //     })
    //     .catch(error => {
    //         console.error(error); // Gestion des erreurs
    //         // Traiter les erreurs
    //     });
    // };

    // return (
    //     <div>
    //         <h1>Profil Utilisateur</h1>
    //         <label>Nouveau Nom d'Utilisateur:</label>
    //         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    //         <label>Nouveau Mot de Passe:</label>
    //         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //         <button onClick={handleUpdateUser}>Mettre à Jour</button>
    //         <button onClick={handleDeleteUser}>Supprimer le Compte</button>
    //     </div>
    // );
}

export default UserPage;

