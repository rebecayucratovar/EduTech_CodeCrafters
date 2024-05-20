import React, { useState } from "react";
import Close from "../assets/icons/Close.svg";
import { useNavigate } from "react-router-dom";

interface ModalInicioSesionProps {
  onClose: () => void;
}

const ModalInicioSesion: React.FC<ModalInicioSesionProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Usuario:", username);
    console.log("Contraseña:", password);
    navigate("/");
    onClose(); // Cierra el modal después de iniciar sesión
  };

  return (
    <div className="modal-inicio-sesion">
      <div className="modal-inicio-sesion-container">
        <button className="modal-inicio-sesion-btn-close" onClick={onClose}>
          <img src={Close} alt="Cerrar" />
        </button>
        <div className="modal-inicio-sesion-content">
          <h2>Iniciar Sesión</h2>
          <input
            type="text"
            className="modal-inicio-sesion-input"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="modal-inicio-sesion-input"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="modal-inicio-sesion-button-container">
            <button className="modal-inicio-sesion-button" onClick={handleLogin}>
              Ingresar
            </button>
            <button className="modal-inicio-sesion-button modal-inicio-sesion-button-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInicioSesion;