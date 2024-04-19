import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
//import { Home } from "./Home";
import { FormRegisterCourse } from "./FormRegisterCourse";
import { FormRegisterInstructor } from "./FormRegisterInstructor";
import { ListCourses } from "./ListCourses";
export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="registro-instructor" element={<FormRegisterInstructor />}></Route>
          <Route path="registro-curso" element={<FormRegisterCourse />}></Route>
          <Route path="lista-cursos" element={<ListCourses />}></Route>
        </Route>
      </Routes>
    </div>
  );
};
