import { Modal } from "../components/Modal";
//import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import AlertIcon from "../assets/icons/AlertIcon.svg";
import CheckIcon from "../assets/icons/CheckIcon.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/LogoForm.png";

export const Comprar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { titulo, costo } = location.state;
 // const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm({
    defaultValues: {
      nombreCompleto: "",
      numeroTarjeta: null,
      fechaVencimiento: null,
      cvc: null,
    },
    mode: "onChange",
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
      errors.numeroTarjeta ||
      errors.fechaVencimiento ||
      errors.cvc
    ) {
      return;
    }
    /*
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
        // si no da cambiar al anterior http://localhost:3039/v1/cursos/save
        const response = await fetch(
          "https://edutech-codecrafters-blue-water-8441.fly.dev/v1/cursos/save",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Error al registrar el curso");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }*/
  });

  return (
    <>
      <form className="form-register-course" onSubmit={onSubmit}>
        <section className="form-register-course-logo">
          <img src={logo} alt="logo"/>
        </section>
        <section className="form-register-course-content">
          <label className="form-register-course-content-title">
            Información de pago
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
                        value: 40,
                        message: "El nombre no debe tener mas de 40 caracteres",
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
              <label htmlFor="numeroTarjeta">Número de tarjeta*</label>
              <div className="form-register-course-content-data-field-input">
                <input
                    type="number"
                    id="numeroTarjeta"
                    placeholder="Ingrese la descripcion del curso"
                    {...register("numeroTarjeta", {
                      required: {
                        value: true,
                        message: "Porfavor, ingrese su número de tarjeta",
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
                    className={`${errors.numeroTarjeta ? "error-input" : ""} ${
                        dirtyFields.numeroTarjeta && !errors.numeroTarjeta
                            ? "success-input"
                            : ""
                    }`}
                />

                {errors.numeroTarjeta && (
                    <div className="form-register-course-content-data-field-error">
                      <label htmlFor="error">
                        {JSON.stringify(errors.numeroTarjeta.message).replace(
                            /^"|"$/g,
                            ""
                        )}
                      </label>
                      <img src={AlertIcon} alt="Icono de alerta"/>
                    </div>
                )}

                {dirtyFields.numeroTarjeta && !errors.numeroTarjeta && (
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
              <label htmlFor="fechaVencimiento">Fecha de vencimiento*</label>
              <div className="form-register-course-content-data-field-input">
                <input
                    type="number"
                    id="fechaVencimiento"
                    placeholder="Ingrese el monto en bolivianos"
                    min={0}
                    max={99999.99}
                    step={0.01}
                    {...register("fechaVencimiento", {
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
                    className={`${errors.fechaVencimiento ? "error-input" : ""} ${
                        dirtyFields.fechaVencimiento && !errors.fechaVencimiento ? "success-input" : ""
                    }`}
                    onKeyPress={(event) => {
                      // Permite solo números y puntos (para decimales)
                      if (!/[0-9.0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                />

                {errors.fechaVencimiento && (
                    <div className="form-register-course-content-data-field-error">
                      <label htmlFor="error">
                        {JSON.stringify(errors.fechaVencimiento.message).replace(
                            /^"|"$/g,
                            ""
                        )}
                      </label>
                      <img src={AlertIcon} alt="Icono de check"/>
                    </div>
                )}

                {dirtyFields.fechaVencimiento && !errors.fechaVencimiento && (
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
              <label htmlFor="cvc">CVC/CVV*</label>
              <div className="form-register-course-content-data-field-input">
                <input
                    type="number"
                    id="cvc"
                    placeholder="Ingrese el código de seguridad"
                    min={0}
                    max={99999.99}
                    step={0.01}
                    {...register("cvc", {
                      required: {
                        value: true,
                        message: "Por favor, ingrese el código de seguridad",
                      },
                      pattern: {
                        value: /^\d{1,5}(?:\.\d{1,2})?$/,
                        message:
                            "El costo debe ser un valor numérico de hasta cinco dígitos",
                      },
                    })}
                    className={`${errors.cvc ? "error-input" : ""} ${
                        dirtyFields.cvc && !errors.cvc ? "success-input" : ""
                    }`}
                    onKeyPress={(event) => {
                      // Permite solo números y puntos (para decimales)
                      if (!/[0-9.0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                />

                {errors.cvc && (
                    <div className="form-register-course-content-data-field-error">
                      <label htmlFor="error">
                        {JSON.stringify(errors.cvc.message).replace(
                            /^"|"$/g,
                            ""
                        )}
                      </label>
                      <img src={AlertIcon} alt="Icono de check"/>
                    </div>
                )}

                {dirtyFields.cvc && !errors.cvc && (
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
            <div className="form-register-course-content-course-details">
              <label htmlFor="curso" className="form-register-course-content-course-details-label">
                Detalles de la compra
              </label>
              <div className="form-register-course-content-course-details-info">
                <span className="form-register-course-content-course-details-info-title">{titulo}</span>
                <span className="form-register-course-content-course-details-info-cost">{costo} bs</span>
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

          <button type="button" className="form-register-course-footer-button">
            Pagar
          </button>
        </section>
      </form>

      {showModalByClickInRegister && (
          <Modal
              title="Compra exitosa"
              description="Se compró correctamente tus cursos!!"
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
              description="Los datos ingresados se borrarán"
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
