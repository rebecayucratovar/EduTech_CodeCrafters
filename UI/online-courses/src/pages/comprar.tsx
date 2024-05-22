import { Modal } from "../components/Modal";
import { useForm } from "react-hook-form";
import AlertIcon from "../assets/icons/AlertIcon.svg";
import CheckIcon from "../assets/icons/CheckIcon.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/LogoForm.png";
import { Course } from '../interfaces/Course.ts';
import targetIcon from '../assets/images/target.png';
import {useMisCursos} from "../context/MisCursosProvider.tsx";

export const Comprar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cursos }: { cursos: Course[] } = location.state;
  const { agregarAlMisCursos } = useMisCursos();
  //const usuarioId = localStorage.getItem("usuarioId"); // Obtener el usuarioId de localStorage
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
  const calcularCostoTotal = () => {
    let costoTotal = 0;
    cursos.forEach((curso:Course) => {
      costoTotal += curso.costo;
    });
    return costoTotal;
  };

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
    try {
      const cursosIds = cursos.map(curso => curso.id);
      if (!usuarioId) {
        throw new Error("usuarioId no encontrado en localStorage");
      }
      // Guardar en la base de datos
      const response = await fetch("https://edutech-codecrafters-quiet-dream-7075.fly.dev/v1/compras/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuarioId, cursosIds })
        ,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al registrar la compra:", errorData);
        throw new Error("Error al registrar la compra");
      }
      // Redirigir a la página de Mis Cursos
      navigate("/mis-cursos");
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      setShowModalError(true); // Mostrar modal de error si ocurre algún problema
    }*/
    try {
      // Aquí podrías hacer llamadas a una API para procesar el pago, etc.
      // Si todo está correcto, agregar los cursos a MisCursosProvider
      cursos.forEach(curso => agregarAlMisCursos(curso));

      // Redirigir a la página de Mis Cursos
      navigate("/mis-cursos");
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      setShowModalError(true); // Mostrar modal de error si ocurre algún problema
    }
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
                      minLength: {
                        value: 2,
                        message: "El nombre completo debe tener mas de 2 caracteres",
                      },
                    })}
                    maxLength={30}
                    onKeyDown={(event) => {
                      // permite solo letras
                      const target = event.target as HTMLInputElement;
                      if (!/[A-Za-záéíóúÁÉÍÓÚñÑ\s]/.test(event.key) || (event.key === " " && target.value.slice(-1) === " ")) {
                        event.preventDefault();
                      }}}
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
                    type="text"
                    id="numeroTarjeta"
                    placeholder="Ingrese su número de tarjeta"
                    {...register("numeroTarjeta", {
                      required: {
                        value: true,
                        message: "Porfavor, ingrese su número de tarjeta",
                      },
                      minLength: {
                        value: 19,
                        message: "Por favor, ingrese el número completo",
                      },
                    })}
                    maxLength={19}
                    onKeyPress={(event) => {
                      // Permite solo números y puntos (para decimales)
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                      const target = event.target as HTMLInputElement;
                      const currentValue = target.value;// Obtener el valor actual del input

                      if ((currentValue.length + 1) % 5 === 0 && currentValue.length < 19) {
                        target.value = currentValue + " ";// Agregar un espacio si es necesario
                      }
                    }}
                    className={`${errors.numeroTarjeta ? "error-input" : ""} ${
                        dirtyFields.numeroTarjeta && !errors.numeroTarjeta
                            ? "success-input"
                            : ""
                    }`}
                />
                <img src={targetIcon} alt="Target Icon" className="target-icon"/>

                {errors.numeroTarjeta && (
                    <div className="form-register-course-content-data-field-error">
                      <label htmlFor="error">
                        {JSON.stringify(errors.numeroTarjeta.message).replace(
                            /^"|"$/g,
                            ""
                        )}
                      </label>
                      <img src={AlertIcon} alt="Icono de alerta" className="alert-icon-specific"/>
                    </div>
                )}

                {dirtyFields.numeroTarjeta && !errors.numeroTarjeta && (
                    <div className="form-register-course-content-data-field-error">
                      <img
                          className="check-icon-specific"
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
                    type="text"
                    id="fechaVencimiento"
                    placeholder="Ingrese la fecha de vencimiento"
                    {...register("fechaVencimiento", {
                      required: {
                        value: true,
                        message: "Porfavor, ingrese su número de tarjeta",
                      },
                      minLength: {
                        value: 5,
                        message: "Por favor, ingrese la fecha completa",},
                    })}
                    maxLength={5}
                    className={`${errors.fechaVencimiento ? "error-input" : ""} ${
                        dirtyFields.fechaVencimiento && !errors.fechaVencimiento ? "success-input" : ""
                    }`}
                    onKeyPress={(event) => {

                      if (!/^\d$/.test(event.key)) {
                        event.preventDefault();
                      }
                      const target = event.target as HTMLInputElement;
                      let currentValue = target.value;

                      if(currentValue.charAt(1)==="/"){
                        target.value ='0' + currentValue;
                      }
                      if (currentValue.endsWith("0") && event.key === "0") {
                        event.preventDefault();
                        return;
                      }
                      // Verificar si estamos en el penúltimo lugar del formato "XX/XX"
                      if (currentValue.length === 3) {
                        const keyPressed = event.key; // Obtener la tecla presionada

                        // Verificar si el penúltimo dígito es "0" o "1" y si la tecla presionada es "0" o "1"
                        if ((keyPressed === "0" || keyPressed === "1")) {
                          event.preventDefault(); // Prevenir la inserción del carácter
                          return;
                        }
                      }
                      if (/^[2-9]$/.test(currentValue.charAt(0)) ) {
                        currentValue = '0' + currentValue;
                      }
                      if (currentValue.length === 1 && /^[3-9]$/.test(event.key)) {
                        currentValue = '0' + currentValue;
                      }

                      if (currentValue.length === 2) { // Agrega la barra solo si no está presente y el primer carácter es un número
                        target.value = currentValue + "/";
                      }


                    }}
                    onKeyDown={(event) => {
                      const target = event.target as HTMLInputElement;
                      const currentValue = target.value;
                      const cursorPosition = target.selectionStart;

                      // Permitir el uso de flechas para mover el cursor
                      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                        return;
                      }

                      // Permitir eliminar números en cualquier posición
                      if (event.key === "Backspace") {
                        // Permitir el borrado secuencial
                        if (currentValue.length === 5 || currentValue.length === 4) {
                          if (cursorPosition === 3 && currentValue.charAt(2) === "/") {
                            event.preventDefault();
                            return;
                          }
                        }
                          return;
                        }

                      if (currentValue.length === 5 || currentValue.length === 4 || (cursorPosition === 2 && event.key === "ArrowRight")) {
                        if (
                            !currentValue.includes("/") &&
                            currentValue.length === 5 &&
                            cursorPosition === 5
                        ) {
                          target.value =
                              currentValue.slice(0, cursorPosition - 1) +
                              "/" +
                              currentValue.slice(cursorPosition - 1);
                          event.preventDefault();
                        }
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
                    type="text"
                    id="cvc"
                    placeholder="Ingrese el código de seguridad"
                    {...register("cvc", {
                      required: {
                        value: true,
                        message: "Por favor, ingrese el código de seguridad",
                      },
                      minLength: {
                        value: 3,
                        message: "Por favor, ingrese el número completo",},
                    })}
                    maxLength={3}
                    className={`${errors.cvc ? "error-input" : ""} ${
                        dirtyFields.cvc && !errors.cvc ? "success-input" : ""
                    }`}
                    onKeyPress={(event) => {
                      // Permite solo números y puntos (para decimales)
                      if (!/^\d$/.test(event.key)) {
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
              </label>{cursos.map((curso: Course) => (
                <div key={curso.id}>
                <div className="form-register-course-content-course-details-info">
                  <span className="form-register-course-content-course-details-info-title">{curso.titulo}</span>
                  <span className="form-register-course-content-course-details-info-cost">{curso.costo} bs</span>
                </div>
                </div>

            ))}
              <label htmlFor="curso" className="form-register-course-content-course-details-label">
                Total a pagar: {calcularCostoTotal()} Bs
              </label>
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
