package org.edutech.servicioss.controlador;

import lombok.RequiredArgsConstructor;
import org.edutech.servicioss.infraestructura.tablas.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;
import org.edutech.servicioss.servicios.UsuarioServicio;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "https://edutech-codecrafters.netlify.app"})
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioControlador {
  private final UsuarioServicio usuarioServicio;

  @PostMapping("/saveUsuario")
  public ResponseEntity<Usuario> saveUsuario(@RequestBody Usuario usuario) {
    try {
      Usuario usuarioGuardado = usuarioServicio.save(usuario);
      return ResponseEntity.status(HttpStatus.CREATED).body(usuarioGuardado);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(null); // o un mensaje de error específico
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // correo o nombre de usuario duplicado
    }
  }
  @GetMapping("/{usuarioId}")
  public ResponseEntity<Usuario> getOne(@PathVariable("usuarioId") UUID usuarioId){
    return usuarioServicio.findById(usuarioId)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
  }
  @GetMapping("/mostrarTodos")
  public ResponseEntity<List<Usuario>> getAllUsuarios(){
    var usuarioResult = usuarioServicio.getAll();
    if (usuarioResult.isEmpty()){
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.ok(usuarioResult);
  }

  @PutMapping("/{usuarioId}")
  public ResponseEntity<Usuario> update(@PathVariable("usuarioId") UUID usuarioId, @RequestBody Usuario usuarioBody) {
    usuarioBody.setUsuarioId(usuarioId);
    try {
      Usuario usuarioActualizado = usuarioServicio.update(usuarioBody);
      return ResponseEntity.ok(usuarioActualizado);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(null); // o un mensaje de error específico
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // correo o nombre de usuario duplicado
    }
  }

  @DeleteMapping("/{usuarioId}")
  public ResponseEntity<Void> delete(@PathVariable("usuarioId") UUID usuarioId) {
    usuarioServicio.deleteById(usuarioId);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/verificar-correo")
  public ResponseEntity<Map<String, Boolean>> verificarCorreo(@RequestParam String correo) {
    boolean correoExistente = usuarioServicio.existeCorreo(correo);
    Map<String, Boolean> response = new HashMap<>();
    response.put("correoValido", !correoExistente);
    return ResponseEntity.ok(response);
  }
  @GetMapping("/verificar-usuario")
  public ResponseEntity<Map<String, Boolean>> verificarUsuario(@RequestParam String nombreUsuario) {
    boolean usuarioExistente = usuarioServicio.existeUsuario(nombreUsuario);
    Map<String, Boolean> response = new HashMap<>();
    response.put("usuarioValido", !usuarioExistente);
    return ResponseEntity.ok(response);
  }
  @PostMapping("/login")
  public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData) {
    String nombreUsuario = loginData.get("nombreUsuario");
    String contraseña = loginData.get("contraseña");

    Usuario usuario = usuarioServicio.autenticar(nombreUsuario, contraseña);
    if (usuario != null) {
      // Aquí puedes generar un token JWT o manejar la sesión de alguna otra manera
      Map<String, String> response = new HashMap<>();
      response.put("message", "Inicio de sesión exitoso");
      // response.put("token", token); // Si estás usando JWT
      return ResponseEntity.ok(response);
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
  }
}
