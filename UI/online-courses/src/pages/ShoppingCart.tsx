import { useEffect, useState } from "react";
import { Course } from "../interfaces/Course.ts";

export const ShoppingCart = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los cursos");
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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
          {courses.length > 0 ? (
            <div className="list-courses-content-card">
              {courses.map((course) => (
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
                    <label>Pedro Perez</label>
                    <label
                      htmlFor="card-costo"
                      className="list-courses-content-card-wrapper-description-costo"
                    >
                      {course.costo} Bs.
                    </label>
                  </div>

                  <button
                    className="list-courses-content-card-wrapper-button"
                    onClick={() => "Borrar el card"}
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
          Precio total(Bs): 0
        </label>
        <button
            className="shopping-card-content-card-wrapper-button"
            onClick={() => "Borrar el card"}
        >
          Comprar todo
        </button>

      </section>
    </article>
  );
};