package org.edutech.servicioss.validador;

import org.edutech.servicioss.infraestructura.tablas.Usuario;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import org.edutech.servicioss.infraestructura.repositorios.UsuarioRepositorio;

@Component
public class UsuarioValidador {
  private final UsuarioRepositorio usuarioRepositorio;

  public UsuarioValidador(UsuarioRepositorio usuarioRepositorio) {
    this.usuarioRepositorio = usuarioRepositorio;
  }
  public void validate(Usuario usuario) {
    validarNombreUsuario(usuario);
    validarNombreCompleto(usuario);
    validarCorreoElectronico(usuario);
    validarContraseña(usuario);
    validarConfirmacionContraseña(usuario);
    validarFechaNacimiento(usuario);
    validarTipoUsuario(usuario);
  }
  private void validarNombreUsuario(Usuario user){
        if(campoVacio(user.getNombreUsuario())){
      throw new IllegalArgumentException("Por favor, ingrese un nombre de usuario");
         }
        /*
        if (!user.getNombreUsuario().matches("[a-zA-Z]+")) {
          throw new IllegalArgumentException("El nombre de usuario no cumple con el formato válido");
        }
    if (usuarioRepositorio.existsByNombreUsuario(user.getNombreUsuario())) {
      throw new IllegalArgumentException("Este nombre de usuario esta en uso, ingrese otro");
    }

         */
      }
  private void validarNombreCompleto(Usuario user){
    if(campoVacio(user.getNombreCompleto())) {
      throw new IllegalArgumentException("Por favor, ingrese su nombre");
    }
    /*
     if (!user.getNombreCompleto().matches("[a-zA-Z ]{4,20}")) {
      throw new IllegalArgumentException("El nombre completo debe tener entre 4 y 20 caracteres y solo contener letras y espacios");
      }

     */
    }
    private void validarCorreoElectronico(Usuario user){
      if(campoVacio(user.getCorreo())) {
        throw new IllegalArgumentException("Por favor, ingrese su correo electronico");
      }
      /*
      if (!user.getCorreo().matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")) {
        throw new IllegalArgumentException("El correo electrónico no cumple con el formato válido");
      }
      if (usuarioRepositorio.existsByCorreo(user.getCorreo())) {
        throw new IllegalArgumentException("Correo electronico existente, ingrese otro");
      }*/
    }
  private void validarContraseña(Usuario user){
    if (campoVacio(user.getContraseña())) {
      throw new IllegalArgumentException("La contraseña no cumple con el formato válido");
    }
    /*
    String contrasenia = user.getContraseña();

    // Validar longitud de la contraseña
    if (contrasenia.length() < 8 || contrasenia.length() > 20) {
      throw new IllegalArgumentException("La contraseña debe tener entre 8 y 20 caracteres");
    }

    // Validar caracteres válidos (opcionalmente, puedes agregar más caracteres especiales según sea necesario)
    if (!contrasenia.matches("[a-zA-Z0-9!@#$%^&*()_=+\\\\|`~-]+")) {
      throw new IllegalArgumentException("La contraseña debe contener solo caracteres válidos: letras, números y los siguientes caracteres especiales: !@#$%^&*()_=+\\\\|`~-");
    }

     */
  }

  private void validarConfirmacionContraseña(Usuario user){
    if (campoVacio(user.getConfirmacionContraseña()))  {
      throw new IllegalArgumentException("Por favor, confirme su contraseña");
    }

    /* Validar si la Contraseña coincide con la Confirmación de Contraseña
    if (!user.getContraseña().equals(user.getConfirmacionContraseña())) {
      throw new IllegalArgumentException("La contraseña ingresada no es la misma");
    }

     */
  }

  private void validarTipoUsuario(Usuario user){
      if (user.getTipoUsuario() == null) {
        throw new IllegalArgumentException("Seleccione un tipo de usuario");
      }
    }
  private void validarFechaNacimiento(Usuario user) {
    if(user.getFechaNacimiento() == null){
      throw new IllegalArgumentException("Selecciones su fecha de nacimiento");
    }
    /*
    LocalDate fechaNacimiento = user.getFechaNacimiento();
    LocalDate fechaActual = LocalDate.now();
    if (fechaNacimiento.isAfter(fechaActual)) {
      throw new IllegalArgumentException("La fecha de nacimiento no puede ser posterior a la fecha actual");
    }

     */
  }
  private boolean campoVacio(String campo){
    return campo == null || campo.trim().isEmpty();
  }
}
