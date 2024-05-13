import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
//import { Home } from "./Home";
import { FormRegisterCourse } from "./FormRegisterCourse";
import { FormRegistInstructor } from "./FormRegistInstructor";
import { ListCourses } from "./ListCourses";
import { Comprar } from "./comprar.tsx"; // Importa tu componente comprar.tsx

export const App = () => {
  return (
    <div className="app-content">
      <Routes>
        <Route path="/" element={<Layout />}>
<<<<<<< HEAD
          <Route
            path="registro-instructor"
            element={<FormRegistInstructor />}
          ></Route>
=======
          <Route path="registro-instructor" element={<FormRegistInstructor />}></Route>
>>>>>>> 5056be93c2a8da927a75f0eb039c8cdb7f618812
          <Route path="registro-curso" element={<FormRegisterCourse />}></Route>
          <Route path="lista-cursos" element={<ListCourses />}></Route>
            <Route path="comprar-cursos" element={<Comprar />} /> {/* Ruta para el formulario comprar.tsx */}
        </Route>
      </Routes>
    </div>
  );
};
