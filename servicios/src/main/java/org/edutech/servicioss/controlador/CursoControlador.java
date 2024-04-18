package org.edutech.servicioss.controlador;

import lombok.RequiredArgsConstructor;
import org.edutech.servicioss.infraestructura.tablas.Curso;
import org.edutech.servicioss.servicios.CursoServicio;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/cursos")
@RequiredArgsConstructor
public class CursoControlador {
  private final CursoServicio cursoServicio;

  @PostMapping("/save")
  public ResponseEntity<Curso> saveCurso(@RequestParam("file") MultipartFile imagen, Curso curso, RedirectAttributes attributes) {
    if (curso.getTitulo() == null || curso.getTitulo().trim().isEmpty()) {
      return ResponseEntity.badRequest().build();
    }

    try {
      if (!imagen.isEmpty()) {
        curso.setImagen(imagen.getBytes()); // Guardar la imagen como array de bytes
      }
      return ResponseEntity.ok(cursoServicio.save(curso));
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Devolver un error 500
    }
  }

  @GetMapping
  public ResponseEntity<List<Curso>> getAllCursos(){
    var cursoResult = cursoServicio.getAll();
    if (cursoResult.isEmpty()){
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.ok(cursoResult);
  }

  @PostMapping("/{cursoId}")
  public ResponseEntity<Curso> getOne(@PathVariable("cursoId") UUID cursoId){
    return cursoServicio.findById(cursoId)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PutMapping("/{cursoId}")
  public ResponseEntity<Curso> update(@PathVariable("cursoId") UUID cursoId, @RequestBody Curso cursoBody) {
    cursoBody.setId(cursoId);
    return ResponseEntity.ok(cursoServicio.update(cursoBody));
  }

  @DeleteMapping("/{cursoId}")
  public ResponseEntity<Void> delete(@PathVariable("cursoId") UUID cursoId) {
    cursoServicio.deleteById(cursoId);
    return ResponseEntity.noContent().build();
  }
}
