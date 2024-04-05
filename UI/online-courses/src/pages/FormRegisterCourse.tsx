import { useState } from "react";
import logo from "../assets/logo.jpeg";
import { Modal } from "../components/Modal";

export const FormRegisterCourse = () => {
  const [showModalByClickInRegister, setShowModalByClickInAccept] =
    useState(false);

  const [showModalByClickInCancel, setShowModalByClickInCancel] =
    useState(false);

  const handleRegister = () => {
    setShowModalByClickInAccept(true);
  };

  const handleCancel = () => {
    setShowModalByClickInCancel(true);
  };

  return (
    <>
      <article className="form-register-course">
        <section className="form-register-course-logo">
          <img src={logo} alt="logo" />
        </section>

        <section className="form-register-course-content">
          <label className="form-register-course-content-title">
            Registro de nuevo curso
          </label>

          <div className="form-register-course-content-data">
            <div className="form-register-course-content-data-field">
              <label htmlFor="">Titulo*</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                placeholder="Ingrese el titulo del curso"
              />
            </div>

            <div className="form-register-course-content-data-field">
              <label htmlFor="">Instructor*</label>
              <input
                type="text"
                id="instructor"
                name="instructor"
                placeholder="Ingrese su nombre completo"
              />
            </div>

            <div className="form-register-course-content-data-field">
              <label htmlFor="">Categoria*</label>
              <select id="categoria">
                <option value="opcion0">Selecciona una categoría</option>
                <option value="opcion1">Desarrollo web</option>
                <option value="opcion2">
                  Desarrollo de aplicaciones móviles
                </option>
                <option value="opcion3">
                  Ciencias de datos y análisis de datos
                </option>
                <option value="opcion4">Desarrollo de software</option>
                <option value="opcion5">
                  Seguridad informática y ciberseguridad
                </option>
              </select>
            </div>

            <div className="form-register-course-content-data-field">
              <label htmlFor="">Costo (Bs)*</label>
              <input
                type="number"
                id="costo"
                name="costo"
                placeholder="Ingrese el monto en bolivianos"
              />
            </div>

            <div className="form-register-course-content-data-field">
              <label htmlFor="">Requisitos*</label>
              <textarea
                id="requisito"
                name="requisito"
                placeholder="Ingrese los requisitos para unirse al curso"
              />
            </div>

            <div className="form-register-course-content-data-field">
              <label htmlFor="">Lo que aprenderás*</label>
              <textarea
                id="descripcion"
                name="descripcion"
                placeholder="Describa lo que se aprendera una ves terminado el curso"
              />
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

          <button
            type="button"
            className="form-register-course-footer-button"
            onClick={handleRegister}
          >
            Registrar
          </button>
        </section>
      </article>

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
          onAccept={() => setShowModalByClickInCancel(false)}
          onCancel={() => setShowModalByClickInCancel(false)}
        />
      )}
    </>
  );
};
