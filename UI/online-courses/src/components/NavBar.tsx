import { Link } from "react-router-dom";
import LogoNavBar from "../assets/LogoNavBar.svg";

export const NavBar = () => {
  return (
    <section className="navbar">
      <img src={LogoNavBar} alt="logo-navbar" />
      <div className="navbar-content">
        <Link to="/" className="navbar-content-link">
          Home
        </Link>

        <Link to="/registro-instructor" className="navbar-content-link">
          Registrarse
        </Link>

        <Link to="/registro-curso" className="navbar-content-link">
          Registrar curso
        </Link>

        <Link to="/lista-cursos" className="navbar-content-link">
          Lista cursos
        </Link>
      </div>
    </section>
  );
};
