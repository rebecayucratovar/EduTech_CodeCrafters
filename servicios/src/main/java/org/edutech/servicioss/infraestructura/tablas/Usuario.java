package org.edutech.servicioss.infraestructura.tablas;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import org.edutech.servicioss.infraestructura.enums.TipoUsuario;
import java.util.UUID;

@Data
@Entity
public class Usuario {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;
  private String nombreCompleto;
  private String nombreUsuario;
  private String fechaNacimiento;
  private TipoUsuario tipoUsuario;
  private String correoElectronico;
  private String contrasenia;

}
