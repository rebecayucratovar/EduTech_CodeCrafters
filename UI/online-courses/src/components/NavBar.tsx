import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoNavBar from "../assets/LogoNavBar.svg";
import ModalInicioSesion from "./ModalInicioSesion"; // Importa el componente del modal

export const NavBar = () => {
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar si el modal está abierto o no

  const handleOpenModal = () => {
    setModalOpen(true); // Función para abrir el modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Función para cerrar el modal
  };

  return (
    <section className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={LogoNavBar} alt="logo-navbar" className="logo" />
        </Link>
      </div>
      <div className="navbar-content">
        <Link to="/registro-estudiante" className="navbar-content-link">
          Registrarse  
        </Link>
        <button onClick={handleOpenModal} className="navbar-content-link">
          Iniciar sesión  
        </button>
        {/*
        <Link to="/registro-curso" className="navbar-content-link">
          Registrar curso
        </Link>
        <Link to="/lista-cursos" className="navbar-content-link">
          Listar cursos
        </Link>
        */}
      </div>
      {modalOpen && <ModalInicioSesion onClose={handleCloseModal} />} {/* Renderiza el modal solo si modalOpen es true */}
    </section>
  );
};