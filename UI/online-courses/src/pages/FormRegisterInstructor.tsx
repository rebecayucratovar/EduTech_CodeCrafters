import { useState } from "react";
import logo from "../assets/LogoForm.png";
import { Modal } from "../components/Modal";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Validate } from 'react-hook-form';
import AlertIcon from "../assets/icons/AlertIcon.svg";
import CheckIcon from "../assets/icons/CheckIcon.svg";
import { addUsers } from "../slices/users";
import { useNavigate } from 'react-router-dom';

interface FormValues {
  contraseña: string;
  fechaNacimiento: string;
  confirmacionContraseña: string;
}

export const FormRegisterInstructor = () => {

  const navigate = useNavigate();

  const [nombreCompleto, setNombreCompleto] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmacionContraseña, setConfirmacionContraseña] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm({
    defaultValues: {
      nombreCompleto: "",
      nombreUsuario: "",
      fechaNacimiento: "2000-01-01",
      tipoUsuario: "default",
      correo: "",
      contraseña: "",
      confirmacionContraseña: "",
    },
  });

  const [showModalByClickInRegister, setShowModalByClickInAccept] =
      useState(false);

  const [showModalByClickInCancel, setShowModalByClickInCancel] =
      useState(false);

  const handleCancel = () => {
    setShowModalByClickInCancel(true);
  };

  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    if (
        errors.nombreCompleto ||
        errors.nombreUsuario ||
        errors.fechaNacimiento ||
        errors.tipoUsuario ||
        errors.correo ||
        errors.contraseña ||
        errors.confirmacionContraseña
    ) {
      return;
    }
    reset();
    const modifiedData = {
      ...data,
      id: Math.random().toString(36).substring(7),
      file: null,
    };
    dispatch(addUsers(modifiedData));
    setShowModalByClickInAccept(true);
  });
 
  const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/ {2,}/g, ' '); // Reemplazar múltiples espacios por uno solo
    const formattedValue = value.replace(/[^a-zA-Z\s]/g, ''); // Eliminar caracteres no alfabéticos
    setNombreCompleto(formattedValue);
  };

  const handleNombreUsuarioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9_]/g, ''); // Eliminar caracteres no alfabéticos
    setNombreUsuario(value);
  };

  /*const validate: Validate<any, FormValues> = (value, { dirtyFields }) => {
    if (!dirtyFields.fechaNacimiento) {
      return "Por favor, modifica la fecha de nacimiento";
    } else {
      return true;
    }
  };*/

  const handleCorreoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-z0-9@.]/g, ''); // Eliminar caracteres no permitidos
    setCorreo(value);
  };

  const handleContraseñaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9_*]/g, ''); // Eliminar caracteres no alfabéticos
    setContraseña(value);
  };

  const handleConfirmacionContraseñaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9_*]/g, ''); // Eliminar caracteres no alfabéticos
    setConfirmacionContraseña(value);
  };

  const validateConfirmacionContraseña: Validate<any, FormValues> = (value, { contraseña }) => {
    if (value !== contraseña) {
      return "La contraseña no es la misma";
    }
    return true;
  };

  return (
    <>
      <form className="form-register-instructor" onSubmit={onSubmit}>
        <section className="form-register-course-logo">
          <img src={logo} alt="logo" />
        </section>

        <section className="form-register-instructor-content">
          <label className="form-register-instructor-content-title">
            Formulario de registro
          </label>

          <div className="form-register-instructor-content-data">
            <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Nombre Completo*</label>
              <div className="form-register-instructor-content-data-field-input">
                <input
                  type="text"
                  id="nombreCompleto"
                  placeholder="Ingrese su nombre completo"
                  value={nombreCompleto}
                  
                  {...register("nombreCompleto", {
                    required: "Por favor, ingrese un nombre completo",
                    minLength: {
                      value: 3,
                      message: "El nombre es muy corto, ingrese otro",
                    },
                    maxLength: {
                      value: 20,
                      message: "El nombre es muy largo, ingrese otro",
                    },
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                      message: "El nombre solo debe contener letras",
                    },
                  })}
                  
                  className={`${errors.nombreCompleto ? 'error-input' : ''} ${dirtyFields.nombreCompleto && !errors.nombreCompleto} ? 'success-input' : ''}`}
                  onChange={handleNombreChange}
                />
                {errors.nombreCompleto && (
                  <div className="form-register-instructor-content-data-field-error">
                    <label htmlFor="error">
                      {errors.nombreCompleto.message}
                    </label>
                    <img src={AlertIcon} alt="Icono de alerta"/>
                  </div>
                )}

                {nombreCompleto && !errors.nombreCompleto && (
                    <div className="form-register-instructor-content-data-field-error">
                      <img className="check-icon" src={CheckIcon} alt="Icono de check"/>
                    </div>
                )}
              </div>
            </div>

            <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Nombre de usuario*</label>
              <div className="form-register-instructor-content-data-field-input">
                <input
                  type="text"
                  id="nombreUsuario"
                  placeholder="Ingrese su nombre de usuario"
                  value={nombreUsuario}

                  {...register("nombreUsuario", {
                    required: "Por favor, ingrese un nombre de usuario",
                    minLength: {
                      value: 3,
                      message: "El nombre de usuario es muy corto, ingrese otro",
                    },
                    maxLength: {
                      value: 20,
                      message: "El nombre de usuario es muy largo, ingrese otro",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_\s]+$/,
                      message: "El nombre solo debe contener letras, números, espacios y guiones bajos",
                    },
                    
                  })}
                  onChange={handleNombreUsuarioChange}
                  className={`${errors.nombreUsuario ? 'error-input' : ''} ${dirtyFields.nombreUsuario && !errors.nombreUsuario} ? 'success-input' : ''}`}
                />
                {errors.nombreUsuario && (
                  <div className="form-register-instructor-content-data-field-error">
                      <label htmlFor="error">
                        {errors.nombreUsuario.message}
                      </label>
                      <img src={AlertIcon} alt="Icono de alerta"/>
                  </div>
                )}

                {nombreUsuario && !errors.nombreUsuario && (
                    <div className="form-register-instructor-content-data-field-error">
                      <img className="check-icon" src={CheckIcon} alt="Icono de check"/>
                    </div>
                )}
              </div>
            </div>
          
            <div className="form-register-instructor-content-data-field">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento*</label>
              <div className="form-register-instructor-content-data-field-input">
                <input
                  type="date"
                  id="fechaNacimiento"
                  {...register("fechaNacimiento", {
                    required: "Por favor, seleccione su fecha de nacimiento",
                      min: {
                        value: "1970-01-01",
                        message: "Seleccione su fecha de nacimiento",
                      },
                      max: {
                        value: "2006-01-01",
                        message: "Seleccione su fecha de nacimiento",
                      },
                      //validate: validate,
                  })}
                  className={`${errors.fechaNacimiento ? 'error-input' : ''} ${dirtyFields.fechaNacimiento && !errors.fechaNacimiento ? 'success-input' : ''}`}
                />

                {errors.fechaNacimiento && (
                  <div className="form-register-course-content-data-field-error">
                   <label htmlFor="error">
                        {errors.fechaNacimiento.message}
                      </label>
                      <img src={AlertIcon} alt="Icono de alerta"/>
                  </div>
                )}

                {dirtyFields.fechaNacimiento && !errors.fechaNacimiento && (
                  <div className="form-register-course-content-data-field-error">
                    <img className="check-icon" src={CheckIcon} alt="Icono de check" />
                  </div>
                )}
              </div>
            </div>

            <div className="form-register-instructor-content-data-field">
                <label htmlFor="tipousuario">Tipo de usuario*</label>
                <div className="form-register-instructor-content-data-field-input">
                  <select
                      id="tipoUsuario"
                      {...register("tipoUsuario", {
                        required: {
                          value: true,
                          message: "Seleccione algun usuario",
                        },
                        validate: (value) =>
                            value !== "default" || "La categoría es requerida",
                      })}
                      className={`${errors.tipoUsuario ? 'error-input' : ''} ${dirtyFields.tipoUsuario && !errors.tipoUsuario ? 'success-input' : ''}`}
                  >
                    <option value="default">Selecciona un tipo de usuario</option>
                    <option value="Instructor">Instructor</option>
                  </select>

                  {errors.tipoUsuario && (
                      <div className="form-register-instructor-content-data-field-error">
                        <label htmlFor="error">
                          {JSON.stringify(errors.tipoUsuario.message).replace(
                              /^"|"$/g,
                              ""
                          )}
                        </label>
                        <img src={AlertIcon} alt="Icono de alerta"/>
                      </div>
                  )}

                  {dirtyFields.tipoUsuario && !errors.tipoUsuario && (
                      <div className="form-register-instructor-content-data-field-error">
                        <img className="check-icon" src={CheckIcon} alt="Icono de check"/>
                      </div>
                  )}
                </div>
            </div>
        
            <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Correo electronico*</label>
              <div className="form-register-instructor-content-data-field-input">
                <input
                    type="text"
                    id="correo"
                    value={correo}
                    placeholder="Ingrese su correo electronico"
                    {...register("correo", {
                      required: "Ingrese su correo electronico",
                      minLength: {
                        value: 8,
                        message: "El correo es muy corto, ingrese otro",
                      },
                    })}
                    onChange={handleCorreoChange}
                    className={`${errors.correo ? 'error-input' : ''} ${dirtyFields.correo && !errors.correo} ? 'success-input' : ''}`}
                />
                {errors.correo && (
                  <div className="form-register-instructor-content-data-field-error">
                      <label htmlFor="error">
                        {errors.correo.message}
                      </label>
                      <img src={AlertIcon} alt="Icono de alerta"/>
                  </div>
                )}

                {correo && !errors.correo && (
                    <div className="form-register-instructor-content-data-field-error">
                      <img className="check-icon" src={CheckIcon} alt="Icono de check"/>
                    </div>
                )}
              </div>
            </div>

            <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Contraseña*</label>
              <div className="form-register-instructor-content-data-field-input">
                <input
                  type="password"
                  id="contraseña"
                  placeholder="Ingrese su contraseña"
                  value={contraseña}
                  
                  {...register("contraseña", {
                    required: "Por favor, ingrese una contraseña",
                    minLength: {
                      value: 9,
                      message: "La contraseña es muy corta",
                    },
                    maxLength: {
                      value: 20,
                      message: "La contraseña es demasiado larga",
                    },
                  })}
                  onChange={handleContraseñaChange}
                  className={`${errors.contraseña ? 'error-input' : ''} ${dirtyFields.contraseña && !errors.contraseña} ? 'success-input' : ''}`}
                />
                {errors.contraseña && (
                  <div className="form-register-instructor-content-data-field-error">
                      <label htmlFor="error">
                        {errors.contraseña.message}
                      </label>
                      <img src={AlertIcon} alt="Icono de alerta"/>
                    </div>
                )}

                {contraseña && !errors.contraseña && (
                    <div className="form-register-instructor-content-data-field-error">
                      <img className="check-icon" src={CheckIcon} alt="Icono de check"/>
                    </div>
                )}
              </div> 
            </div>

            <div className="form-register-instructor-content-data-field">
              <label htmlFor="">Confirmar contraseña*</label>
              <div className="form-register-instructor-content-data-field-input">
                <input
                  type="password"
                  id="confirmarContraseña"
                  placeholder="Confirme su contraseña"
                  {...register("confirmacionContraseña", {
                    required: "Por favor, confirme su contraseña",
                    validate: validateConfirmacionContraseña,
                  })}
                  onChange={handleConfirmacionContraseñaChange}
                  className={`${errors.confirmacionContraseña ? 'error-input' : ''} ${dirtyFields.confirmacionContraseña && !errors.confirmacionContraseña ? 'success-input' : ''}`}
                />
                {errors.confirmacionContraseña && (
                  <div className="form-register-instructor-content-data-field-error">
                    <label htmlFor="error">
                      {errors.confirmacionContraseña.message}
                    </label>
                    <img src={AlertIcon} alt="Icono de alerta"/>
                  </div>
                )}

                {confirmacionContraseña && !errors.confirmacionContraseña && (
                    <div className="form-register-instructor-content-data-field-error">
                      <img className="check-icon" src={CheckIcon} alt="Icono de check"/>
                    </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="form-register-instructor-footer">
            <button
                type="button"
                className="form-register-course-instructor-button"
                onClick={handleCancel}
            >
              Cancelar
            </button>

            <button type="submit" className="form-register-instructor-footer-button">
              Registrar
            </button>
        </section>
      </form>

      {showModalByClickInRegister && (
            <Modal
                title="Registro exitoso"
                description="Se registro correctamente el curso"
                txtBtnAccept="Acceptar"
                onAccept={() => 
                  {
                    reset();
                    setShowModalByClickInAccept(false)
                    navigate('/lista-cursos'); 
                  }}
            />  
      )}


      {showModalByClickInCancel && (
            <Modal
                title="¿Estas seguro?"
                description="¿Estas seguro de que desea cancelar el registro del curso?"
                txtBtnAccept="Si, seguro"
                txtBtnCancel="No, continuar"
                showBtnCancel={true}
                onAccept={() => {
                  reset();
                  setShowModalByClickInCancel(false);
                  navigate('/lista-cursos'); // Usa navigate en lugar de history.push
                }}
                onCancel={() => setShowModalByClickInCancel(false)}
            />
      )}
    </>
  );
};