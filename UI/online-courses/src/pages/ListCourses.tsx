import { useEffect, useState } from "react";
import { Course } from "../interfaces/Course.ts";
import { ModalCursoDetail } from "../components/ModalCursoDetail.tsx";

export const ListCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showModalByClickInBtnCard, setShowModalByClickInBtnCard] =
    useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleOpenModal = (course: Course) => {
    setSelectedCourse(course);
    setShowModalByClickInBtnCard(true);
  };

  const handleCloseModal = () => {
    setShowModalByClickInBtnCard(false);
  };

  useEffect(() => {
    // https://edutech-codecrafters-blue-water-8441.fly.dev/
    fetch("https://edutech-codecrafters-dry-mountain-212.fly.dev/v1/cursos/lista")
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
                    onClick={() => handleOpenModal(course)}
                  >
                    Ver mas información
                  </button>
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

      {showModalByClickInBtnCard && (
        <ModalCursoDetail onClose={handleCloseModal} course={selectedCourse} />
      )}
    </article>
  );
};
