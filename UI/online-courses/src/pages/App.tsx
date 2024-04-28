import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
//import { Home } from "./Home";
import { FormRegisterCourse } from "./FormRegisterCourse";
import { FormRegistInstructor } from "./FormRegistInstructor";
import { ListCourses } from "./ListCourses";
import { ModalCursoDetail } from "../components/ModalCursoDetail";
export const App = () => {
  return (
    <div className="app-content">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="registro-instructor"
            element={<FormRegistInstructor />}
          ></Route>
          <Route path="registro-curso" element={<FormRegisterCourse />}></Route>
          <Route path="lista-cursos" element={<ListCourses />}></Route>
          <Route path="modal-curso" element={<ModalCursoDetail />}></Route>
        </Route>
      </Routes>
    </div>
  );
};
