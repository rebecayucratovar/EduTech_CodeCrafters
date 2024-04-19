package org.edutech.servicioss.controlador;

import lombok.RequiredArgsConstructor;
import org.edutech.servicioss.infraestructura.tablas.Curso;
import org.edutech.servicioss.infraestructura.tablas.Usuario;
import org.edutech.servicioss.servicios.CursoServicio;
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
@RequestMapping("/cursos")
@RequiredArgsConstructor
public class CursoControlador {
  private final CursoServicio cursoServicio;

  @PostMapping("/save")
  public ResponseEntity<Curso> saveCurso(@RequestParam("file")MultipartFile imagen,Curso curso,RedirectAttributes attributes){
    if(curso.getTitulo()==null|| curso.getTitulo().trim().isEmpty()){
      return ResponseEntity.badRequest().build();
    }

    if(!imagen.isEmpty()){
      Path directorioImagenes = Paths.get("servicios//src//main//resources//static/imagen");
      String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();

      try {
        byte[] bytesImg = imagen.getBytes();
        Path rutaCompleta = Paths.get(rutaAbsoluta + "//" + imagen.getOriginalFilename());
        Files.write(rutaCompleta, bytesImg);

        if (imagen.getOriginalFilename() != null) {
          curso.setImagen(imagen.getOriginalFilename().getBytes());
        }

      }catch (IOException e){
        e.printStackTrace();

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
    for (Curso curso : cursos) {
      Usuario instructor = curso.getUsuario();
      //instructor.getNombreCompleto(); // Asegúrate de que se carguen los datos del instructor desde la base de datos
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
