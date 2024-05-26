package org.edutech.servicioss.servicios;

import lombok.RequiredArgsConstructor;
import org.edutech.servicioss.infraestructura.repositorios.CompraRepositorio;
import org.edutech.servicioss.infraestructura.repositorios.CursoRepositorio;
import org.edutech.servicioss.infraestructura.tablas.Curso;
import org.edutech.servicioss.infraestructura.tablas.Usuario;
import org.edutech.servicioss.validador.CursoValidador;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CursoServicioImpl implements CursoServicio{

  private final CursoRepositorio cursoRepositorio;
  private final CursoValidador cursoValidador;
  private final CompraRepositorio compraRepositorio;
  //private final UsuarioServicio usuarioServicio; // Inyecta el UsuarioServicio

  @Override
  @Transactional(readOnly = true)
  public List<Curso> getAll() {
    List<Curso> cursos = cursoRepositorio.findAll();
    for (Curso curso : cursos) {
      Usuario usuario = curso.getUsuario();
      if (usuario != null) {
        curso.setNombreCompletoUsuario(usuario.getNombreCompleto());
      } else {
        curso.setNombreCompletoUsuario(null);
      }
      curso.setUsuario(null);  // Eliminar referencia a Usuario para evitar envíos innecesarios al frontend
      // Calcular y establecer el número de estudiantes
      int numeroEstudiantes = compraRepositorio.countByCursoId(curso.getId());
      curso.setNumeroEstudiantes(numeroEstudiantes);
    }
    return cursos;
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
