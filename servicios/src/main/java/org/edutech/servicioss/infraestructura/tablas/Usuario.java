package org.edutech.servicioss.infraestructura.tablas;

import jakarta.persistence.*;
import lombok.Data;
import org.edutech.servicioss.infraestructura.enums.TipoUsuario;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Entity
public class Usuario {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;

  private String nombreCompleto;

  private String nombreUsuario;

  private LocalDate fechaNacimiento;
  //@Enumerated(EnumType.STRING)
  private TipoUsuario tipoUsuario;

  private String correoElectronico;

  private String contrasenia;

  @Transient
  private String confirmarContrasenia;

}
