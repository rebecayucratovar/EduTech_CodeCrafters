import logo from "../assets/logo.jpeg";

export const FormRegisterCourse = () => {
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
                <option value="">Selecciona una categoria</option>
                <option value="opcion1">Categoria 1</option>
                <option value="opcion2">Categoria 2</option>
                <option value="opcion3">Categoria 3</option>
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
          <button type="button" className="form-register-course-footer-button">
            Cancelar
          </button>

          <button type="button" className="form-register-course-footer-button">
            Registrar
          </button>
        </section>
      </article>
    </>
  );
};
