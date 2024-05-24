import { useEffect, useState } from 'react';
import { Course } from '../interfaces/Course';

export const MyCourses = () => {
    const [misCursos, setMisCursos] = useState<Course[]>([]);
    const usuarioId = localStorage.getItem("usuarioId"); // Obtener el usuarioId de localStorage

    useEffect(() => {
        const obtenerCursosComprados = async () => {
            try {
                // Hacer la solicitud al endpoint correspondiente en tu backend
                const response = await fetch(`http://localhost:3039/v1/compras/usuario/${usuarioId}`);
                if (!response.ok) {
                    throw new Error('No se pudieron obtener los cursos comprados');
                }
                const data = await response.json();
                setMisCursos(data); // Establecer los cursos obtenidos en el estado
            } catch (error) {
                console.error('Error al obtener los cursos comprados:', error);
            }
        };

        obtenerCursosComprados();
    }, []); // Ejecutar solo una vez al cargar el componente

    return (
      <article className="list-courses">
        <section className="list-courses-content">
          <label
              htmlFor="list-courses-content-title"
              className="list-courses-content-title"
          >
            Tus cursos
          </label>

          <section className="list-courses-content-wrapper">
            {misCursos.length > 0 ? (
                <div className="list-courses-content-card">
                  {misCursos.map((course: Course) => (
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
                        </div>

                        <button className="list-courses-content-card-wrapper-button">
                          Ingresar
                        </button>
                      </div>
                  ))}
                </div>
            ) : (
                <div className="list-no-courses-message-container">
                  <div className="list-no-courses-message">
                    <p>Usted no ha adquirido ningún curso hasta el momento.</p>
                  </div>
                </div>
            )}
          </section>
        </section>
      </article>
  );
};
