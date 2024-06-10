import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "../../assets/style/Footer.scss";

const Footer = () => {


  return (
    <footer>
      <section id="container-footer">
        <div className="social-links">
          <a
            href="https://www.facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://www.instagram.com/un.monde.de.douceur/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <h4>Copyright © 2024 Monde De Douceur - Tous droits réservés</h4>
      </section>
    </footer>
  );
};

export default Footer;
