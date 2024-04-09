import { useState } from "react";
import logo from "../assets/logo.jpeg";
import { Modal } from "../components/Modal";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import AlertIcon from "../assets/icons/AlertIcon.svg";
import CheckIcon from "../assets/icons/CheckIcon.svg";
import { addCourse } from "../slices/courses";

export const FormRegisterCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm({
    defaultValues: {
      titulo: "",
      instructor: "",
      categoria: "default",
      file: null,
      costo: 0,
      requisitos: "",
      descripcion: "",
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
      errors.titulo ||
      errors.instructor ||
      errors.categoria ||
      errors.file ||
      errors.costo ||
      errors.requisitos ||
      errors.descripcion
    ) {
      return;
    }
    reset();
    const modifiedData = {
      ...data,
      id: Math.random().toString(36).substring(7),
      file: null,
    };
    dispatch(addCourse(modifiedData));
    setShowModalByClickInAccept(true);
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
                    <img src={CheckIcon} alt="Icono de check" />
                  </div>
                )}
              </div>
            </div>

            <div className="form-register-course-content-data-field">
              <label htmlFor="instructor">Instructor*</label>
              <div className="form-register-course-content-data-field-input">
                <input
                  type="text"
                  id="instructor"
                  placeholder="Ingrese su nombre completo"
                  {...register("instructor", {
                    required: {
                      value: true,
                      message: "El instructor es requerido",
                    },
                  })}
                />

                {errors.instructor && (
                  <div className="form-register-course-content-data-field-error">
                    <label htmlFor="error">
                      {JSON.stringify(errors.instructor.message).replace(
                        /^"|"$/g,
                        ""
                      )}
                    </label>
                    <img src={AlertIcon} alt="Icono de alerta" />
                  </div>
                )}

                {dirtyFields.instructor && !errors.instructor && (
                  <div className="form-register-course-content-data-field-error">
                    <img src={CheckIcon} alt="Icono de check" />
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
                >
                  <option value="default">Selecciona una categoría</option>
                  <option value="Desarollo web">Desarrollo web</option>
                  <option value="Desarrollo de aplicaciones móviles">
                    Desarrollo de aplicaciones móviles
                  </option>
                  <option value="Ciencias de datos y análisis de datos">
                    Ciencias de datos y análisis de datos
                  </option>
                  <option value="Desarrollo de software">
                    Desarrollo de software
                  </option>
                  <option value="Seguridad informática y ciberseguridad">
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
                    <img src={CheckIcon} alt="Icono de check" />
                  </div>
                )}
              </div>
            </div>

            <div className="form-register-course-content-data-field">
              <label htmlFor="file">Imagen*</label>
              <div className="form-register-course-content-data-field-input">
                <input
                  type="file"
                  {...register("file", {
                    required: {
                      value: true,
                      message: "Seleccione algun archivo",
                    },
                  })}
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
                    <img src={CheckIcon} alt="Icono de check" />
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
                  {...register("costo", {
                    required: {
                      value: true,
                      message: "El costo es requerido",
                    },
                    pattern: {
                      value: /^\d{1,5}(?:\.\d{1,2})?$/,
                      message:
                        "El costo debe ser un valor numérico de hasta cinco dígitos y máximo dos decimales opcionales ej: 1000.00 o 1000",
                    },
                  })}
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
                    <img src={CheckIcon} alt="Icono de alerta" />
                  </div>
                )}
              </div>
            </div>

            <div className="form-register-course-content-data-field">
              <label htmlFor="requisitos">Requisitos</label>
              <div className="form-register-course-content-data-field-input">
                <input
                  type="text"
                  id="requisitos"
                  placeholder="Ingrese los requisitos para unirse al curso"
                  {...register("requisitos", {
                    maxLength: {
                      value: 400,
                      message:
                        "Los requisitos no deben tener mas de 400 caracteres",
                    },
                  })}
                />

                {errors.requisitos && (
                  <div className="form-register-course-content-data-field-error">
                    <label htmlFor="error">
                      {JSON.stringify(errors.requisitos.message).replace(
                        /^"|"$/g,
                        ""
                      )}
                    </label>
                    <img src={AlertIcon} alt="Icono de check" />
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
              <label htmlFor="descripcion">Lo que aprenderás*</label>
              <div className="form-register-course-content-data-field-input">
                <input
                  type="text"
                  id="descripcion"
                  placeholder="Describa lo que se aprendera una ves terminado el curso"
                  {...register("descripcion", {
                    required: {
                      value: true,
                      message: "La descripción es requerida",
                    },
                    maxLength: {
                      value: 400,
                      message:
                        "La descripcion no deben tener mas de 400 caracteres",
                    },
                  })}
                />

                {errors.descripcion && (
                  <div className="form-register-course-content-data-field-error">
                    <label htmlFor="error">
                      {JSON.stringify(errors.descripcion.message).replace(
                        /^"|"$/g,
                        ""
                      )}
                    </label>
                    <img src={AlertIcon} alt="Icono de check" />
                  </div>
                )}

                {dirtyFields.descripcion && !errors.descripcion && (
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
          description="Se registro correctamente el curso"
          txtBtnAccept="Acceptar"
          onAccept={() => setShowModalByClickInAccept(false)}
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
          }}
          onCancel={() => setShowModalByClickInCancel(false)}
        />
      )}
    </>
  );
};
