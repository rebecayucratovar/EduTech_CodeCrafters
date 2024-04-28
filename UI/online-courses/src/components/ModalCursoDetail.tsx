import Book from "../assets/icons/Book.svg";
import Timer from "../assets/icons/Timer.svg";
import Picture from "../assets/icons/Picture.svg";
import Reset from "../assets/icons/Reset.svg";
import Close from "../assets/icons/Close.svg";

export const ModalCursoDetail = () => {
  return (
    <div className="modal-curso-detail-container">
      <button className="modal-curso-btn-close">
        <img src={Close} alt="image" />
      </button>

      <section className="modal-curso-detail-content">
        <div className="modal-curso-detail-content-panel-left">
          <label
            htmlFor="title"
            className="modal-curso-detail-content-panel-left-title"
          >
            Diseño web
          </label>

          <label
            htmlFor="subtitle"
            className="modal-curso-detail-content-panel-left-subtitle"
          >
            Categoria: Desarrollo web
          </label>

          <div className="modal-curso-detail-content-panel-left-description">
            <label
              htmlFor="descripcion-title"
              className="modal-curso-detail-content-panel-left-description-title"
            >
              Descripcion:
            </label>
            <p className="modal-curso-detail-content-panel-left-description-text">
              ¡Sumérgete en el emocionante mundo del diseño web con nuestro
              curso completo en línea! Desde los conceptos básicos hasta las
              técnicas más avanzadas, este curso está diseñado para llevarte
              desde cero hasta convertirte en un diseñador web competente y
              creativo.
            </p>
          </div>

          <div className="modal-curso-detail-content-panel-left-list">
            <label
              htmlFor="instructor"
              className="modal-curso-detail-content-panel-left-list-title"
            >
              Lo que aprenderás:
            </label>
            <ul className="modal-curso-detail-content-panel-left-list-items">
              <li>Fundamentos del diseño web</li>
              <li>HTML y CSS</li>
              <li>Frameworks y bibliotecas populares</li>
              <li>Diseño centrado en el usuario</li>
              <li>Optimizacion y despliegue</li>
            </ul>
          </div>

          <div className="modal-curso-detail-content-panel-left-list">
            <label
              htmlFor="instructor"
              className="modal-curso-detail-content-panel-left-list-title"
            >
              Requisitos del curso:
            </label>
            <ul className="modal-curso-detail-content-panel-left-list-items">
              <li>Conocimientos basicos de informatica e internet</li>
              <li>Interes en el diseño web y la creatividad</li>
              <li>
                No se requiere experiencia previa en diseño web pero se
                recomienda tener una actitud de aprendizaje y disposicion para
                practicar
              </li>
            </ul>
          </div>
        </div>

        <div className="modal-curso-detail-content-panel-right">
          <div className="modal-curso-detail-content-panel-right-img">
            <div className="modal-curso-detail-content-panel-right-img-container">
              <img src="" alt="image" />
            </div>
          </div>

          <div className="modal-curso-detail-content-panel-right-text-first">
            <label
              htmlFor="costo"
              className="modal-curso-detail-content-panel-right-text-first-costo"
            >
              Costo: 100 bs
            </label>

            <label htmlFor="instructor">Instructor: Juan Perez</label>
            <label htmlFor="extra">Informacion extra</label>
          </div>

          <div className="modal-curso-detail-content-panel-right-text-second">
            <div className="modal-curso-detail-content-panel-right-text-second-item">
              <img src={Timer} alt="icon" />
              <label htmlFor="duracion">Duracion: 5 semanas</label>
            </div>

            <div className="modal-curso-detail-content-panel-right-text-second-item">
              <img src={Picture} alt="icon" />
              <label htmlFor="duracion">Nivel: Intermedio</label>
            </div>

            <div className="modal-curso-detail-content-panel-right-text-second-item">
              <img src={Reset} alt="icon" />
              <label htmlFor="duracion">Ultima actualizacion: 08/04/2024</label>
            </div>

            <div className="modal-curso-detail-content-panel-right-text-second-item">
              <img src={Book} alt="icon" />
              <label htmlFor="duracion">Estudiantes: 100</label>
            </div>
          </div>

          <div className="modal-curso-detail-content-panel-right-buttons">
            <button>Comprar Ahora</button>
            <button>Añadir a la cesta</button>
          </div>
        </div>
      </section>
    </div>
  );
};
