package org.edutech.servicioss.servicios;

import lombok.RequiredArgsConstructor;
import org.edutech.servicioss.infraestructura.repositorios.CursoRepositorio;
import org.edutech.servicioss.infraestructura.tablas.Curso;
import org.edutech.servicioss.validador.CursoValidador;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CursoServicioImpl implements CursoServicio{

  private final CursoRepositorio cursoRepositorio;
  private final CursoValidador cursoValidador;

  @Override
  public List<Curso> getAll() {
    return cursoRepositorio.findAll();
  }

  @Override
  public Optional<Curso> findById(UUID id) {
    return cursoRepositorio.findById(id);
  }

  @Override
  public Curso save(Curso curso) {

    cursoValidador.validate(curso);
    return cursoRepositorio.save(curso);
  }

  @Override
  public Curso update(Curso curso) {
    cursoValidador.validate(curso);
    return cursoRepositorio.save(curso);
  }

  @Override
  public void deleteById(UUID id) {
    cursoRepositorio.deleteById(id);
  }
}
