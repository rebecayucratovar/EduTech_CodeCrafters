import React, { useState} from "react";
import { Link } from "react-router-dom";
import logo from "../assets/LogoForm.png";
import { Modal } from "../components/Modal";
import AlertIcon from "../assets/icons/AlertIcon.svg";
import CheckIcon from "../assets/icons/CheckIcon.svg";

export const FormRegisterInstructor = () => {

  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalErrorInesperado, setShowModalErrorInesperado] = useState(false);

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [errorNombreCompleto, setErrorNombreCompleto] = useState("");
  const [inputClassNombre, setInputClassNombre] = useState("");

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [errorNombreUsuario, setErrorNombreUsuario] = useState("");
  const [inputClassNombreUsuario, setInputClassNombreUsuario] = useState("");

  const [fechaNacimientoModificada, setFechaNacimientoModificada] = useState(false);
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [errorFechaNacimiento, setErrorFechaNacimiento] = useState("");
  const [inputClassNameFecha, setInputClassNameFecha] = useState("");

  const [tipoUsuario, setTipoUsuario] = useState("");
  const [errorTipoUsuario, setErrorTipoUsuario] = useState("");
  const [inputClassTipoUsuario, setInputClassTipoUsuario] = useState("");

  const [correo, setCorreo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [inputClassCorreo, setInputClassCorreo] = useState("");

  const [contrasenia, setContrasenia] = useState("");
  const [errorContrasenia, setErrorContrasenia] = useState("");
  const [inputClassContrasenia, setInputClassContrasenia] = useState("");

  const [confirmacionContrasenia, setConfirmacionContrasenia] = useState("");
  const [errorConfirmacionContrasenia, setErrorConfirmacion] = useState("");
  const [inputClassConfirmacionContrasenia, setInputClassConfirmacion] = useState("");
  

  const handleNombreCompletoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/ {2,}/g, ' '); // Reemplazar múltiples espacios por uno solo
    const formattedValue = value.replace(/[^a-zA-Z\s]/g, ''); // Eliminar caracteres no alfabéticos
    setNombreCompleto(formattedValue);
  };

  const validateNombreCompleto = () => {
    if (nombreCompleto.length === 0) {
      setErrorNombreCompleto("Por favor, ingrese su nombre completo");
      setInputClassNombre("error-input");
    } else if (nombreCompleto.length < 3) {
      setErrorNombreCompleto("El nombre es muy corto, ingrese otro");
      setInputClassNombre("error-input");
    } else if (nombreCompleto.length > 20) {
      setErrorNombreCompleto("El nombre es muy largo, ingrese otro");
      setInputClassNombre("error-input");
    } else {
      setErrorNombreCompleto("");
      setInputClassNombre("success-input");
    }
  };
   
  const handleNombreUsuarioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9_]/g, ''); // Eliminar caracteres no alfabéticos
    setNombreUsuario(value);
  };

  const validateNombreUsuario = () => {
    if (nombreUsuario.length === 0) {
      setErrorNombreUsuario("Por favor, ingrese un nombre de usuario");
      setInputClassNombreUsuario("error-input");
    }else if (nombreUsuario.length < 3){
      setErrorNombreUsuario("El nombre de usuario es muy corto, ingrese otro ");
      setInputClassNombreUsuario("error-input");
    }else if(nombreUsuario.length > 20){
      setErrorNombreUsuario("El nombre de usuario es muy largo, ingrese otro");
      setInputClassNombreUsuario("error-input");
    }else{
      setErrorNombreUsuario("");
      setInputClassNombreUsuario("success-input");
    }
  };

  const handleFechaNacimientoChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setFechaNacimientoModificada(true);
    setFechaNacimiento(value);
  };

  const validateFechaNacimiento = () => {
    if (!fechaNacimientoModificada) {
      setErrorFechaNacimiento("Por favor, seleccione su fecha de nacimiento");
      setInputClassNameFecha("error-input");
  } else {
      const fechaNacimientoDate = new Date(fechaNacimiento);
      const fechaMinima = new Date("1970-01-01");
      const fechaMaxima = new Date("2006-01-01"); // Fecha actual

      if (fechaNacimientoDate < fechaMinima || fechaNacimientoDate > fechaMaxima) {
          setErrorFechaNacimiento("Seleccione su fecha de nacimiento");
          setInputClassNameFecha("error-input");
      } else {
          setErrorFechaNacimiento("");
          setInputClassNameFecha("success-input");
      }
  }
  };
  
  const handleTipoUsuarioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setTipoUsuario(value);
  };

  const validateTipoUsuario = () =>{
    if (tipoUsuario.trim() === "") {
      setErrorTipoUsuario("Debe seleccionar un tipo de usuario");
      setInputClassTipoUsuario("error-input");
    }else if (tipoUsuario === "opcion0" ) {
      setErrorTipoUsuario("Debe seleccionar un tipo de usuario");
      setInputClassTipoUsuario("error-input");
    } else if (tipoUsuario !== "opcion0" ) {
      setErrorTipoUsuario("");
      setInputClassTipoUsuario("success-input");
    }
  }

  const handleCorreoKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") { // Verificar si la tecla presionada es un espacio
      event.preventDefault(); // Prevenir la acción por defecto (no permitir escribir el espacio)
    }
  };
  
  const handleCorreoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-z0-9@.]/g, ''); // Eliminar caracteres no permitidos
    setCorreo(value);
  };
  
  const validateCorreo = () =>{
    if(correo.length  === 0){
      setErrorCorreo("Ingrese su correo electronico");
      setInputClassCorreo("error-input");
    }else{
      setErrorCorreo("");
      setInputClassCorreo("success-input");
    }
  }

  const handleContraseniaKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") { // Verificar si la tecla presionada es un espacio
      event.preventDefault(); // Prevenir la acción por defecto (no permitir escribir el espacio)
    }
  };

  const handleContraseniaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''); // Eliminar caracteres no alfabéticos
    setContrasenia(value);
  };

  const validateContrasenia = () => {
    if (contrasenia.length === 0) {
      setErrorContrasenia("Por favor, ingrese una contraseña");
      setInputClassContrasenia("error-input");
    }else if (contrasenia.length > 20){
      setErrorContrasenia("La contraseña es demasiado larga");
      setInputClassContrasenia("error-input");
    }else if(contrasenia.length  < 9){
      setErrorContrasenia("La contraseña es muy corta");
      setInputClassContrasenia("error-input");
    }else{
      setErrorContrasenia("");
      setInputClassContrasenia("success-input");
    }
  };
  
  const handleConfirmacionContraseniaKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") { // Verificar si la tecla presionada es un espacio
      event.preventDefault(); // Prevenir la acción por defecto (no permitir escribir el espacio)
    }
  };

  const handleConfirmacionContraseniaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9\s]/g, ''); // Eliminar caracteres no alfabéticos
    setConfirmacionContrasenia(value);
  };

  const verifyContrasenia = () => {
    if (contrasenia.length === 0) {
      setErrorConfirmacion("Porfavor, confirme su contraseña ");
      setInputClassConfirmacion("error-input");
    }else if (contrasenia.length < 8) {
      setErrorConfirmacion("La contraseña es muy corta ");
      setInputClassConfirmacion("error-input");
    }else if (contrasenia === confirmacionContrasenia) {
      setErrorConfirmacion("");
      setInputClassConfirmacion("success-input");
    }else{
      setErrorConfirmacion("La contraseña ingresada no es la misma");
      setInputClassConfirmacion("error-input");
    }
  };
  
  const determineIconVisibility = (inputClass: string) => {
    if (inputClass === "error-input") {
      return <img src={AlertIcon} alt="Icono de alerta" className="icon" />;
    } else if (inputClass === "success-input") {
      return <img src={CheckIcon} alt="Icono de check" className="icon" />;
    } else {
      return null;
    }
  };

  const handleRegisterButtonClick = () => {
    // Validar todos los campos del formulario
    validateNombreCompleto();
    validateNombreUsuario();
    validateFechaNacimiento();
    validateTipoUsuario();
    validateCorreo();
    validateContrasenia();
    verifyContrasenia();
  
    // Comprobar si todos los campos son válidos
    const allFieldsValid =
        errorNombreCompleto === "" &&
        errorNombreUsuario === "" &&
        errorFechaNacimiento === "" &&
        errorTipoUsuario === "" &&
        errorCorreo === "" &&
        errorContrasenia === "" &&
        errorConfirmacionContrasenia === "";
  
    if (allFieldsValid) {
        // Crear objeto con los datos del usuario
        const userData = {
            nombreCompleto,
            nombreUsuario,
            fechaNacimiento,
            tipoUsuario,
            correo,
            contrasenia
        };
  
        // Configurar opciones de la solicitud fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        };
  
        // Enviar solicitud POST al servidor
        fetch("/api/usuarios/saveUsuario", requestOptions)
          .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }else{}
            return response.json();
        })
        .then(data => {
            console.log(data);
            setShowModalSuccess(true);
        })
        .catch(error => {
            console.error("Error al enviar los datos al servidor:", error);
            setShowModalErrorInesperado(true);
        });
    }else{}
  };
  const handleCancelButtonClick = () => {
    setShowModalCancel(true);
  }

  const handleAcceptCancel = () => {
    setShowModalCancel(false);
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  };

  const handleAcceptSuccess = () => {
    setShowModalSuccess(false);
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  };

  const resetFormFields = () => {
    ['NombreCompleto', 'NombreUsuario', 'FechaNacimiento', 'TipoUsuario', 'Correo', 'Contraseña', 'ConfirmacionContraseña'].forEach(field => {
      const setStateFunc = eval(`set${field}`);
      setStateFunc('');
      const setErrorFunc = eval(`setError${field}`);
      setErrorFunc && setErrorFunc('');
    });
  };

  return (
    <>
      <form className="form-register-instructor">
        <section className="form-register-course-logo">
          <img src={logo} alt="logo" />
        </section>
        <section className="form-register-instructor-content">
          <label className="form-register-instructor-content-title">
            Formulario de registro
          </label>

          {errorNombreCompleto && <div className="error-message">{errorNombreCompleto}</div>}
          <div className="form-register-instructor-content-data">
            <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Nombre Completo*</label>
              <input
                type="text"
                id="nombreCompleto"
                placeholder="Ingrese su nombre completo"
                value={nombreCompleto}
                onChange={handleNombreCompletoChange}
                className={`${nombreCompleto} ${inputClassNombre}`}
                autoComplete="off" 
              />
              <div className="icon-container">
                {determineIconVisibility(inputClassNombre)}
              </div>
            </div>

            {errorNombreUsuario && <div className="error-message">{errorNombreUsuario}</div>}
            <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Nombre de usuario*</label>
              <input
                type="text"
                id="nombreUsuario"
                placeholder="Ingrese un nombre de usuario"
                value={nombreUsuario}
                onChange={handleNombreUsuarioChange}
                className={`${nombreUsuario} ${inputClassNombreUsuario}`}
                autoComplete="off" 
              />
              <div className="icon-container">
                {determineIconVisibility(inputClassNombreUsuario)}
              </div>
            </div>

          {errorFechaNacimiento && <div className="error-message">{errorFechaNacimiento}</div>}
          <div className="form-register-instructor-content-data">
            <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Fecha de Nacimiento*</label>
              <input
                type="date"
                id="fechaNacimiento"
                defaultValue={"2000-01-01"}
                onInput={handleFechaNacimientoChange}
                className={`${inputClassNameFecha}`}
              />
              <div className="icon-container">
                {determineIconVisibility(inputClassNameFecha)}
              </div>
            </div>
          </div>

          
          {errorTipoUsuario && <div className="error-message">{errorTipoUsuario}</div>}
          <div className="form-register-instructor-content-data-field">
            <label htmlFor="">Tipo de usuario*</label>
            <div className="input-container">
              <select 
                id="tipoUsuario"
                value={tipoUsuario}
                onChange={handleTipoUsuarioChange}
                className={inputClassTipoUsuario} 
              >
                <option value="opcion0">Selecciona tipo de usuario</option>
                <option value="opcion1">Instructor</option>
              </select>
              <div className="icon-container">
                {determineIconVisibility(inputClassTipoUsuario)}
              </div>
            </div>
          </div>
        
          {errorCorreo && <div className="error-message">{errorCorreo}</div>}
          <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Correo electronico*</label>
              <input
                type="text"
                id="correoElectronico"
                name="correoElectronico"
                placeholder="Ingrese su correo"
                value={correo}
                onChange={handleCorreoChange}
                onKeyDown={handleCorreoKeyDown}  // onKeyPress={handleCorreoKeyPress}
                className={`${inputClassCorreo}`}
                autoComplete="off" 
              />
              <div className="icon-container">
                {determineIconVisibility(inputClassCorreo)}
              </div>
            </div>

            {errorContrasenia && <div className="error-message">{errorContrasenia}</div>}
            <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Contraseña*</label>
              <input
                type="password"
                id="contraseña"
                placeholder="Ingrese su contraseña"
                value={contrasenia}
                onChange={handleContraseniaChange}
                onKeyDown={handleContraseniaKeyDown}
                className={`${contrasenia} ${inputClassContrasenia}`}
              />
              <div className="icon-container">
                {determineIconVisibility(inputClassContrasenia)}
              </div>
            </div>

            {errorConfirmacionContrasenia && <div className="error-message">{errorConfirmacionContrasenia}</div>}
            <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Confirmar contraseña*</label>
              <input
                type="password"
                id="confirmacionContraseña"
                placeholder="Confirme su contraseña"
                value={confirmacionContrasenia}
                onChange={handleConfirmacionContraseniaChange}
                onKeyDown={handleConfirmacionContraseniaKeyDown}
                className={`${confirmacionContrasenia} ${inputClassConfirmacionContrasenia}`}
              />
              <div className="icon-container">
                {determineIconVisibility(inputClassConfirmacionContrasenia)}
              </div>
            </div>
          </div>
        </section>

        <section className="form-register-instructor-footer">
          <button type="button" className="form-register-instructor-footer-button" onClick={handleCancelButtonClick}>
            Cancelar
          </button>

          <button type="button" className="form-register-instructor-footer-button" onClick={handleRegisterButtonClick}>
            Registrar
          </button>
        </section>
      </form>
      {showModalSuccess && (
      <Modal
        title="Registro exitoso"
        description="Se registró correctamente al instructor."
        txtBtnAccept="Aceptar"
        onAccept={handleAcceptSuccess}
      />
      )}
      
      {showModalErrorInesperado && (
      <Modal
        title="Error al registrar"
        description="Error inesperado, no se pudo guardar el registro."
        txtBtnAccept="Aceptar"
        onAccept={() => {
          setShowModalErrorInesperado(false)
          resetFormFields();
        }}
      />
      )}
      {showModalCancel && (
        <Modal
          title="¿Estás seguro?"
          description="¿Estás seguro de que deseas cancelar el registro del curso?"
          txtBtnAccept="Sí, seguro"
          txtBtnCancel="No, continuar"
          showBtnCancel={true}
          onAccept={handleAcceptCancel}
          onCancel={() => setShowModalCancel(false)}
        />
      )}
      {showModalCancel && <Link to="/" style={{ display: 'none' }} />}
      {showModalSuccess && <Link to="/" style={{ display: 'none' }} />}
    </>
  );
}; 