import {useEffect, useState} from "react";
import { Course } from "../interfaces/Course.ts";

export const ListCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    fetch("http://localhost:3039/v1/cursos/lista")
        .then(response => {
          if (!response.ok) {
            throw new Error("Error al obtener los cursos");
          }
          return response.json();
        })
        .then(data => {
            setCourses(data);
            // Llamar al método del controlador para obtener cada imagen
            data.forEach((course:Course) => {
                fetchImage(course.imagen);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
  }, []);
    const fetchImage = (nombreImagen:string) => {
        fetch(`http://localhost:3039/v1/cursos/imagen/${nombreImagen}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener la imagen");
                }
                return response.blob(); // Convertir la respuesta a un objeto Blob
            })
            .then(blob => {
                const url = URL.createObjectURL(blob); // Crear una URL para el objeto Blob
                setCourses(prevCourses => {
                    return prevCourses.map(course => {
                        if (course.imagen === nombreImagen) {
                            return { ...course, urlImagen: url };
                        }
                        return course;
                    });
                });
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    return (
    <article className="list-courses">
      <section className="list-courses-content">
        <label
          htmlFor="list-courses-content-title"
          className="list-courses-content-title"
        >
          Cursos disponibles
        </label>

        <section className="list-courses-content-wrapper">
          {courses.length > 0 ? (
            <div className="list-courses-content-card">
              {courses.map((course) => (
                <div
                  className="list-courses-content-card-wrapper"
                  key={course.id}
                >
                    {course.urlImagen && (
                        <img src={course.urlImagen} alt="img-course" />
                    )}                    <div className="list-courses-content-card-wrapper-description">
                        <label
                            htmlFor="card-title"
                        className="list-courses-content-card-wrapper-description-title"
                        title={course.titulo}
                    >
                      {course.titulo}
                    </label>
                    <label
                       // htmlFor="card-name-instructor"
                        // className="list-courses-content-card-wrapper-description-instructor"
                        //title={course.instructor}
                    >
                      {/* {course.instructor}  */}
                      Pedro Perez
                    </label>
                    <label
                        htmlFor="card-costo"
                        className="list-courses-content-card-wrapper-description-costo"
                    >
                      {course.costo} Bs.
                    </label>
                  </div>
                </div>
              ))}
            </div>
          ) : (
              <div className="list-no-courses-message-container">
                <div className="list-no-courses-message">
                  <p>No existen cursos disponibles actualmente</p>
                </div>
              </div>
          )}
        </section>
      </section>
    </article>
  );
};
