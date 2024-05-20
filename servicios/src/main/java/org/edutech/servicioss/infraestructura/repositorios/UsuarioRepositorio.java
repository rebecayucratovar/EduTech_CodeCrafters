package org.edutech.servicioss.infraestructura.repositorios;

import org.edutech.servicioss.infraestructura.tablas.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, UUID> {
  List<Usuario> findByNombreCompleto(String nombreCompleto);
  boolean existsByCorreo(String correo);
  boolean existsByNombreUsuario(String nombreUsuario);
  Optional<Usuario> findByNombreUsuarioAndContraseña(String nombreUsuario, String contraseña);

}
