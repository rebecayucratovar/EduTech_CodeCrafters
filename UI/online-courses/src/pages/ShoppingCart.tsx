//import { useContext } from "react";
import { Course } from "../interfaces/Course.ts";
import { useNavigate } from "react-router-dom";
import {useCarro} from "../context/CarroProvider";

export const ShoppingCart = () => {
  const { carrito, eliminarDelCarrito } = useCarro();
  const navigate = useNavigate(); // Declarar navigate aquí

  const totalCosto = carrito.reduce((total:number, course:Course) => total + course.costo, 0);
  const handleCompra = () => {
    navigate("/comprar-cursos", {state:{cursos: carrito}});
  };

  return (
    <article className="list-courses
">
      <section className="list-courses-content">
        <label
          htmlFor="list-courses-content-title"
          className="list-courses-content-title"
        >
          Carrito de compras
        </label>

        <section className="list-courses-content-wrapper">
          {carrito.length > 0 ? (
            <div className="list-courses-content-card">
              {carrito.map((course: Course) => (
                <div
                  className="list-courses-content-card-wrapper"
                  key={course.id}
                >
                  {course.imagen && (
                    <img src={course.imagen} alt="img-course" />
                  )}
                  <div className="list-courses-content-card-wrapper-description">
                    <label
                        htmlFor="card-title"
                        className="list-courses-content-card-wrapper-description-title"
                        title={course.titulo}
                    >
                      {course.titulo}
                    </label>
                    <label
                        htmlFor="card-nombreCompleto"
                        className="list-courses-content-card-wrapper-description-usuario"
                    >
                      {course.nombreCompletoUsuario}
                    </label>
                    <label
                        htmlFor="card-costo"
                        className="list-courses-content-card-wrapper-description-usuario"
                    >
                      {course.costo} Bs.
                    </label>
                  </div>

                  <button
                      className="list-courses-content-card-wrapper-button"
                      onClick={() => eliminarDelCarrito(course.id)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="list-no-courses-message-container">
              <div className="list-no-courses-message">
                <p>Usted no agregó ningún curso al carrito.</p>
              </div>
            </div>
          )}
        </section>

        <label
            htmlFor="list-courses-content-title"
            className="list-courses-content-title"
        >
          Precio total(Bs): {totalCosto}
        </label>
        <button
        type="button"
        className={`shopping-card-content-card-wrapper-button ${carrito.length === 0 ? "button-disabled" : ""}`}
        onClick={handleCompra}
        disabled={carrito.length === 0}

        >
          Comprar todo
        </button>

      </section>
    </article>
  );
};