import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoNavBar from "../assets/LogoNavBar.svg";
import ModalInicioSesion from "./ModalInicioSesion";

export const NavBar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTipoUsuario = localStorage.getItem("tipoUsuario");
    setTipoUsuario(storedTipoUsuario);
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    const storedTipoUsuario = localStorage.getItem("tipoUsuario");
    setTipoUsuario(storedTipoUsuario);
  };

  const handleLogout = () => {
    localStorage.removeItem("tipoUsuario");
    setTipoUsuario(null);
    navigate("/"); // Redirige al usuario a la página principal después de cerrar sesión
  };

  return (
    <section className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={LogoNavBar} alt="logo-navbar" className="logo" />
        </Link>
      </div>
      <div className="navbar-content">
        {tipoUsuario ? (
          <>
            {tipoUsuario === "estudiante" && (
              <>
                <Link to="/mis-cursos" className="navbar-content-link">
                  Mis Cursos
                </Link>
              </>
            )}
            {tipoUsuario === "supervisor" && (
              <>
                <Link to="/registro-usuarios" className="navbar-content-link">
                  Registrar Usuario
                </Link>
                <Link to="/registro-curso" className="navbar-content-link">
                  Registrar Curso
                </Link>
              </>
            )}
            <button onClick={handleLogout} className="navbar-content-link">
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/registro-estudiante" className="navbar-content-link">
              Registrarse
            </Link>
            <button onClick={handleOpenModal} className="navbar-content-link">
              Iniciar sesión
            </button>
          </>
        )}
      </div>
      {modalOpen && <ModalInicioSesion onClose={handleCloseModal} />}
    </section>
  );
};
