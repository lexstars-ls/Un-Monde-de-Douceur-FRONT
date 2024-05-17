import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserCreateReviewPage = () => {


  return (
    <main>
      <h2>Créer une critique</h2>
      {/* {message && <p>{message}</p>} */}
      <form >
        <label>
          Contenu de la critique:
          <textarea
            placeholder="Contenu de la critique"
            name="content"
            value
            onChange
            required
          />
        </label>
        <button type="submit">Créer</button>
      </form>
    </main>
  );
};

export default UserCreateReviewPage;
