package org.edutech.servicioss.infraestructura.tablas;

import jakarta.persistence.*;
import lombok.Data;
import org.edutech.servicioss.infraestructura.enums.TipoUsuario;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Entity
public class Usuario {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID usuarioId;

  private String nombreCompleto;

  @Column(unique = true)
  private String nombreUsuario;

  private LocalDate fechaNacimiento;

  private TipoUsuario tipoUsuario;

  private String correoElectronico;

  private String contrasenia;

  @Transient
  private String confirmarContrasenia;

  @OneToMany(mappedBy = "usuario")
  private List<Curso> cursos;
}
