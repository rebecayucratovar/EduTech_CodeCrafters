import React, { useState } from "react";
import logo from "../assets/LogoForm.png";
import { Modal } from "../components/Modal";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import AlertIcon from "../assets/icons/AlertIcon.svg";
import CheckIcon from "../assets/icons/CheckIcon.svg";
import { addCourse } from "../slices/courses";
import { useNavigate } from 'react-router-dom';


export const FormRegisterCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [titulo, setTitulo] = useState("");
  const [instructor, setInstructor] = useState("");
  const [costo, setCosto] = useState("");
  const [requisitos, setRequisitos] = useState("");
  const [descripcion, setDescripcion] = useState("");

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
      costo: "",
      requisitos: "",
      descripcion: ""   ,
    },
  });

  const [showModalByClickInRegister, setShowModalByClickInAccept] =
    useState(false);

  const [showModalByClickInCancel, setShowModalByClickInCancel] =
    useState(false);

  const handleCancel = () => {
    setShowModalByClickInCancel(true);
  };

  const handleTituloChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/ {2,}/g, ' ');
    const formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
    setTitulo(formattedValue);
  };

  const handleInstructorChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/ {2,}/g, ' ');
    const formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
    setInstructor(formattedValue);
  };

  const handleCostoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.replace(/\s+/g, '').replace(/[^0-9,]/g, '');
    setCosto(value); // Almacenar el valor sin conversión
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      convertCosto();
    }
  };

  const convertCosto = () => {
    let value = costo;
    // Si el valor termina en un número entero, agrega ",00" al final
    if (/^\d+$/.test(value)) {
      value += ",00";
    }
    const match = value.match(/^(\d{1,5}(,\d{0,2})?)/);
    if (match) {
      value = match[1];
    }
    setCosto(value);
  };
  
  const handleRequisitosChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = event.target.value;
    value = value.replace(/ {2,}/g, ' ');
    setRequisitos(value);
  }; 

  const handleDescripcionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = event.target.value;
    value = value.replace(/ {2,}/g, ' ');
    setDescripcion(value);
  };

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
    
      const modifiedData = {
        ...data,
        id: Math.random().toString(36).substring(7),
        file: null,
      }
      
      dispatch(addCourse(modifiedData));
      reset();
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
                  value={titulo}
                  autoComplete="off" 
                  {...register("titulo", {
                    required: {
                      value: true,
                      message: "Por favor, ingrese el título del curso",
                    },
                    minLength: {
                      value: 2,  
                      message: "El título es muy corto",
                    },
                    maxLength: {
                      value: 40,
                      message: "El título es muy largo",
                    },
                  })}
                  onChange={handleTituloChange}
                  className={`${errors.titulo ? 'error-input' : ''} ${ !errors.titulo && titulo ? 'success-input' : ''}`}
                />
                {errors.titulo && (
                  <div className="form-register-course-content-data-field-error">
                    <label htmlFor="error">
                      {JSON.stringify(errors.titulo.message).replace(
                        /^"|"$/g,
                        ""
                      )}
                    </label>
                    <img src={AlertIcon} alt="Icono de alerta"/>
                  </div>
                )}

                {!errors.titulo && titulo && (
                  <div className="form-register-course-content-data-field-error">
                    <img src={CheckIcon} alt="Icono de check"/>
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
                  value={instructor}
                  autoComplete="off" 
                  {...register("instructor", {
                    required: {
                      value: true,
                      message: "Por favor, ingrese su nombre completo",
                    },
                    maxLength: {
                      value: 40,
                      message: "El nombre que ingreso es muy largo",
                    },
                  })}
                  onChange={handleInstructorChange}
                  className={`${errors.instructor ? 'error-input' : ''} ${!errors.instructor && instructor ? 'success-input' : ''}`}
                />
                {errors.instructor && (
                  <div className="form-register-course-content-data-field-error">
                    <label htmlFor="error">
                      {JSON.stringify(errors.instructor.message).replace(
                        /^"|"$/g,
                        ""
                      )}
                    </label>
                    <img src={AlertIcon} alt="Icono de alerta"/>
                  </div>
                )}

                {!errors.instructor && instructor && (
                  <div className="form-register-course-content-data-field-error">
                    <img src={CheckIcon} alt="Icono de check"/>
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
                        message: "Seleccione alguna categoria",
                      },
                      validate: (value) =>
                          value !== "default" || "La categoría es requerida",
                    })}
                    className={`${errors.categoria ? 'error-input' : ''} ${dirtyFields.categoria && !errors.categoria ? 'success-input' : ''}`}

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
                      <img src={AlertIcon} alt="Icono de alerta"/>
                    </div>
                )}

                {dirtyFields.categoria && !errors.categoria && (
                    <div className="form-register-course-content-data-field-error">
                      <img src={CheckIcon} alt="Icono de check"/>
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
                        message: "Seleccione alguna imagen",
                      },
                    })}
                    className={`${errors.file ? 'error-input' : ''} ${dirtyFields.file && !errors.file ? 'success-input' : ''}`}

                />

                {errors.file && (
                    <div className="form-register-course-content-data-field-error">
                      <label htmlFor="error">
                        {JSON.stringify(errors.file.message).replace(
                            /^"|"$/g,
                            ""
                        )}
                      </label>
                      <img src={AlertIcon} alt="Icono de alerta"/>
                    </div>
                )}

                {dirtyFields.file && !errors.file && (
                    <div className="form-register-course-content-data-field-error">
                      <img src={CheckIcon} alt="Icono de check"/>
                    </div>
                )}
              </div>
            </div>

            <div className="form-register-course-content-data-field">
              <label htmlFor="costo">Costo (Bs)*</label>
              <div className="form-register-course-content-data-field-input">
              <input
                type="text"
                id="costo"
                placeholder="Ingrese el monto en bolivianos"
                value={costo}
                onKeyPress={handleKeyPress}
                autoComplete="off" 
                {...register("costo", {
                  required: {
                    value: true,
                    message: "Ingrese el costo del curso.",
                },
              })}
              onChange={handleCostoChange}
              className={`${errors.costo ? 'error-input' : ''} ${!errors.costo && costo ? 'success-input' : ''}`}
            />

                {errors.costo && (
                  <div className="form-register-course-content-data-field-error">
                    <label htmlFor="error" style={{ color: 'rgb(255, 0, 0)' }}>
                      {errors.costo.message}
                    </label>
                    <img src={AlertIcon} alt="Icono de alerta"/>
                  </div>
                )}

                {!errors.costo && costo && (
                  <div className="form-register-course-content-data-field-error">
                    <img src={CheckIcon} alt="Icono de check"/>
                  </div>
                )}
              </div>
            </div>

            <div className="form-register-course-content-data-field">
              <label htmlFor="requisitos">Requisitos</label>
              <div className="form-register-course-content-data-field-input">
                <textarea
                  id="requisitos"
                  value={requisitos}
                  placeholder="Ingrese los requisitos para unirse al curso"
                  {...register("requisitos", {
                    maxLength: {
                      value: 400,
                      message: "Los requisitos no deben tener más de 400 caracteres",
                    },
                  })}
                    onChange={handleRequisitosChange}
                    className={`${errors.requisitos ? 'error-input' : ''} ${!errors.requisitos && requisitos ? 'success-input' : ''}`}
                />
                {errors.requisitos && (
                  <div className="form-register-course-content-data-field-error">
                    <label htmlFor="error">
                      {JSON.stringify(errors.requisitos.message).replace(
                        /^"|"$/g,
                        ""
                      )}
                    </label>
                    {/* Icono de alerta */}
                    <img src={AlertIcon} alt="Icono de alerta"/>
                  </div>
                )}
                {!errors.requisitos && requisitos && (
                    <div className="form-register-course-content-data-field-error">
                      <img src={CheckIcon} alt="Icono de alerta"/>
                    </div>
                )}
              </div>
            </div>

            <div className="form-register-course-content-data-field">
              <label htmlFor="descripcion">Lo que aprenderás*</label>
              <div className="form-register-course-content-data-field-input">
                <textarea
                    id="descripcion"
                    value={descripcion}
                    placeholder="Describa lo que se aprendera una ves terminado el curso"
                    {...register("descripcion", {
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
                    onChange={handleDescripcionChange}
                    className={`${errors.descripcion ? 'error-input' : ''} ${!errors.descripcion && descripcion ? 'success-input' : ''}`}
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

                {!errors.descripcion && descripcion && (
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
              description="Se registro correctamente el curso"
              txtBtnAccept="Acceptar"
              onAccept={() => {
                setShowModalByClickInAccept(false);
                navigate('/lista-cursos'); // Usa navigate en lugar de history.push
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
