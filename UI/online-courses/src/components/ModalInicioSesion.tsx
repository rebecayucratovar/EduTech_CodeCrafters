import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ModalInicioSesionProps {
  onClose: () => void;
}

const ModalInicioSesion: React.FC<ModalInicioSesionProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("Por favor ingrese su nombre de usuario");
    }

    if (!password) {
      setPasswordError("Por favor ingrese su contraseña");
    }

    if (!username || !password) {
      return;
    }

    setLoading(true);

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
        setUsernameError(data.usernameError || "");
        setPasswordError(data.passwordError || "");
      }
    } catch (err) {
      setUsernameError("Error al iniciar sesión. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-inicio-sesion">
      <div className="modal-inicio-sesion-container">
        <div className="modal-inicio-sesion-content">
          <h2>Iniciar Sesión</h2>
          <div className="modal-inicio-sesion-input-container">
            <label htmlFor="username" className="modal-inicio-sesion-label">Usuario*</label>
            <input
              type="text"
              id="username"
              className={`modal-inicio-sesion-input ${usernameError && "error"}`}
              placeholder="Ingrese su nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && <p className="modal-inicio-sesion-error">{usernameError}</p>}
          </div>
          <div className="modal-inicio-sesion-input-container">
            <label htmlFor="password" className="modal-inicio-sesion-label">Contraseña*</label>
            <input
              type="password"
              id="password"
              className={`modal-inicio-sesion-input ${passwordError && "error"}`}
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="modal-inicio-sesion-error">{passwordError}</p>}
          </div>
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