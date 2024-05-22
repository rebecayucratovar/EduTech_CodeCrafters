import { useState } from "react";
import { Link } from "react-router-dom";
import LogoNavBar from "../assets/LogoNavBar.svg";
import ModalInicioSesion from "./ModalInicioSesion";
import ShoppingCartLogo from "../assets/cart.svg";
import { useCarro } from "../context/CarroProvider";

export const NavBar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const carrito = useCarro();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={LogoNavBar} alt="logo-navbar" className="logo" />
        </Link>
      </div>
      <div className="navbar-content">
        {/* <Link to="/mis-cursos" className="navbar-content-link">
          Mis Cursos
        </Link>
        <Link to="/registro-instructor" className="navbar-content-link">
          Registrar Usuario
        </Link> */}
        <Link to="/registro-estudiante" className="navbar-content-link">
          Registrarse
        </Link>
        {/* <Link to="/registro-curso" className="navbar-content-link">
          Registrar Curso
        </Link> */}
        <button onClick={handleOpenModal} className="navbar-content-link">
          Iniciar sesión
        </button>
        {/* <Link to="/lista-compras" className="navbar-content-link">
          <img src={ShoppingCartLogo} alt="logo-Scart" className="logosc" />
          <span className="count-shopping-cart">{carrito.carrito.length}</span>
        </Link> */}
      </div>
      {modalOpen && <ModalInicioSesion onClose={handleCloseModal} />}
    </nav>
  );
};
