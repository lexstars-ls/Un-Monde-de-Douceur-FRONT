import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUserPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

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

    const registerResponse = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: registerDataJson,
    });

    if (registerResponse.status === 201) {
      setMessage("Vous vous êtes bien enregistré");
      navigate("/");
    } else {
      setMessage("Erreur lors de l'enregistrement");
    }
  };

  return (
    <main>
      <section>
        <h2>Créer un utilisateur</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Nom d'utilisateur:
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Mot de passe:
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label>
          <button type="submit">Créer</button>
        </form>
      </section>
    </main>
  );
};

export default CreateUserPage;