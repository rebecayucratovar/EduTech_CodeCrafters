import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./FormRegisterInstructor.css"
import "./HomePage.css"
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { FormRegisterCourse } from "./pages/FormRegisterCourse";
import { FormRegisterInstructor } from "./pages/FormRegisterInstructor";
import { HomePage } from "./pages/HomePage";

ReactDOM.createRoot(document.getElementById("root")!).render(

  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element = {<HomePage/>}/>
    <Route path="/Registrarcursox" element = {<FormRegisterCourse/>}/>
    <Route path="/Formularioderegistro" element = {<FormRegisterInstructor/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>

);
