import { useSelector } from "react-redux";
import ImageExample from "../assets/images/ImageExample.jpeg";
import { RootState } from "../store/store";

export const ListCourses = () => {
  const courses = useSelector((state: RootState) => state.courses.courses);

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
                  <img src={ImageExample} alt="img-course" />

                  <div className="list-courses-content-card-wrapper-description">
                    <label
                        htmlFor="card-title"
                        className="list-courses-content-card-wrapper-description-title"
                        title={course.titulo}
                    >
                      {course.titulo}
                    </label>
                    <label
                      //  htmlFor="card-name-instructor"
                      //  className="list-courses-content-card-wrapper-description-instructor"
                      //  title={course.instructor}
                    //{course.instructor} pedro perez remplazo esto 
                    >
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
