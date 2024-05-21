//import React from 'react';
import { useMisCursos } from '../context/MisCursosProvider';
import { Course } from '../interfaces/Course';

export const MyCourses = () => {
  const { misCursos } = useMisCursos();

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
                          <label>Pedro Perez</label>
                          <label
                              htmlFor="card-costo"
                              className="list-courses-content-card-wrapper-description-costo"
                          >
                            {course.costo} Bs.
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
