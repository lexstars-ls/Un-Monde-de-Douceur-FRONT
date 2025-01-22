import { useState, useEffect } from "react";

const AdminUserPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [users, setUsers] = useState([]);  // Nouveau state pour les utilisateurs
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fonction pour récupérer tous les utilisateurs
  const fetchUsers = async () => {
    const storedToken = localStorage.getItem("jwt");
    try {
      const response = await fetch("http://localhost:3001/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des utilisateurs");
      }
      const data = await response.json();
      setUsers(data);  // Mettre à jour la liste des utilisateurs
    } catch (error) {
      setError("Erreur lors de la récupération des utilisateurs");
    }
  };

  useEffect(() => {
    fetchUsers();  // Charger les utilisateurs au démarrage de la page
  }, []);

  // Fonction pour supprimer un utilisateur
  const deleteUser = async (userId) => {
    const storedToken = localStorage.getItem("jwt");
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      if (response.ok) {
        setMessage("Utilisateur supprimé avec succès");
        fetchUsers();  // Recharger la liste des utilisateurs après suppression
      } else {
        setMessage("Erreur lors de la suppression de l'utilisateur");
      }
    } catch (error) {
      setMessage("Erreur lors de la requête : " + error.message);
    }
  };
// function pour créer un nouvelle admin lorsque l'utilisateur ap sur le bouton
// En récupérant les différents champ de mes input => body de la req

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password } = formData;

    const registerData = {
      username: username,
      email: email,
      password: password,
      RoleId: 3,
    };
    const registerDataJson = JSON.stringify(registerData);
    const storedToken = localStorage.getItem("jwt");

    try {
      const registerResponse = await fetch("http://localhost:3001/api/users/newAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: registerDataJson,
      });

      const responseData = await registerResponse.json();

      if (registerResponse.status === 201) {
        setMessage("nouveau compte admin créé");
      } else {
        setMessage(responseData.message || "Erreur lors de la création du nouvel admin");
      }
    } catch (error) {
      setMessage("Erreur lors de la requête : " + error.message);
    }

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <main>
      <section>
        <h2>Créer un Admin</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Nom d'utilisateur:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              placeholder="...@gmail.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Mot de passe:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Créer</button>
        </form>
      </section>

      <section>
        <h2>Liste des utilisateurs</h2>
        {error && <p>{error}</p>}
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} ({user.email}) 
              <button onClick={() => deleteUser(user.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default AdminUserPage;
