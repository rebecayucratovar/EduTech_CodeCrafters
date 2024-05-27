import Book from "../assets/icons/Book.svg";
import Timer from "../assets/icons/Timer.svg";
import Picture from "../assets/icons/Picture.svg";
import Reset from "../assets/icons/Reset.svg";
import Close from "../assets/icons/Close.svg";
import { useCarro } from "../context/CarroProvider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import ModalInicioSesion from "./ModalInicioSesion"; // Importar el componente ModalInicioSesion
import { API_BASE_URL } from "../config.ts";

export const ModalCursoDetail = ({ onClose, course }: any) => {
  const navigate = useNavigate();
  const { agregarAlCarrito, cursoEnCarrito } = useCarro();
  const [isOpen, setIsOpen] = useState(false);
  const [cursoComprado, setCursoComprado] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  //const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
  //const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado de carga
  const formattedCategoria = course.categoria.replace(/_/g, " ");
  
  const handleCancel = () => {
    onClose();
  };

  useEffect(() => {
    //const tipo = localStorage.getItem("tipoUsuario");
    const id = localStorage.getItem("usuarioId");
    //setTipoUsuario(tipo);
    //setUsuarioId(id);
    
    if (id) {
      obtenerCursoComprado(id);
    }
  }, [course]);

  const obtenerCursoComprado = async (usuarioId: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/compras/usuario/${usuarioId}`
      );
      if (response.ok) {
        const cursosComprados = await response.json();
        const cursoYaComprado = cursosComprados.some(
          (cursoComprado: any) => cursoComprado.id === course.id
        );
        setCursoComprado(cursoYaComprado);
      } else {
        console.error("Error al obtener los cursos comprados");
      }
    } catch (error) {
      console.error("Error al obtener los cursos comprados:", error);
    }finally {
      setIsLoading(false); // Set isLoading to false after the check is complete
    }
  };

  const isUserLoggedIn = () => {
    return !!localStorage.getItem("usuarioId");
  };

  const handleComprarAhora = () => {
    if (isUserLoggedIn()) {
      navigate("/comprar-cursos", { state: { cursos: [course] } });
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleAgregarAlCarrito = () => {
    if (isUserLoggedIn()) {
      agregarAlCarrito(course);
      setIsOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleCursoYaComprado = () => {
    navigate("/mis-cursos");
  };

  const handleCursoEnCarrito = () => {
    navigate("/lista-compras");
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

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
                  {course.titulo}
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

                  <label
                    htmlFor="instructor"
                    className="modal-curso-detail-content-panel-right-text-first-instructor"
                  >
                    Instructor: {course.nombreCompletoUsuario}
                  </label>
                  <label
                    htmlFor="extra"
                    className="modal-curso-detail-content-panel-right-text-first-instructor"
                  >
                    Información extra:
                  </label>
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
                      Última actualización: 08/04/2024
                    </label>
                  </div>

                  <div className="modal-curso-detail-content-panel-right-text-second-item">
                    <img src={Book} alt="icon" />
                    <label htmlFor="duracion">
                      Estudiantes: {course.numeroEstudiantes}
                    </label>
                  </div>
                </div>

                <div className="modal-curso-detail-content-panel-right-buttons">
                  <button
                    onClick={
                      cursoComprado
                        ? handleCursoYaComprado
                        : cursoEnCarrito(course.id)
                        ? handleCursoEnCarrito
                        : handleComprarAhora
                    }
                    disabled={isLoading} // Deshabilitar el botón mientras se carga
                    className={isLoading ? "button-disabled" : ""}

                  >
                    {cursoComprado
                      ? "Curso ya comprado"
                      : cursoEnCarrito(course.id)
                      ? "Curso en el carrito"
                      : "Comprar Ahora"}
                  </button>
                  <button
                    onClick={
                      cursoComprado
                        ? handleCursoYaComprado
                        : cursoEnCarrito(course.id)
                        ? handleCursoEnCarrito
                        : handleAgregarAlCarrito
                    }
                    disabled={isLoading} // Deshabilitar el botón mientras se carga
                    className={isLoading ? "button-disabled" : ""}
                  >
                    {cursoComprado
                      ? "Curso ya comprado"
                      : cursoEnCarrito(course.id)
                      ? "Curso en el carrito"
                      : "Añadir al carrito"}
                  </button>
                </div>
              </div>
            </section>
          </div>
        </article>
      )}

      {isOpen && (
        <Modal
          title=""
          description="Se agregó a carrito"
          txtBtnAccept="Aceptar"
          onAccept={() => {
            navigate("lista-compras");
            setIsOpen(false);
          }}
        />
      )}

      {isLoginModalOpen && (
        <ModalInicioSesion onClose={handleLoginModalClose} /> // Mostrar el modal de inicio de sesión
      )}
    </>
  );
};