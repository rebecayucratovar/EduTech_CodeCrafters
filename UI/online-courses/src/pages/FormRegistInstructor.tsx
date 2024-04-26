import logo from "../assets/LogoForm.png";
import { Modal } from "../components/Modal";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import AlertIcon from "../assets/icons/AlertIcon.svg";
import CheckIcon from "../assets/icons/CheckIcon.svg";
import { addInstructor} from "../slices/instructors.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {addCourse} from "../slices/courses.tsx";

export const FormRegistInstructor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const onSubmit = handleSubmit(async () => {
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

    /**if (data.file) {
      const course = {
        id: Date.now().toString(),
        ...data,
        file: data.file[0],
      };
      dispatch(addCourse(course));
      setShowModalByClickInAccept(true);

      const formData = new FormData();

      formData.append("titulo", data.titulo);
      formData.append("descripcion", data.descripcion);
      formData.append("categoria", data.categoria);
      if (data.costo) {
        formData.append("costo", data.costo);
      }
      formData.append("requisitos", data.requisitos);
      formData.append("aprenderas", data.aprenderas);
      formData.append("file", data.file[0]);
      try {
        // TODO: Cambiar el path por el de la API deployada
        const response = await fetch("http://localhost:3039/v1/cursos/save", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Error al registrar el curso");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }**/
  });
  return (
      <>
        <form className="form-register-course" onSubmit={onSubmit}>
          <section className="form-register-course-logo">
            <img src={logo} alt="logo" />
          </section>

          <section className="form-register-course-content">
            <label className="form-register-course-content-title">
              Registro de nuevo curso
            </label>

            <div className="form-register-course-content-data">
              <div className="form-register-course-content-data-field">
                <label htmlFor="nombreCompleto">NombreCompleto*</label>
                <div className="form-register-course-content-data-field-input">
                  <input
                      type="text"
                      id="nombreCompleto"
                      placeholder="Ingrese el nombreCompleto del curso"
                      {...register("nombreCompleto", {
                        required: {
                          value: true,
                          message: "Por favor, ingrese el nombreCompleto del curso",
                        },
                        maxLength: {
                          value: 40,
                          message: "El nombreCompleto no debe tener mas de 40 caracteres",
                        },
                      })}
                      maxLength={40}
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
                        <img src={AlertIcon} alt="Icono de alerta" />
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
                      placeholder="Ingrese la nombreUsuario del curso"
                      {...register("nombreUsuario", {
                        required: {
                          value: true,
                          message: "Porfavor, ingrese su nombre",
                        },
                        maxLength: {
                          value: 40,
                          message: "El nombre del intructor no debe ser mayor a 40",
                        },
                        pattern: {
                          value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                          message: "El nombre solo debe contener letras",
                        },
                      })}
                      maxLength={40}
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
                        <img src={AlertIcon} alt="Icono de alerta" />
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
                <label htmlFor="fechaNacimiento">Fecha de Nacimiento*</label>
                <div className="form-register-course-content-data-field-input">
                <textarea
                    id="fechaNacimiento"
                    placeholder="Describa lo que se aprendera una ves terminado el curso"
                    {...register("fechaNacimiento", {
                      required: {
                        value: true,
                        message: "Por favor, rellene el campo.",
                      },
                      maxLength: {
                        value: 400,
                        message:
                            "La nombreUsuario no deben tener mas de 400 caracteres",
                      },
                    })}
                    maxLength={400}
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
                        <img src={AlertIcon} alt="Icono de check" />
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
                    <option value="DESARROLLO_WEB"> Instructor</option>
                  </select>

                  {errors.tipoUsuario && (
                      <div className="form-register-course-content-data-field-error">
                        <label htmlFor="error">
                          {JSON.stringify(errors.tipoUsuario.message).replace(
                              /^"|"$/g,
                              ""
                          )}
                        </label>
                        <img src={AlertIcon} alt="Icono de alerta" />
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
                <label htmlFor="contraseña">Contraseña*</label>
                <div className="form-register-course-content-data-field-input">
                <textarea
                    id="contraseña"
                    placeholder="Describa lo que se aprendera una ves terminado el curso"
                    {...register("contraseña", {
                      required: {
                        value: true,
                        message: "Por favor, rellene el campo.",
                      },
                      maxLength: {
                        value: 400,
                        message:
                            "La nombreUsuario no deben tener mas de 400 caracteres",
                      },
                    })}
                    maxLength={400}
                    className={`${errors.contraseña ? "error-input" : ""} ${
                        dirtyFields.contraseña && !errors.contraseña
                            ? "success-input"
                            : ""
                    }`}
                />
                  {errors.contraseña && (
                      <div className="form-register-course-content-data-field-error">
                        <label htmlFor="error">
                          {JSON.stringify(errors.contraseña.message).replace(
                              /^"|"$/g,
                              ""
                          )}
                        </label>
                        <img src={AlertIcon} alt="Icono de check" />
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
                <label htmlFor="confirmacionContraseña">confirmacionContraseña</label>
                <div className="form-register-course-content-data-field-input">
                <textarea
                    id="confirmacionContraseña"
                    placeholder="Ingrese los confirmacionContraseña para unirse al curso"
                    {...register("confirmacionContraseña", {
                      maxLength: {
                        value: 400,
                        message:
                            "Los confirmacionContraseña no deben tener mas de 400 caracteres",
                      },
                    })}
                    className={`${errors.confirmacionContraseña ? "error-input" : ""} ${
                        dirtyFields.confirmacionContraseña && !errors.confirmacionContraseña
                            ? "success-input"
                            : ""
                    }`}
                    maxLength={400}
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
                        <img src={CheckIcon} alt="Icono de alerta" />
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
                description="Se registró correctamente el curso"
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
                description="¿Estás seguro de que desea cancelar el registro del curso?"
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
