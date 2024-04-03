package org.edutech.servicioss.servicios;

import org.edutech.servicioss.infraestructura.tablas.Curso;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CursoServicio {
  List<Curso> getAll();
  Optional<Curso> findById(UUID id);
  Curso save(Curso curso);
  Curso update(Curso curso);
  void deleteById(UUID id);
}
