import React, { useState, useRef } from "react";
import logo from "../assets/logo.jpeg";

export const FormRegisterInstructor = () => {

  // Referencias a los elementos de entrada
  const nombreCompletoRef = useRef<HTMLInputElement>(null);
  const nombreUsuarioRef = useRef<HTMLInputElement>(null);
  const fechaNacimientoRef = useRef<HTMLInputElement>(null);
  const contraseñaRef = useRef<HTMLInputElement>(null);
  const confirmacionContraseñaRef = useRef<HTMLInputElement>(null);

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [errorNombreCompleto, setErrorNombreCompleto] = useState("");
  const [inputClassNombre, setInputClassNombre] = useState("");

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [errorNombreUsuario, setErrorNombreUsuario] = useState("");
  const [inputClassNombreUsuario, setInputClassNombreUsuario] = useState("");


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
  

  const handleNombreCompletoKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      nombreUsuarioRef.current?.focus();
      validateNombreCompleto();
    }
  };
  
  const handleNombreCompletoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z\s]/g, ''); // Eliminar caracteres no alfabéticos
    setNombreCompleto(value);
  };

  const validateNombreCompleto = () => {
    if (nombreCompleto.length == 1 || nombreCompleto.length == 2) {
      setErrorNombreCompleto("El nombre es muy corto, ingrese otro ");
      setInputClassNombre("error-input");
    }else if (nombreCompleto.length < 1){
      setErrorNombreCompleto("Por favor, Ingrese su nombre completo");
      setInputClassNombre("error-input");
    }else if(nombreCompleto.length > 20){
      setErrorNombreCompleto("El nombre es muy largo, ingrese otro");
      setInputClassNombre("error-input");
    }else{
      setErrorNombreCompleto("");
      setInputClassNombre("success-input");
    }
  };

  const handleNombreUsuarioKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fechaNacimientoRef.current?.focus();
      validateNombreUsuario();
    }
  };
   
  const handleNombreUsuarioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9_]/g, ''); // Eliminar caracteres no alfabéticos
    setNombreUsuario(value);
  };

  const validateNombreUsuario = () => {
    if (nombreUsuario.length == 1 || nombreUsuario.length == 2) {
      setErrorNombreUsuario("El nombre de usuario es muy corto, ingrese otro ");
      setInputClassNombreUsuario("error-input");
    }else if (nombreUsuario.length < 1){
      setErrorNombreUsuario("Por favor, ingrese un nombre de usuario");
      setInputClassNombreUsuario("error-input");
    }else if(nombreUsuario.length > 20){
      setErrorNombreUsuario("El nombre de usuario es muy largo, ingrese otro");
      setInputClassNombreUsuario("error-input");
    }else{
      setErrorNombreUsuario("");
      setInputClassNombreUsuario("success-input");
    }
  };

  const handleFechaNacimientoKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fechaNacimientoRef.current?.focus();
      validateFechaNacimiento();
    }
  };

  const validateFechaNacimiento = () => {
    // Opcional: Verificar si la fecha está dentro de un rango específico
    const fechaIngresada = new Date(fechaNacimiento);
    const fechaMinima = new Date("1980-01-01");
    const fechaMaxima = new Date("2000-01-01"); // Fecha actual

    if (fechaIngresada > fechaMinima || fechaIngresada < fechaMaxima) {
      setErrorFechaNacimiento("");
      setInputClassNameFecha("success-input");
    }
  };
  
  const handleTipoUsuarioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setTipoUsuario(value);

    if (value === "opcion0" ) {
      setErrorTipoUsuario("Debe seleccionar un tipo de usuario");
      setInputClassTipoUsuario("error-input");
    } else if (value !== "opcion0" ) {
      setErrorTipoUsuario("");
      setInputClassTipoUsuario("success-input");
    }
  };

  const handleCorreoKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      contraseñaRef.current?.focus();
      validateCorreo();
    }
  };
  
  const handleCorreoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-z0-9.@]/g, ''); // Eliminar caracteres no alfabéticos
    setCorreo(value);
  };
  
  const validateCorreo = () =>{
    if(correo.length < 1){
      setErrorCorreo("Ingrese su correo electronico");
      setInputClassCorreo("error-input");
    }else{
      setErrorCorreo("");
      setInputClassCorreo("success-input");
    }
  }

  const handleContraseñaKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      confirmacionContraseñaRef.current?.focus();
      validateContraseña();
    }
  };
  
  const handleContraseñaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9\s]/g, ''); // Eliminar caracteres no alfabéticos
    setContraseña(value);
  };

  const validateContraseña = () => {
    if (contraseña.length < 8) {
      setErrorContraseña("La contraseña es muy corta ");
      setInputClassContraseña("error-input");
    }else if (contraseña.length > 20){
      setErrorContraseña("La contraseña es demasiado larga");
      setInputClassContraseña("error-input");
    }else if(contraseña.length  < 1){
      setErrorContraseña("Por favor, ingrese una contraseña");
      setInputClassContraseña("error-input");
    }else{
      setErrorContraseña("");
      setInputClassContraseña("success-input");
    }
  };

  const handleConfirmacionContraseñaKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      //confirmacionContraseñaRef.current?.focus();
      verifyContraseña();
    }
  };
  
  const handleConfirmacionContraseñaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9\s]/g, ''); // Eliminar caracteres no alfabéticos
    setConfirmacionContraseña(value);
  };

  const verifyContraseña = () => {
    if (contraseña === confirmacionContraseña) {
      setErrorConfirmacion("");
      setInputClassConfirmacion("success-input");
    }else{
      setErrorConfirmacion("La contraseña ingresada no es la misma");
      setInputClassConfirmacion("error-input");
    }
  };

  return (
    <>
      <article className="form-register-instructor">
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
                name="nombreCompleto"
                placeholder="Ingrese su nombre completo"
                value={nombreCompleto}
                onKeyDown={handleNombreCompletoKeyDown}
                onChange={handleNombreCompletoChange}
                className={`${nombreCompleto} ${inputClassNombre}`}
                ref={nombreCompletoRef} // Referencia al elemento de entrada
              />
            </div>

            {errorNombreUsuario && <div className="error-message">{errorNombreUsuario}</div>}
            <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Nombre de usuario*</label>
              <input
                type="text"
                id="nombreUsuario"
                name="nombreUsuario"
                placeholder="Ingrese un nombre de usuario"
                value={nombreUsuario}
                onChange={handleNombreUsuarioChange}
                onKeyDown={handleNombreUsuarioKeyDown}
                className={`${nombreUsuario} ${inputClassNombreUsuario}`}
                ref={nombreUsuarioRef} // Referencia al elemento de entrada
              />
            </div>

          {errorFechaNacimiento && <div className="error-message">{errorFechaNacimiento}</div>}
          <div className="form-register-instructor-content-data">
            <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Fecha de Nacimiento*</label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                defaultValue={"2000-01-01"}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                onKeyDown={handleFechaNacimientoKeyDown}
                className={`${inputClassNameFecha}`}
                ref={fechaNacimientoRef} // Referencia al elemento de entrada
              />
            </div>
          </div>

          
          {errorTipoUsuario && <div className="error-message">{errorTipoUsuario}</div>}
          <div className="form-register-instructor-content-data-field">
            <label htmlFor="">Tipo de usuario*</label>
            <select 
              id="tipoUsuario"
              value={tipoUsuario}
              onChange={handleTipoUsuarioChange}
              className={inputClassTipoUsuario} 
            >
              <option value="opcion0">Selecciona tipo de usuario</option>
              <option value="opcion1">Instructor</option>
            </select>
          </div>  
        
          {errorCorreo && <div className="error-message">{errorCorreo}</div>}
          <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Correo electronico*</label>
              <input
                type="email"
                id="correoElectronico"
                name="correoElectronico"
                placeholder="Ingrese su correo"
                value={correo}
                onChange={handleCorreoChange}
                onKeyDown={handleCorreoKeyDown}
                className={`${correo} ${inputClassCorreo}`}
              />
            </div>

            {errorContraseña && <div className="error-message">{errorContraseña}</div>}
            <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Contraseña*</label>
              <input
                type="password"
                id="contraseña"
                name="contraseña"
                placeholder="Ingrese su contraseña"
                value={contraseña}
                onChange={handleContraseñaChange}
                onKeyDown={handleContraseñaKeyDown}
                className={`${contraseña} ${inputClassContraseña}`}
                ref={contraseñaRef}
              />
            </div>

            {errorConfirmacionContraseña && <div className="error-message">{errorConfirmacionContraseña}</div>}
            <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Confirmar contraseña*</label>
              <input
                type="password"
                id="confirmacionContraseña"
                name="confirmacionContraseña"
                placeholder="Confirme su contraseña"
                value={confirmacionContraseña}
                onChange={handleConfirmacionContraseñaChange}
                onKeyDown={handleConfirmacionContraseñaKeyDown}
                className={`${confirmacionContraseña} ${inputClassConfirmacionContraseña}`}
                ref={confirmacionContraseñaRef}
              />
            </div>
          </div>
        </section>

        <section className="form-register-instructor-footer">
          <button type="button" className="form-register-instructor-footer-button">
            Cancelar
          </button>

          <button type="button" className="form-register-instructor-footer-button">
            Registrar
          </button>
        </section>
      </article>
    </>
  );
};