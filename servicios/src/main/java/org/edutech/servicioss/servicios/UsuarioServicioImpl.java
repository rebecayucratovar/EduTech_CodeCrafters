package org.edutech.servicioss.servicios;

import lombok.RequiredArgsConstructor;
import org.edutech.servicioss.infraestructura.repositorios.UsuarioRepositorio;
import org.edutech.servicioss.infraestructura.tablas.Usuario;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UsuarioServicioImpl implements UsuarioServicio {
  private final UsuarioRepositorio usuarioRepositorio;

  @Override
  public List<Usuario> getAll() {
    return usuarioRepositorio.findAll();
  }

  @Override
  public Optional<Usuario> findById(UUID id) {
    return usuarioRepositorio.findById(id);
  }

  @Override
  public Usuario save(Usuario usuario) {
    return usuarioRepositorio.save(usuario);
  }

  @Override
  public Usuario update(Usuario usuario) {
    return usuarioRepositorio.save(usuario);
  }

  @Override
  public void deleteById(UUID id) {
    usuarioRepositorio.deleteById(id);
  }
}
