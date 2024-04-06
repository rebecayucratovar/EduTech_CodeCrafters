import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { FormRegisterCourse } from "./FormRegisterCourse";
import { Home } from "./Home";
import { FormRegisterUser } from "./FormRegisterUser";
import { ListCourses } from "./ListCourses";
export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="registro-usuario" element={<FormRegisterUser />}></Route>
          <Route path="registro-curso" element={<FormRegisterCourse />}></Route>
          <Route path="lista-cursos" element={<ListCourses />}></Route>
        </Route>
      </Routes>
    </div>
  );
};
