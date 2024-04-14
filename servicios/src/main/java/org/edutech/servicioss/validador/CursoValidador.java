package org.edutech.servicioss.validador;

import org.edutech.servicioss.infraestructura.tablas.Curso;
import org.springframework.stereotype.Component;

@Component
public class CursoValidador {

  public void validate(Curso curso){

    if (curso.getNombre() == null || curso.getNombre().trim().isEmpty()) {
      throw new IllegalArgumentException("Nombre no puede estar vacio");
    }

    if (curso.getNombre().length() > 40) {
      throw new IllegalArgumentException("El nombre debe tener 40 caracteres máximo");
    }

    if (curso.getAprendizaje() == null || curso.getAprendizaje().trim().isEmpty()) {
      throw new IllegalArgumentException("Aprendizaje no puede estar vacio");
    }

    if (curso.getAprendizaje().length() > 400) {
      throw new IllegalArgumentException("El aprendizaje debe tener 400 caracteres máximo");
    }

    if (curso.getCategoria() == null) {
      throw new IllegalArgumentException("Categoría no puede estar vacio");
    }

    if (curso.getRequisito() != null && !curso.getRequisito().trim().isEmpty() && curso.getRequisito().length() > 400) {
      throw new IllegalArgumentException("El requisito debe tener 400 caracteres máximo");
    }
  }
}
