import Book from "../assets/icons/Book.svg";
import Timer from "../assets/icons/Timer.svg";
import Picture from "../assets/icons/Picture.svg";
import Reset from "../assets/icons/Reset.svg";
import Close from "../assets/icons/Close.svg";
import { useContext } from "react";
import { CarroContexto } from "../context/CarroProvider";
import  {useNavigate}  from "react-router-dom";

export const ModalCursoDetail = ({ onClose, course }: any) => {
  const navigate = useNavigate();
  const handleCancel = () => {
    onClose();
  };

  const formattedCategoria = course.categoria.replace(/_/g, " ");

  //const useCarro = () => useContext(CarroContexto);
  //const {agregarAlCarrito} = useCarro();


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
                  Diseño web
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
                  <button onClick={() => navigate("/comprar-cursos", {
                    state: {
                      titulo: course.titulo,
                      costo: course.costo
                    }
                  })}>Comprar Ahora
                  </button>
                  <button
                      onClick={() => {
                        // agregarAlCarrito(course);
                        navigate("/lista-compras");
                      }}
                  >
                    Añadir a la cesta
                  </button>
                  {/*<button onClick={() => agregarAlCarrito(course)}>Añadir a la cesta</button>*/}
                </div>
              </div>
            </section>
          </div>
        </article>
      )}
    </>
  );
};