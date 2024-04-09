package org.edutech.servicioss.servicios;

import org.edutech.servicioss.infraestructura.tablas.Usuario;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UsuarioServicio {
  List<Usuario> getAll();
  Optional<Usuario> findById(UUID id);
  Usuario save(Usuario usuario);
  Usuario update(Usuario usuario);
  void deleteById(UUID id);

}

