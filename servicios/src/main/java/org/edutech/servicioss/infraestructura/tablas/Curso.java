package org.edutech.servicioss.infraestructura.tablas;

import jakarta.persistence.*;
import lombok.Data;
import org.edutech.servicioss.infraestructura.enums.Categoria;

import java.util.UUID;

@Data
@Entity
public class Curso {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  private String nombre;

  //@Enumerated(EnumType.STRING)
  private String categoria;

  private String imagen;

  private int costo;

  private String requisito;

  private String aprendizaje;

  @ManyToOne
  @JoinColumn(name = "usuario_id")
  private Usuario usuario;
}
