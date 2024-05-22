import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ModalInicioSesionProps {
  onClose: () => void;
}

const ModalInicioSesion: React.FC<ModalInicioSesionProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setPassword] = useState("");
  const [nombreUsuarioError, setNombreUsuarioError] = useState("");
  const [contraseñaError, setContraseñaError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setNombreUsuarioError("");
    setContraseñaError("");

    if (!nombreUsuario) {
      setNombreUsuarioError("Por favor ingrese su nombre de usuario");
    }

    if (!contraseña) {
      setContraseñaError("Por favor ingrese su contraseña");
    }

    if (!nombreUsuario || !contraseña) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://edutech-codecrafters-sparkling-smoke-4076.fly.dev/v1/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreUsuario, contraseña }),
      });

      const data = await response.json();

      if (response.ok) {
        // Suponemos que la respuesta contiene el tipo de usuario
        const tipoUsuario = data.tipoUsuario;
        const usuarioId = data.usuarioId;


        // Guardamos el tipo de usuario en localStorage
        localStorage.setItem("tipoUsuario", tipoUsuario);
        localStorage.setItem("usuarioId", usuarioId);


        navigate("/");
        onClose();
      } else {
        // Manejo de errores específicos de la API
        setNombreUsuarioError(data.usernameError || "");
        setContraseñaError(data.passwordError || "");
      }
    } catch (err) {
      setNombreUsuarioError("Error al iniciar sesión. Inténtalo de nuevo más tarde.");
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
              className={`modal-inicio-sesion-input ${nombreUsuarioError && "error"}`}
              placeholder="Ingrese su nombre de usuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
            />
            {nombreUsuarioError && <p className="modal-inicio-sesion-error">{nombreUsuarioError}</p>}
          </div>
          <div className="modal-inicio-sesion-input-container">
            <label htmlFor="password" className="modal-inicio-sesion-label">Contraseña*</label>
            <input
              type="password"
              id="password"
              className={`modal-inicio-sesion-input ${contraseñaError && "error"}`}
              placeholder="Ingrese su contraseña"
              value={contraseña}
              onChange={(e) => setPassword(e.target.value)}
            />
            {contraseñaError && <p className="modal-inicio-sesion-error">{contraseñaError}</p>}
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