package org.edutech.servicioss.controlador;

import com.google.auth.oauth2.ServiceAccountCredentials;
import lombok.RequiredArgsConstructor;
import org.edutech.servicioss.infraestructura.tablas.Curso;
import org.edutech.servicioss.servicios.CursoServicio;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.FileInputStream;
import java.io.IOException;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/cursos")
@RequiredArgsConstructor
public class CursoControlador {
  private final CursoServicio cursoServicio;

  @Value("${google.cloud.credentials.path}")
  private String credentialsPath;
  @PostMapping("/save")
  public ResponseEntity<Curso> saveCurso(@RequestParam("file") MultipartFile imagen, Curso curso, RedirectAttributes attributes) {
    if (curso.getTitulo() == null || curso.getTitulo().trim().isEmpty()) {
      return ResponseEntity.badRequest().build();
    }

    try {
      // Inicializar StorageOptions con las credenciales del archivo JSON
      Storage storage = StorageOptions.newBuilder()
              .setCredentials(ServiceAccountCredentials.fromStream(new FileInputStream(credentialsPath)))
              .build().getService();

      Bucket bucket = storage.get("img-codecrafters");

      String nombreImagen = UUID.randomUUID().toString() + "_" + imagen.getOriginalFilename();

      Blob blob = bucket.create(nombreImagen, imagen.getBytes(), imagen.getContentType());

      curso.setImagen(blob.getMediaLink());
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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
