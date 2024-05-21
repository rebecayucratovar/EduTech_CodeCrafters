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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (username === "" || password === "") {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://edutech-codecrafters-dry-mountain-212.fly.dev/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Suponemos que la respuesta contiene el tipo de usuario
        const tipoUsuario = data.tipoUsuario;

        // Guardamos el tipo de usuario en localStorage
        localStorage.setItem("tipoUsuario", tipoUsuario);

        navigate("/");
        onClose();
      } else {
        // Manejo de errores específicos de la API
        setError(data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al iniciar sesión. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-inicio-sesion">
      <div className="modal-inicio-sesion-container">
        <button className="modal-inicio-sesion-btn-close" onClick={onClose}>
          <img src={Close} alt="Cerrar" />
        </button>
        <div className="modal-inicio-sesion-content">
          <h2>Iniciar Sesión</h2>
          {error && <p className="modal-inicio-sesion-error">{error}</p>}
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
            <button
              className="modal-inicio-sesion-button"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Cargando..." : "Ingresar"}
            </button>
            <button
              className="modal-inicio-sesion-button modal-inicio-sesion-button-cancel"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInicioSesion;