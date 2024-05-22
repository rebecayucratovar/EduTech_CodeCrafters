import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoNavBar from "../assets/LogoNavBar.svg";
import { useCarro } from "../context/CarroProvider";
import ModalInicioSesion from "./ModalInicioSesion"; // Importar el componente ModalInicioSesion
import ShoppingCartLogo from "../assets/cart.svg";

export const NavBar = () => {
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null); // Estado para el tipo de usuario
  const [usuarioId, setUsuarioId] = useState<string | null>(null); // Estado para usuarioId
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visualización del modal
  const navigate = useNavigate();
  const carrito = useCarro();

  useEffect(() => {
    // Verificar si hay datos de usuario en localStorage al cargar el componente
    const tipo = localStorage.getItem("tipoUsuario");
    const id = localStorage.getItem("usuarioId");
    setTipoUsuario(tipo);
    setUsuarioId(id);
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleLogout = () => {
    // Borrar los datos del localStorage y volver al estado inicial
    localStorage.removeItem("tipoUsuario");
    localStorage.removeItem("usuarioId");
    setTipoUsuario(null);
    navigate("/");
    window.location.reload(); // Recargar la página para actualizar el estado del NavBar
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={LogoNavBar} alt="logo-navbar" className="logo" />
        </Link>
      </div>
      <div className="navbar-content">
        {!tipoUsuario && ( // Mostrar solo si el usuario no está autenticado
          <>
            <button onClick={handleOpenModal} className="navbar-content-link">
              Iniciar sesión
            </button>
            <Link to="/registro-estudiante" className="navbar-content-link">
              Registrarse
            </Link>
          </>
        )}
        {tipoUsuario && ( // Mostrar solo si hay un usuario autenticado
          <>
            <button onClick={handleLogout} className="navbar-content-link">
              Cerrar sesión
            </button>
            {tipoUsuario === "ESTUDIANTE" && ( // M ostrar solo si el tipo de usuario es ESTUDIANTE
              <>
                <Link to="/mis-cursos" className="navbar-content-link">
                  Mis cursos
                </Link>
                <Link to="/lista-compras">
                  <img src={ShoppingCartLogo} alt="logo-Scart" className="logosc" />
                  <span className="count-shopping-cart">{carrito.carrito.length}</span>
                </Link>
              </>
            )}
            {tipoUsuario === "ADMINISTRADOR" && ( // Mostrar solo si el tipo de usuario es ADMINISTRADOR
              <>
                <Link to="/registro-curso" className="navbar-content-link">
                  Registrar curso
                </Link>
                <Link to="/registro-instructor" className="navbar-content-link">
                  Registrar usuario
                </Link>
              </>
            )}
          </>
        )}
      </div>
      {showModal && <ModalInicioSesion onClose={handleCloseModal} />} {/* Mostrar el modal si showModal es true */}
    </nav>
  );
};