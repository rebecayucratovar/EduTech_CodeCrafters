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

  private String titulo;

  private String descripcion;

  private Categoria categoria;

  private String imagen;

  private double costo;

  private String requisitos;

  private String aprenderas;

  @ManyToOne
  @JoinColumn(name = "usuario_id")
  private Usuario usuario;
}
