import logo from "../assets/LogoForm.png";
import { Modal } from "../components/Modal";
//import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import AlertIcon from "../assets/icons/AlertIcon.svg";
import CheckIcon from "../assets/icons/CheckIcon.svg";
//import { addInstructor} from "../slices/instructors.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const FormRegistInstructor = () => {
  const navigate = useNavigate();
 // const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm({
    defaultValues: {
      nombreCompleto: "",
      nombreUsuario: "",
      fechaNacimiento: "",
      tipoUsuario: "default",
      correo: "",
      contraseña: "",
      confirmacionContraseña: "",
    },
    mode: 'onChange'
  });

  const [showModalByClickInRegister, setShowModalByClickInAccept] =
      useState(false);
  const [showModalByClickInCancel, setShowModalByClickInCancel] =
      useState(false);
  const [showModalError, setShowModalError] = useState(false);

  const handleCancel = () => {
    setShowModalByClickInCancel(true);
  };

    const onSubmit = handleSubmit(async (formData) => {
        try {
            const response = await fetch("https://edutech--muddy-smoke-1854.fly.dev/usuarios/saveUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Si la solicitud fue exitosa, puedes manejar la respuesta aquí
                const usuarioGuardado = await response.json();
                console.log("Usuario guardado:", usuarioGuardado);
                setShowModalByClickInAccept(true); // Mostrar modal de éxito
            } else {
                // Si la solicitud no fue exitosa, puedes manejar el error aquí
                console.error("Error al guardar el usuario:", response.status);
                // Puedes mostrar un mensaje de error al usuario si lo deseas
                setShowModalError(true); // Mostrar modal de error
            }
        } catch (error) {
            console.error("Error al procesar la solicitud:", error);
            // Puedes manejar cualquier error de red u otros errores aquí
            setShowModalError(true); // Mostrar modal de error
        }
    });

    return (
      <>
        <form className="form-register-course" onSubmit={onSubmit}>
          <section className="form-register-course-logo">
            <img src={logo} alt="logo" />
          </section>

          <section className="form-register-course-content">
            <label className="form-register-course-content-title">
              Formulario de registro
            </label>

            <div className="form-register-course-content-data">
              <div className="form-register-course-content-data-field">
                <label htmlFor="nombreCompleto">Nombre Completo*</label>
                <div className="form-register-course-content-data-field-input">
                  <input
                      type="text"
                      id="nombreCompleto"
                      placeholder="Ingrese su nombre completo"
                      {...register("nombreCompleto", {
                        required: {
                          value: true,
                          message: "Por favor, ingrese su nombre completo",
                        },
                        maxLength: {
                          value: 20,
                          message: "El nombre completo no debe tener mas de 20 caracteres",
                        },
                        minLength: {
                          value: 2,
                          message: "El nombre completo debe tener mas de 2 caracteres",
                        },
                        pattern: {
                          value: /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/,  // Acepta letras y espacios
                          message: "El nombre completo solo debe contener letras",
                        }
                      })}
                      maxLength={20}
                      onKeyDown={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (e.key === " " && target.value.slice(-1) === " ") {
                          e.preventDefault(); // Evita que se ingrese el segundo espacio en blanco
                        }
                        if (target.value.length >= 20 && e.key !== "Backspace" && e.key !== "Delete") {
                          e.preventDefault();
                        }
                      }}
                      className={`${errors.nombreCompleto ? "error-input" : ""} ${
                          dirtyFields.nombreCompleto && !errors.nombreCompleto ? "success-input" : ""
                      }`}
                  />
                  {errors.nombreCompleto && (
                      <div className="form-register-course-content-data-field-error">
                        <label htmlFor="error">
                          {JSON.stringify(errors.nombreCompleto.message).replace(
                              /^"|"$/g,
                              ""
                          )}
                        </label>
                        <img src={AlertIcon} alt="Icono de alerta"/>
                      </div>
                  )}

                  {dirtyFields.nombreCompleto && !errors.nombreCompleto && (
                      <div className="form-register-course-content-data-field-error">
                        <img
                            className="check-icon"
                            src={CheckIcon}
                            alt="Icono de check"
                        />
                      </div>
                  )}
                </div>
              </div>

              <div className="form-register-course-content-data-field">
                <label htmlFor="nombreUsuario">Nombre Usuario*</label>
                <div className="form-register-course-content-data-field-input">
                  <input
                      type="text"
                      id="nombreUsuario"
                      placeholder="Ingrese un nombre de Usuario"
                      {...register("nombreUsuario", {
                        required: {
                          value: true,
                          message: "Porfavor, ingrese un nombre de usuario",
                        },
                        maxLength: {
                          value: 20,
                          message: "El nombre del intructor no debe ser mayor a 20",
                        },
                        pattern: {
                          value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]+$/,
                          message: "No acepta caracteres especiales",
                        },
                      })}
                      maxLength={20}
                      onKeyDown={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (e.key === " " && target.value.slice(-1) === " ") {
                          e.preventDefault(); // Evita que se ingrese el segundo espacio en blanco
                        }
                        if (target.value.length >= 20 && e.key !== "Backspace" && e.key !== "Delete") {
                          e.preventDefault();
                        }
                      }}
                      className={`${errors.nombreUsuario ? "error-input" : ""} ${
                          dirtyFields.nombreUsuario && !errors.nombreUsuario
                              ? "success-input"
                              : ""
                      }`}
                  />

                  {errors.nombreUsuario && (
                      <div className="form-register-course-content-data-field-error">
                        <label htmlFor="error">
                          {JSON.stringify(errors.nombreUsuario.message).replace(
                              /^"|"$/g,
                              ""
                          )}
                        </label>
                        <img src={AlertIcon} alt="Icono de alerta"/>
                      </div>
                  )}

                  {dirtyFields.nombreUsuario && !errors.nombreUsuario && (
                      <div className="form-register-course-content-data-field-error">
                        <img
                            className="check-icon"
                            src={CheckIcon}
                            alt="Icono de check"
                        />
                      </div>
                  )}
                </div>
              </div>

              <div className="form-register-course-content-data-field">
                <label htmlFor="tipoUsuario">Tipo de Usuario*</label>
                <div className="form-register-course-content-data-field-input">
                  <select
                      id="tipoUsuario"
                      {...register("tipoUsuario", {
                        required: {
                          value: true,
                          message: "Seleccione alguna tipoUsuario",
                        },
                        validate: (value) =>
                            value !== "default" || "La categoría es requerida",
                      })}
                      className={`${errors.tipoUsuario ? "error-input" : ""} ${
                          dirtyFields.tipoUsuario && !errors.tipoUsuario
                              ? "success-input"
                              : ""
                      }`}
                  >
                    <option value="default">Selecciona tipo de usuario</option>
                    <option value="INSTRUCTOR"> Instructor</option>
                  </select>

                  {errors.tipoUsuario && (
                      <div className="form-register-course-content-data-field-error">
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
                      <div className="form-register-course-content-data-field-error">
                        <img
                            className="check-icon"
                            src={CheckIcon}
                            alt="Icono de check"
                        />
                      </div>
                  )}
                </div>
              </div>

              <div className="form-register-course-content-data-field">
                <label htmlFor="fechaNacimiento">Fecha de Nacimiento*</label>
                <div className="form-register-course-content-data-field-input">
                <input
                    type={"date"}
                    id="fechaNacimiento"
                    max="2006-01-01"
                    placeholder="Describa lo que se aprendera una ves terminado el curso"
                    {...register("fechaNacimiento", {
                      required: {
                        value: true,
                        message: "Por favor, seleccione su fecha de nacimiento.",

                      },
                      validate: {
                        dateBefore20060101: value => value <= '2006-01-01' || "La fecha de nacimiento debe ser anterior al 01/01/2006",
                        dateNotEmpty: value => value !== '' || "La fecha de nacimiento es obligatoria",
                      }
                    })}
                    className={`${errors.fechaNacimiento ? "error-input" : ""} ${
                        dirtyFields.fechaNacimiento && !errors.fechaNacimiento
                            ? "success-input"
                            : ""
                    }`}
                />
                  {errors.fechaNacimiento && (
                      <div className="form-register-course-content-data-field-error">
                        <label htmlFor="error">
                          {JSON.stringify(errors.fechaNacimiento.message).replace(
                              /^"|"$/g,
                              ""
                          )}
                        </label>
                        <img src={AlertIcon} alt="Icono de check"/>
                      </div>
                  )}

                  {dirtyFields.fechaNacimiento && !errors.fechaNacimiento && (
                      <div className="form-register-course-content-data-field-error">
                        <img
                            className="check-icon"
                            src={CheckIcon}
                            alt="Icono de alerta"
                        />
                      </div>
                  )}
                </div>
              </div>

              <div className="form-register-course-content-data-field">
                <label htmlFor="correo">Correo electrónico*</label>
                <div className="form-register-course-content-data-field-input">
                  <input
                      type="text"
                      id="correo"
                      placeholder="Ingrese su correo"
                      {...register("correo", {
                        required: {
                          value: true,
                          message: "Porfavor, ingrese su correo electrónico",
                        },
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Por favor, ingrese una dirección de correo electrónico válida",
                        },
                      })}
                      maxLength={150}
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                          e.preventDefault();
                        }
                      }}
                      className={`${errors.correo ? "error-input" : ""} ${
                          dirtyFields.correo && !errors.correo
                              ? "success-input"
                              : ""
                      }`}
                  />

                  {errors.correo && (
                      <div className="form-register-course-content-data-field-error">
                        <label htmlFor="error">
                          {JSON.stringify(errors.correo.message).replace(
                              /^"|"$/g,
                              ""
                          )}
                        </label>
                        <img src={AlertIcon} alt="Icono de alerta"/>
                      </div>
                  )}

                  {dirtyFields.correo && !errors.correo && (
                      <div className="form-register-course-content-data-field-error">
                        <img
                            className="check-icon"
                            src={CheckIcon}
                            alt="Icono de check"
                        />
                      </div>
                  )}
                </div>
              </div>
              <div className="form-register-course-content-data-field">
                <label htmlFor="contraseña">Contraseña*</label>
                <div className="form-register-course-content-data-field-input">
                  <input
                      type="password"
                      id="contraseña"
                      placeholder="Ingrese su contraseña"
                      {...register("contraseña", {
                        required: 'Por favor, ingrese su contraseña',
                        validate: (value) => {
                          const isValidLength = value.length >= 8 && value.length <= 20;
                          const containsLetter = /[a-zA-Z]/.test(value);
                          const containsNumber = /\d/.test(value);
                          const containsSymbol = /[^\w\s]/.test(value); // Verifica si hay un símbolo excepto letras y números

                          if (!isValidLength || !containsLetter || !containsNumber || !containsSymbol) {
                            return "Contraseña invalida, no cumple con los caracteres del tipo y tamaño";
                          }
                          return true;
                        },
                      })}
                      onKeyDown={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (e.key === " " && target.value.slice(-1) === " ") {
                          e.preventDefault(); // Evita que se ingrese el segundo espacio en blanco
                        }
                        if (target.value.length >= 20 && e.key !== "Backspace" && e.key !== "Delete") {
                          e.preventDefault();
                        }
                      }}
                      className={`${errors.contraseña ? "error-input" : ""} ${
                          dirtyFields.contraseña && !errors.contraseña
                              ? "success-input"
                              : ""
                      }`}
                  />
                  <div className="form-register-course-content-data-field-message">
                    Use 8 o más caracteres con combinación de letras, números y símbolos
                  </div>
                  {errors.contraseña && (
                      <div className="form-register-course-content-data-field-error">
                        <label htmlFor="error">
                          {JSON.stringify(errors.contraseña.message).replace(
                              /^"|"$/g,
                              ""
                          )}
                        </label>
                        <img src={AlertIcon} alt="Icono de check"/>
                      </div>
                  )}

                  {dirtyFields.contraseña && !errors.contraseña && (
                      <div className="form-register-course-content-data-field-error">
                        <img
                            className="check-icon"
                            src={CheckIcon}
                            alt="Icono de alerta"
                        />
                      </div>
                  )}
                </div>
              </div>

              <div className="form-register-course-content-data-field">
                <label htmlFor="confirmacionContraseña">Confirmar contraseña*</label>
                <div className="form-register-course-content-data-field-input">
                  <input
                      type="password"
                    id="confirmacionContraseña"
                    placeholder="Confirme su contraseña"
                    {...register("confirmacionContraseña", {
                      required: 'Por favor, confirme su contraseña',
                      validate: (value, { contraseña }) => value === contraseña || 'Las contraseñas no coinciden',
                    })}
                      onKeyDown={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (e.key === " " && target.value.slice(-1) === " ") {
                          e.preventDefault(); // Evita que se ingrese el segundo espacio en blanco
                        }
                        if (target.value.length >= 20 && e.key !== "Backspace" && e.key !== "Delete") {
                          e.preventDefault();
                        }
                      }}
                    className={`${errors.confirmacionContraseña ? "error-input" : ""} ${
                        dirtyFields.confirmacionContraseña && !errors.confirmacionContraseña
                            ? "success-input"
                            : ""
                    }`}
                />
                  {errors.confirmacionContraseña && (
                      <div className="form-register-course-content-data-field-error">
                        <label htmlFor="error">
                          {JSON.stringify(errors.confirmacionContraseña.message).replace(
                              /^"|"$/g,
                              ""
                          )}
                        </label>
                        <img
                            className="check-icon"
                            src={AlertIcon}
                            alt="Icono de check"
                        />
                      </div>
                  )}

                  {dirtyFields.confirmacionContraseña && !errors.confirmacionContraseña && (
                      <div className="form-register-course-content-data-field-error">
                        <img src={CheckIcon} alt="Icono de alerta"/>
                      </div>
                  )}
                </div>
              </div>

            </div>
          </section>

          <section className="form-register-course-footer">
            <button
                type="button"
                className="form-register-course-footer-button"
                onClick={handleCancel}
            >
              Cancelar
            </button>

            <button type="submit" className="form-register-course-footer-button">
              Registrar
            </button>
          </section>
        </form>

        {showModalByClickInRegister && (
            <Modal
                title="Registro exitoso"
                description="Se registró correctamente"
                txtBtnAccept="Aceptar"
                onAccept={() => {
                  reset();
                  setShowModalByClickInAccept(false);
                  navigate("/lista-cursos");
                }}
            />
        )}

        {showModalError && (
            <Modal
                title="Error inesperado"
                description="No se pudo guardar el registro"
                txtBtnAccept="Aceptar"
                onAccept={() => {
                  reset();
                  setShowModalError(false);
                }}
            />
        )}

        {showModalByClickInCancel && (
            <Modal
                title="¿Estás seguro?"
                description="¿Estás seguro de que desea cancelar el registro?"
                txtBtnAccept="Si, seguro"
                txtBtnCancel="No, continuar"
                showBtnCancel={true}
                onAccept={() => {
                  reset();
                  setShowModalByClickInCancel(false);
                  navigate("/lista-cursos"); // Usa navigate en lugar de history.push
                }}
                onCancel={() => setShowModalByClickInCancel(false)}
            />
        )}
      </>
  );
};
