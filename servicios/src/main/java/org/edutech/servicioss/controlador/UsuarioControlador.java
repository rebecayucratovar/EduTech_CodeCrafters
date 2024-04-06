package org.edutech.servicioss.controlador;

import lombok.RequiredArgsConstructor;
import org.edutech.servicioss.infraestructura.tablas.Usuario;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.edutech.servicioss.servicios.UsuarioServicio;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioControlador {
  private final UsuarioServicio usuarioServicio;

  @PostMapping
  public ResponseEntity<Usuario> saveUsuario(@RequestBody Usuario usuario){
    if(usuario.getNombreUsuario() == null || usuario.getNombreUsuario().trim().isEmpty() ||
            usuario.getNombreCompleto() == null || usuario.getNombreCompleto().trim().isEmpty() ||
            usuario.getFechaNacimiento() == null ||
            usuario.getTipoUsuario() == null ||
            usuario.getCorreoElectronico() == null || usuario.getCorreoElectronico().trim().isEmpty() ||
            usuario.getContrasenia() == null || usuario.getContrasenia().trim().isEmpty() ||
            usuario.getConfirmarContrasenia() == null || usuario.getConfirmarContrasenia().trim().isEmpty()){
      return ResponseEntity.badRequest().build();
    }
    // Validar el campo Nombre Usuario
    if (!usuario.getNombreUsuario().matches("[a-zA-Z]+")) {
      return ResponseEntity.badRequest().body(null);
    }

    // Validar el campo Nombre Completo
    if (usuario.getNombreCompleto().length() < 4 || usuario.getNombreCompleto().length() > 20) {
      return ResponseEntity.badRequest().body(null); // Error: El campo Nombre Completo debe tener entre 4 y 20 caracteres
    }

    // Validar el campo Correo Electrónico
    if (!usuario.getCorreoElectronico().matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")) {
      return ResponseEntity.badRequest().body(null);
    }

    // Validar el campo Contraseña
    if (!usuario.getContrasenia().matches("[a-zA-Z0-9!@#$%^&*()-_=+\\\\|`~]+") ||
            usuario.getContrasenia().length() < 8 || usuario.getContrasenia().length() > 20) {
      return ResponseEntity.badRequest().body(null);
    }

    // Validar si la Contraseña coincide con la Confirmación de Contraseña
    if (!usuario.getContrasenia().equals(usuario.getConfirmarContrasenia())) {
      return ResponseEntity.badRequest().body(null);
    }

    try {
      // Si todas las validaciones pasan, guardar el usuario
      Usuario usuarioGuardado = usuarioServicio.save(usuario);
      return ResponseEntity.ok(usuarioGuardado);
    } catch (DataIntegrityViolationException e) {
      // Si se produce una violación de integridad (nombre de usuario duplicado), devolver una respuesta de error
      return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // Otra opción sería devolver un mensaje de error más descriptivo
    }
  }

  @PostMapping("/{usuarioId}")
  public ResponseEntity<Usuario> getOne(@PathVariable("usuarioId") UUID usuarioId){
    return usuarioServicio.findById(usuarioId)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @GetMapping
  public ResponseEntity<List<Usuario>> getAllUsuarios(){
    var usuarioResult = usuarioServicio.getAll();
    if (usuarioResult.isEmpty()){
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.ok(usuarioResult);
  }

  @PutMapping("/{usuarioId}")
  public ResponseEntity<Usuario> update(@PathVariable("usuarioId") UUID usuarioId, @RequestBody Usuario usuarioBody) {
    usuarioBody.setId(usuarioId);
    return ResponseEntity.ok(usuarioServicio.update(usuarioBody));
  }

  @DeleteMapping("/{usuarioId}")
  public ResponseEntity<Void> delete(@PathVariable("usuarioId") UUID usuarioId) {
    usuarioServicio.deleteById(usuarioId);
    return ResponseEntity.noContent().build();
  }
}
