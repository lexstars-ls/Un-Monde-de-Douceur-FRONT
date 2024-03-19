import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/style/LoginPage.scss";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  // variable qui va vérifier les info lors de la connexion (check du role dans le back)
  const handleLogin = async (event) => {
    event.preventDefault();

    // var pour la connexion
    const email = event.target.email.value;
    const password = event.target.password.value;

    // variable qui stock les info de mon utilisateur
    const loginData = {
      email,
      password,
    };

    // objet => JSON
    const loginDataJson = JSON.stringify(loginData);

    //requête vers l'API de type post
    // de mon email et password en json (précisions a mon api que je suis en json)

    const loginResponse = await fetch("http://localhost:3001/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: loginDataJson,
    });

    const loginResponseData = await loginResponse.json();
    const token = loginResponseData.data;

    if (token) {
      localStorage.setItem("jwt", token);
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.dataRole)
      if (decodedToken.dataRole <= 2) {
          setMessage("Vous êtes bien connecté en tant qu'admin");
          navigate("/admin");
      } else {
          setMessage("Vous êtes bien connecté");
          navigate("/");
      }
    }
};

  return (
    <main>
      <section id="sectionLogin">
        {message && <p>{message}</p>}
        <form onSubmit={handleLogin}>
          <label>
            email
            <input type="email" name="email" />
          </label>
          <label>
            password
            <input type="password" name="password" />
          </label>
          <input type="submit" />
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
