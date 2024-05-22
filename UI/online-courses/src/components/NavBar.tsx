import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoNavBar from "../assets/LogoNavBar.svg";
import ModalInicioSesion from "./ModalInicioSesion";
import ShoppingCartLogo from "../assets/cart.svg";
import { useCarro } from "../context/CarroProvider";

export const NavBar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
  const carrito = useCarro();
  const navigate = useNavigate();

  useEffect(() => {
    const tipo = localStorage.getItem("tipoUsuario");
    setTipoUsuario(tipo);
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    const tipo = localStorage.getItem("tipoUsuario");
    setTipoUsuario(tipo);
  };

  const handleLogout = () => {
    localStorage.removeItem("tipoUsuario");
    localStorage.removeItem("usuarioId");
    setTipoUsuario(null);
    navigate("/"); // Redirige a la página principal
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={LogoNavBar} alt="logo-navbar" className="logo" />
        </Link>
      </div>
      <div className="navbar-content">
        {!tipoUsuario && (
          <>
            <button onClick={handleOpenModal} className="navbar-content-link">
              Iniciar sesión
            </button>
            <Link to="/registro-estudiante" className="navbar-content-link">
              Registrarse
            </Link>
          </>
        )}
        {tipoUsuario === "usuario" && (
          <>
            <Link to="/mis-cursos" className="navbar-content-link">
              Mis Cursos
            </Link>
            <Link to="/lista-compras" className="navbar-content-link">
              <img src={ShoppingCartLogo} alt="logo-Scart" className="logosc" />
              <span className="count-shopping-cart">{carrito.carrito.length}</span>
            </Link>
            <button onClick={handleLogout} className="navbar-content-link">
              Cerrar sesión
            </button>
          </>
        )}
        {tipoUsuario === "admin" && (
          <>
            <Link to="/registro-usuario" className="navbar-content-link">
              Registrar Usuario
            </Link>
            <Link to="/registro-curso" className="navbar-content-link">
              Registrar Curso
            </Link>
            <button onClick={handleLogout} className="navbar-content-link">
              Cerrar sesión
            </button>
          </>
        )}
      </div>
      {modalOpen && <ModalInicioSesion onClose={handleCloseModal} />}
    </nav>
  );
};
