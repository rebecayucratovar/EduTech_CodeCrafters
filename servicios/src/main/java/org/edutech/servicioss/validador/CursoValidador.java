package org.edutech.servicioss.validador;

import org.edutech.servicioss.infraestructura.tablas.Curso;
import org.springframework.stereotype.Component;

@Component
public class CursoValidador {

  public void validate(Curso curso){

    if (curso.getNombre()==null || curso.getNombre().trim().isEmpty()){
      throw new IllegalArgumentException("Nombre no puede estar vacio");
    }

    if (curso.getAprendizaje()==null || curso.getAprendizaje().trim().isEmpty()){
      throw new IllegalArgumentException("Aprendizaje no puede estar vacio");
    }

    if (curso.getCategoria()==null){
      throw new IllegalArgumentException("Categoria no puede estar vacio");
    }
  }
}
