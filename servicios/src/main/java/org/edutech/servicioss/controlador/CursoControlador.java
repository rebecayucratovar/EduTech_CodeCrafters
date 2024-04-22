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
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/cursos")
@RequiredArgsConstructor
public class CursoControlador {
  private final CursoServicio cursoServicio;  @PostMapping("/save")
  public ResponseEntity<Curso> saveCurso(@RequestParam("file") MultipartFile imagen, Curso curso, RedirectAttributes attributes) {
    if (curso.getTitulo() == null || curso.getTitulo().trim().isEmpty()) {
      return ResponseEntity.badRequest().build();
    }

    if (!imagen.isEmpty()) {
      Path directorioImagenes = Paths.get("servicios//src//main//resources//static//imagen");
      String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();

      try {
        if (!imagen.getOriginalFilename().endsWith(".png")) {
          return ResponseEntity.badRequest().build(); // Retornar una respuesta de error si no es una imagen PNG
        }

        byte[] bytesImg = imagen.getBytes();
        String nombreImagen = imagen.getOriginalFilename();
        Path rutaCompleta = Paths.get(rutaAbsoluta + "//" + nombreImagen);
        Files.write(rutaCompleta, bytesImg);

        curso.setImagen(nombreImagen);

      } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Retornar una respuesta de error en caso de una excepción
      }
    }
    return ResponseEntity.ok(cursoServicio.save(curso));
  }


  @GetMapping("/lista")
  public ResponseEntity<List<Curso>> getAllCursos(){
    List<Curso> cursos = cursoServicio.getAll();
    if (cursos.isEmpty()){
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.ok(cursos);
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
