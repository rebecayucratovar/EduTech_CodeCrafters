import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
//import { Home } from "./Home";
import { FormRegisterCourse } from "./FormRegisterCourse";
import { FormRegistInstructor } from "./FormRegistInstructor";
import { ListCourses } from "./ListCourses";
import { Comprar } from "./comprar.tsx"; // Importa tu componente comprar.tsx
import { FormRegisterEstudiante } from "./FormRegisterEstudiante.tsx";
import {ShoppingCart} from "./ShoppingCart.tsx";

export const App = () => {
  return (
    <div className="app-content">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListCourses />} /> {/* Muestra la lista de cursos por defecto */}
          <Route path="registro-instructor" element={<FormRegistInstructor />} />
          <Route path="registro-estudiante" element={<FormRegisterEstudiante />} />
          <Route path="registro-curso" element={<FormRegisterCourse />} />
          <Route path="lista-cursos" element={<ListCourses />} />
          <Route path="comprar-cursos" element={<Comprar />} /> {/* Ruta para el formulario comprar.tsx */}
          <Route path="lista-compras" element={<ShoppingCart/>}></Route>
        </Route>
      </Routes>
    </div>
  );
};