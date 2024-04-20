import logo from "../assets/LogoForm.png";
import { Modal } from "../components/Modal";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import AlertIcon from "../assets/icons/AlertIcon.svg";
import CheckIcon from "../assets/icons/CheckIcon.svg";
import { addCourse } from "../slices/courses";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const FormRegisterCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm({
    defaultValues: {
      titulo: "",
      descripcion: "",
      categoria: "default",
      file: null,
      costo: null,
      requisitos: "",
      aprenderas: "",
    },
  });

  const [showModalByClickInRegister, setShowModalByClickInAccept] =
    useState(false);
  const [showModalByClickInCancel, setShowModalByClickInCancel] =
    useState(false);

  const handleCancel = () => {
    setShowModalByClickInCancel(true);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (
      errors.titulo ||
      errors.descripcion ||
      errors.categoria ||
      errors.file ||
      errors.costo ||
      errors.requisitos ||
      errors.aprenderas
    ) {
      return;
    }

    if (data.file) {
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
            Registro de nuevo curso
          </label>

          <div className="form-register-course-content-data">
            <div className="form-register-course-content-data-field">
              <label htmlFor="titulo">Titulo*</label>
              <div className="form-register-course-content-data-field-input">
                <input
                  type="text"
                  id="titulo"
                  placeholder="Ingrese el titulo del curso"
                  {...register("titulo", {
                    required: {
                      value: true,
                      message: "El título es requerido",
                    },
                    maxLength: {
                      value: 40,
                      message: "El titulo no deben tener mas de 40 caracteres",
                    },
                  })}
                  className={`${errors.titulo ? "error-input" : ""} ${
                    dirtyFields.titulo && !errors.titulo ? "success-input" : ""
                  }`}
                  maxLength={40}
                />
                {errors.titulo && (
                  <div className="form-register-course-content-data-field-error">
                    <label htmlFor="error">
                      {JSON.stringify(errors.titulo.message).replace(
                        /^"|"$/g,
                        ""
                      )}
                    </label>
                    <img src={AlertIcon} alt="Icono de alerta" />
                  </div>
                )}

                {dirtyFields.titulo && !errors.titulo && (
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
              <label htmlFor="descripcion">Descripción*</label>
              <div className="form-register-course-content-data-field-input">
                <input
                  type="text"
                  id="descripcion"
                  placeholder="Ingrese la descripción"
                  {...register("descripcion", {
                    required: {
                      value: true,
                      message: "La descripción es requerida",
                    },
                    maxLength: {
                      value: 400,
                      message:
                        "La descripción no deben tener mas de 400 caracteres",
                    },
                  })}
                  className={`${errors.descripcion ? "error-input" : ""} ${
                    dirtyFields.descripcion && !errors.descripcion
                      ? "success-input"
                      : ""
                  }`}
                />

                {errors.descripcion && (
                  <div className="form-register-course-content-data-field-error">
                    <label htmlFor="error">
                      {JSON.stringify(errors.descripcion.message).replace(
                        /^"|"$/g,
                        ""
                      )}
                    </label>
                    <img src={AlertIcon} alt="Icono de alerta" />
                  </div>
                )}

                {dirtyFields.descripcion && !errors.descripcion && (
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
              <label htmlFor="categoria">Categoria*</label>
              <div className="form-register-course-content-data-field-input">
                <select
                  id="categoria"
                  {...register("categoria", {
                    required: {
                      value: true,
                      message: "La categoria es requerida",
                    },
                    validate: (value) =>
                      value !== "default" || "La categoría es requerida",
                  })}
                  className={`${errors.categoria ? "error-input" : ""} ${
                    dirtyFields.categoria && !errors.categoria
                      ? "success-input"
                      : ""
                  }`}
                >
                  <option value="default">Selecciona una categoría</option>
                  <option value="DESARROLLO_WEB">Desarrollo web</option>
                  <option value="DESARROLLO_DE_APLICACIONES_MOVILES">
                    Desarrollo de aplicaciones móviles
                  </option>
                  <option value="CIENCIA_DE_DATOS_Y_ANALISIS_DE_DATOS">
                    Ciencias de datos y análisis de datos
                  </option>
                  <option value="DESARROLLO_DE_SOFTWARE">
                    Desarrollo de software
                  </option>
                  <option value="SEGURIDAD_INFORMATICA_Y_CIBERSEGURIDAD">
                    Seguridad informática y ciberseguridad
                  </option>
                </select>

                {errors.categoria && (
                  <div className="form-register-course-content-data-field-error">
                    <label htmlFor="error">
                      {JSON.stringify(errors.categoria.message).replace(
                        /^"|"$/g,
                        ""
                      )}
                    </label>
                    <img src={AlertIcon} alt="Icono de alerta" />
                  </div>
                )}

                {dirtyFields.categoria && !errors.categoria && (
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
              <label htmlFor="file">Imagen*</label>
              <div className="form-register-course-content-data-field-input field-img">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png, .webp"
                  {...register("file", {
                    required: {
                      value: true,
                      message: "Seleccione algun archivo",
                    },
                  })}
                  className={`${errors.file ? "error-input" : ""} ${
                    dirtyFields.file && !errors.file ? "success-input" : ""
                  }`}
                />

                {errors.file && (
                  <div className="form-register-course-content-data-field-error">
                    <label htmlFor="error">
                      {JSON.stringify(errors.file.message).replace(
                        /^"|"$/g,
                        ""
                      )}
                    </label>
                    <img src={AlertIcon} alt="Icono de alerta" />
                  </div>
                )}

                {dirtyFields.file && !errors.file && (
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
              <label htmlFor="costo">Costo (Bs)*</label>
              <div className="form-register-course-content-data-field-input">
                <input
                  type="number"
                  id="costo"
                  placeholder="Ingrese el monto en bolivianos"
                  min={0}
                  max={99999.99}
                  step={0.01}
                  {...register("costo", {
                    required: {
                      value: true,
                      message: "Ingrese el costo del curso.",
                    },
                    pattern: {
                      value: /^\d{1,5}(?:\.\d{1,2})?$/,
                      message:
                        "El costo debe ser un valor numérico de hasta cinco dígitos",
                    },
                  })}
                  className={`${errors.costo ? "error-input" : ""} ${
                    dirtyFields.costo && !errors.costo ? "success-input" : ""
                  }`}
                  onKeyPress={(event) => {
                    // Permite solo números y puntos (para decimales)
                    if (!/[0-9.0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />

                {errors.costo && (
                  <div className="form-register-course-content-data-field-error">
                    <label htmlFor="error">
                      {JSON.stringify(errors.costo.message).replace(
                        /^"|"$/g,
                        ""
                      )}
                    </label>
                    <img src={AlertIcon} alt="Icono de check" />
                  </div>
                )}

                {dirtyFields.costo && !errors.costo && (
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
              <label htmlFor="requisitos">Requisitos</label>
              <div className="form-register-course-content-data-field-input">
                <textarea
                  id="requisitos"
                  placeholder="Ingrese los requisitos para unirse al curso"
                  {...register("requisitos", {
                    maxLength: {
                      value: 400,
                      message:
                        "Los requisitos no deben tener mas de 400 caracteres",
                    },
                  })}
                  className={`${errors.requisitos ? "error-input" : ""} ${
                    dirtyFields.requisitos && !errors.requisitos
                      ? "success-input"
                      : ""
                  }`}
                  maxLength={400}
                />

                {errors.requisitos && (
                  <div className="form-register-course-content-data-field-error">
                    <label htmlFor="error">
                      {JSON.stringify(errors.requisitos.message).replace(
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

                {dirtyFields.requisitos && !errors.requisitos && (
                  <div className="form-register-course-content-data-field-error">
                    <img src={CheckIcon} alt="Icono de alerta" />
                  </div>
                )}
              </div>
            </div>

            <div className="form-register-course-content-data-field">
              <label htmlFor="aprenderas">Lo que aprenderás*</label>
              <div className="form-register-course-content-data-field-input">
                <textarea
                  id="aprenderas"
                  placeholder="Describa lo que se aprendera una ves terminado el curso"
                  {...register("aprenderas", {
                    required: {
                      value: true,
                      message: "Por favor, rellene el campo.",
                    },
                    maxLength: {
                      value: 400,
                      message:
                        "La descripcion no deben tener mas de 400 caracteres",
                    },
                  })}
                  maxLength={400}
                  className={`${errors.aprenderas ? "error-input" : ""} ${
                    dirtyFields.aprenderas && !errors.aprenderas
                      ? "success-input"
                      : ""
                  }`}
                />
                {errors.aprenderas && (
                  <div className="form-register-course-content-data-field-error">
                    <label htmlFor="error">
                      {JSON.stringify(errors.aprenderas.message).replace(
                        /^"|"$/g,
                        ""
                      )}
                    </label>
                    <img src={AlertIcon} alt="Icono de check" />
                  </div>
                )}

                {dirtyFields.aprenderas && !errors.aprenderas && (
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
          txtBtnAccept="Acceptar"
          onAccept={() => {
            reset();
            setShowModalByClickInAccept(false);
            navigate("/lista-cursos");
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
