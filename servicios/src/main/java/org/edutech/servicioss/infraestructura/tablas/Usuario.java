package org.edutech.servicioss.infraestructura.tablas;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

  @Enumerated(EnumType.STRING)
  private TipoUsuario tipoUsuario;

  private String correo;

  private String contraseña;

  @Transient
  private String confirmacionContraseña;

  @OneToMany(mappedBy = "usuario", fetch = FetchType.EAGER) // Cambio aquí
  @JsonIgnore // Evita la serialización recursiva
  private List<Curso> cursos;
}
