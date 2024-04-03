package org.edutech.servicioss.infraestructura.repositorios;

import org.edutech.servicioss.infraestructura.tablas.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CursoRepositorio extends JpaRepository<Curso, UUID> {
  List<Curso> findByName(String nombre);

}
