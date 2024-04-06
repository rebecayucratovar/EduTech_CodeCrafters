import logoEduTech from "../assets/logo.jpeg";


export const FormRegisterInstructor = () => {
  return(
    <>
    <article className = "form-register-instructor">
      <section className="form-register-instructor">
      <img src={logoEduTech} alt="logoEduTech"/>
      </section>
      
      <section className="form-register-instructor-content">
        <label className="form-register-instructor-content-title">
          Formulario de registro 
        </label>

        <div className="form-register-instructor-content-data">
          <div className="form-register-instructor-content-data-field">
            <label htmlFor="">Nombre completo*</label>
            <input 
            type="text" 
            id="nombre"
            name="nombre"
            placeholder="Ingrese su nombre completo"
            />
          </div>

          <div className="form-register-instructor-content-data-field">
            <label htmlFor="">Nombre de usuario*</label>
            <input 
            type="text" 
            id="nombreUsuario"
            name="nombreUsuario"
            placeholder="Ingrese su nombre de usuario"
            />
          </div>    
          
          <div className="form-register-instructor-content-data-field">
            <label htmlFor="">Fecha de nacimiento*</label>
            <input 
              name="fechaNacimiento"  
              formEncType="startDate"
              id="startDate"
               type="date"
            />
          </div>

          <div className="form-register-instructor-content-data-field">
            <label htmlFor="">Tipo*</label>
            <select name="tipoUsuario" id="tipoUsuario">
              <option value="option0">Seleccione tipo de usuario</option>
              <option value="option1">Instructor</option>
              <option value="option2">Estudiante</option>
            </select>
          </div>        

          <div className="form-register-instructor-content-data-field">
            <label htmlFor="">Correo electronico*</label>
            <input 
            type="text" 
            id="correoElectronico"
            name="correoElectronico"
            placeholder="Ingrese su correo electronico"
            />
          </div>

          <div className="form-register-instructor-content-data-field">
            <label htmlFor="">Contraseña*</label>
            <input 
            type="text" 
            id="contraseña"
            name="contraseña"
            placeholder="Ingrese su contraseña"
            />
          </div>

          
          <div className="form-register-instructor-content-data-field">
            <label htmlFor="">Confirmar contraseña*</label>
            <input 
            type="text" 
            id="confirma contraseña"
            name="cofirmar contraseña"
            placeholder="Confirmar su contraseña"
            />
          </div>
        </div>    
      </section>
      <section className="form-register-instructor-footer">
          <button type="button" className="form-register-course-footer-button">
            Cancelar
          </button>

          <button type="button" className="form-register-instructor-footer-button">
            Registrar
          </button>
        </section>
    </article>
    </>
  )
}
