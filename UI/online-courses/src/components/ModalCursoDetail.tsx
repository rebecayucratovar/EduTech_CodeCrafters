import Book from "../assets/icons/Book.svg";
import Timer from "../assets/icons/Timer.svg";
import Picture from "../assets/icons/Picture.svg";
import Reset from "../assets/icons/Reset.svg";
import Close from "../assets/icons/Close.svg";
<<<<<<< HEAD

export const ModalCursoDetail = ({ onClose, course }: any) => {
=======
import Favorite from "../assets/icons/Favorite.svg";
import Save from "../assets/icons/Save.svg";
import { useNavigate } from "react-router-dom"; // Agregar importación


export const ModalCursoDetail = ({ onClose, course }: any) => {
  const navigate = useNavigate();
>>>>>>> 5056be93c2a8da927a75f0eb039c8cdb7f618812
  const handleCancel = () => {
    onClose();
  };

  const formattedCategoria = course.categoria.replace(/_/g, " ");

<<<<<<< HEAD
=======
  let formattedRequisitos = [];
  if (course.requisitos) {
    formattedRequisitos = course.requisitos.split("\n");
  }

  let formattedAprenderas = [];
  if (course.aprenderas) {
    formattedAprenderas = course.requisitos.split("\n");
  }

>>>>>>> 5056be93c2a8da927a75f0eb039c8cdb7f618812
  return (
    <>
      {course && (
        <article className="modal-curso-detail">
          <div className="modal-curso-detail-container">
            <button className="modal-curso-btn-close" onClick={handleCancel}>
              <img src={Close} alt="image" />
            </button>

            <section className="modal-curso-detail-content">
              <div className="modal-curso-detail-content-panel-left">
                <label
                  htmlFor="title"
                  className="modal-curso-detail-content-panel-left-title"
                >
<<<<<<< HEAD
                  Diseño web
=======
                  {course.titulo}
>>>>>>> 5056be93c2a8da927a75f0eb039c8cdb7f618812
                </label>

                <label
                  htmlFor="subtitle"
                  className="modal-curso-detail-content-panel-left-subtitle"
                >
                  Categoría: {formattedCategoria}
                </label>

                <div className="modal-curso-detail-content-panel-left-description">
                  <label
                    htmlFor="descripcion-title"
                    className="modal-curso-detail-content-panel-left-description-title"
                  >
                    Descripción:
                  </label>
                  <p className="modal-curso-detail-content-panel-left-description-text">
                    {course.descripcion}
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
<<<<<<< HEAD
                    <li>{course.aprenderas}</li>
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
                    <li>{course.requisitos}</li>
                  </ul>
                </div>
=======
                    {formattedAprenderas.map(
                      (aprenderas: string, index: number) => (
                        <li key={index}>{aprenderas}</li>
                      )
                    )}
                  </ul>
                </div>

                {course.requisitos && (
                  <div className="modal-curso-detail-content-panel-left-list">
                    <label
                      htmlFor="instructor"
                      className="modal-curso-detail-content-panel-left-list-title"
                    >
                      Requisitos del curso:
                    </label>
                    <ul className="modal-curso-detail-content-panel-left-list-items">
                      {formattedRequisitos.map(
                        (requisito: string, index: number) => (
                          <li key={index}>{requisito}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
>>>>>>> 5056be93c2a8da927a75f0eb039c8cdb7f618812
              </div>

              <div className="modal-curso-detail-content-panel-right">
                <div className="modal-curso-detail-content-panel-right-img">
                  <div className="modal-curso-detail-content-panel-right-img-container">
                    <img src={course.imagen} alt="image" />
                  </div>
                </div>

                <div className="modal-curso-detail-content-panel-right-text-first">
                  <label
                    htmlFor="costo"
                    className="modal-curso-detail-content-panel-right-text-first-costo"
                  >
                    Costo: {course.costo} bs
                  </label>

                  <label htmlFor="instructor">Instructor: Pedro Perez</label>
                  <label htmlFor="extra">Información extra: Ninguna</label>
                </div>

                <div className="modal-curso-detail-content-panel-right-text-second">
                  <div className="modal-curso-detail-content-panel-right-text-second-item">
                    <img src={Timer} alt="icon" />
                    <label htmlFor="duracion">Duración: 5 semanas</label>
                  </div>

                  <div className="modal-curso-detail-content-panel-right-text-second-item">
                    <img src={Picture} alt="icon" />
                    <label htmlFor="duracion">Nivel: Intermedio</label>
                  </div>

                  <div className="modal-curso-detail-content-panel-right-text-second-item">
                    <img src={Reset} alt="icon" />
                    <label htmlFor="duracion">
                      Ultima actualización: 08/04/2024
                    </label>
                  </div>

                  <div className="modal-curso-detail-content-panel-right-text-second-item">
                    <img src={Book} alt="icon" />
                    <label htmlFor="duracion">Estudiantes: 0</label>
                  </div>
                </div>

                <div className="modal-curso-detail-content-panel-right-buttons">
<<<<<<< HEAD
                  <button>Comprar Ahora</button>
                  <button>Añadir a la cesta</button>
                </div>
              </div>
=======
                  <button onClick={() => navigate("/comprar-cursos", {
                    state: {
                      titulo: course.titulo,
                      costo: course.costo
                    }
                  })}>Comprar Ahora
                  </button>
                  <button>Añadir a la cesta</button>
                </div>
              </div>

              <div className="modal-curso-detail-content-panel-middle">
                <img src={Save} alt="save image" title="guardar curso" />
                <img
                  src={Favorite}
                  alt="favorite image"
                  title="asignar como favorito"
                />
              </div>
>>>>>>> 5056be93c2a8da927a75f0eb039c8cdb7f618812
            </section>
          </div>
        </article>
      )}
    </>
  );
};
