import { Link } from "react-router-dom";
import LogoNavBar from "../assets/LogoNavBar.svg";

export const NavBar = () => {
  return (
    <section className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={LogoNavBar} alt="logo-navbar" className="logo" />
        </Link>
      </div>
      <div className="navbar-content">
        <Link to="/" className="navbar-content-link">
          Registrarse
        </Link>
        <Link to="/registro-curso" className="navbar-content-link">
          Registrar curso
        </Link>
        <Link to="/lista-cursos" className="navbar-content-link">
          Listar cursos
        </Link>

        <Link to="/modal-curso" className="navbar-content-link">
          Modal curso
        </Link>
      </div>
    </section>
  );
};
