package org.edutech.servicioss.controlador;

import lombok.RequiredArgsConstructor;
import org.edutech.servicioss.infraestructura.tablas.Curso;
import org.edutech.servicioss.servicios.CursoServicio;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/cursos")
@RequiredArgsConstructor
public class CursoControlador {
  private final CursoServicio cursoServicio;

  @PostMapping
  public ResponseEntity<Curso> saveCurso(@RequestBody Curso curso){
    if(curso.getNombre()==null|| curso.getNombre().trim().isEmpty()){
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(cursoServicio.save(curso));
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
    var cursoFound = cursoServicio.findById(cursoId);

    if(cursoFound.isEmpty()){
      return ResponseEntity.notFound().build();

    }
    return ResponseEntity.ok(cursoFound.get());
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
