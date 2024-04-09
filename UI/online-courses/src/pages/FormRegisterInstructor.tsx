import React, { useState, useRef } from "react";
import logo from "../assets/logo.jpeg";
import { Modal } from "../components/Modal";
import AlertIcon from "../assets/icons/AlertIcon.svg";
import CheckIcon from "../assets/icons/CheckIcon.svg";

export const FormRegisterInstructor = () => {

  // Referencias a los elementos de entrada
  const nombreCompletoRef = useRef<HTMLInputElement>(null);
  const nombreUsuarioRef = useRef<HTMLInputElement>(null);
  const fechaNacimientoRef = useRef<HTMLInputElement>(null);
  const contraseñaRef = useRef<HTMLInputElement>(null);
  const confirmacionContraseñaRef = useRef<HTMLInputElement>(null);

  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);

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

  const [contraseña, setContraseña] = useState("");
  const [errorContraseña, setErrorContraseña] = useState("");
  const [inputClassContraseña, setInputClassContraseña] = useState("");

  const [confirmacionContraseña, setConfirmacionContraseña] = useState("");
  const [errorConfirmacionContraseña, setErrorConfirmacion] = useState("");
  const [inputClassConfirmacionContraseña, setInputClassConfirmacion] = useState("");
  

  const handleNombreCompletoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z\s]/g, ''); // Eliminar caracteres no alfabéticos
    setNombreCompleto(value);
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
      // Otras validaciones y lógica de éxito aquí
      setErrorFechaNacimiento("");
      setInputClassNameFecha("success-input");
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

  const handleCorreoKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") { // Verificar si la tecla presionada es un espacio
      event.preventDefault(); // Prevenir la acción por defecto (no permitir escribir el espacio)
    }
  };
  
  const handleCorreoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-z.@]/g, ''); // Eliminar caracteres no permitidos
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

  const handleContraseñaKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") { // Verificar si la tecla presionada es un espacio
      event.preventDefault(); // Prevenir la acción por defecto (no permitir escribir el espacio)
    }
  };

  const handleContraseñaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''); // Eliminar caracteres no alfabéticos
    setContraseña(value);
  };

  const validateContraseña = () => {
    if (contraseña.length === 0) {
      setErrorContraseña("Por favor, ingrese una contraseña");
      setInputClassContraseña("error-input");
    }else if (contraseña.length > 20){
      setErrorContraseña("La contraseña es demasiado larga");
      setInputClassContraseña("error-input");
    }else if(contraseña.length  < 9){
      setErrorContraseña("La contraseña es muy corta");
      setInputClassContraseña("error-input");
    }else{
      setErrorContraseña("");
      setInputClassContraseña("success-input");
    }
  };
  
  const handleConfirmacionContraseñaKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") { // Verificar si la tecla presionada es un espacio
      event.preventDefault(); // Prevenir la acción por defecto (no permitir escribir el espacio)
    }
  };

  const handleConfirmacionContraseñaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9\s]/g, ''); // Eliminar caracteres no alfabéticos
    setConfirmacionContraseña(value);
  };

  const verifyContraseña = () => {
    if (contraseña.length === 0) {
      setErrorConfirmacion("Porfavor, confirme su contraseña ");
      setInputClassConfirmacion("error-input");
    }else if (contraseña.length < 8) {
      setErrorConfirmacion("La contraseña es muy corta ");
      setInputClassConfirmacion("error-input");
    }else if (contraseña === confirmacionContraseña) {
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
      return null; // En caso de que no haya ninguna clase definida
    }
  };

  const handleRegisterButtonClick = () => {
    validateNombreCompleto();
    validateNombreUsuario();
    validateFechaNacimiento();
    validateTipoUsuario();
    validateCorreo();
    validateContraseña();
    verifyContraseña();

    const allFieldsValid = (
      inputClassNombre === "success-input" &&
      inputClassNombreUsuario === "success-input" &&
      inputClassNameFecha === "success-input" &&
      inputClassTipoUsuario === "success-input" &&
      inputClassCorreo === "success-input" &&
      inputClassContraseña === "success-input" &&
      inputClassConfirmacionContraseña === "success-input"
    );
    if (allFieldsValid) {
      setShowModalSuccess(true); // Mostrar el modal de registro exitoso
    }else{
      //setShowModalCancel(true);
    }
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
                ref={nombreCompletoRef} // Referencia al elemento de entrada
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
                ref={nombreUsuarioRef} // Referencia al elemento de entrada
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
                ref={fechaNacimientoRef} // Referencia al elemento de entrada
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
                onKeyPress={handleCorreoKeyPress}
                className={`${inputClassCorreo}`}
              />
              <div className="icon-container">
                {determineIconVisibility(inputClassCorreo)}
              </div>
            </div>

            {errorContraseña && <div className="error-message">{errorContraseña}</div>}
            <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Contraseña*</label>
              <input
                type="password"
                id="contraseña"
                placeholder="Ingrese su contraseña"
                value={contraseña}
                onChange={handleContraseñaChange}
                onKeyPress={handleContraseñaKeyPress}
                className={`${contraseña} ${inputClassContraseña}`}
                ref={contraseñaRef}
              />
              <div className="icon-container">
                {determineIconVisibility(inputClassContraseña)}
              </div>
            </div>

            {errorConfirmacionContraseña && <div className="error-message">{errorConfirmacionContraseña}</div>}
            <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Confirmar contraseña*</label>
              <input
                type="password"
                id="confirmacionContraseña"
                placeholder="Confirme su contraseña"
                value={confirmacionContraseña}
                onChange={handleConfirmacionContraseñaChange}
                onKeyPress={handleConfirmacionContraseñaKeyPress}
                className={`${confirmacionContraseña} ${inputClassConfirmacionContraseña}`}
                ref={confirmacionContraseñaRef}
              />
              <div className="icon-container">
                {determineIconVisibility(inputClassConfirmacionContraseña)}
              </div>
            </div>
          </div>
        </section>

        <section className="form-register-instructor-footer">
          <button type="button" className="form-register-instructor-footer-button">
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
        onAccept={() => setShowModalSuccess(false)}
      />
      )}

      {showModalCancel && (
        <Modal
          title="¿Estás seguro?"
          description="¿Estás seguro de que deseas cancelar el registro del curso?"
          txtBtnAccept="Sí, seguro"
          txtBtnCancel="No, continuar"
          showBtnCancel={true}
          onAccept={() => {
            // Resetear campos o realizar alguna acción adicional si es necesario
            // reset();
            setShowModalCancel(false); // Ocultar el modal de confirmación de cancelación
          }}
          onCancel={() => setShowModalCancel(false)}
        />
      )}
    </>
  );
};