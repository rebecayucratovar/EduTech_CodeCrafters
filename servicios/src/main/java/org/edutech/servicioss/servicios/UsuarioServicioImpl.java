package org.edutech.servicioss.servicios;

import lombok.RequiredArgsConstructor;
import org.edutech.servicioss.infraestructura.repositorios.UsuarioRepositorio;
import org.edutech.servicioss.infraestructura.tablas.Usuario;
import org.edutech.servicioss.validador.UsuarioValidador;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UsuarioServicioImpl implements UsuarioServicio {
  private final UsuarioRepositorio usuarioRepositorio;
  private final UsuarioValidador usuarioValidador;
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
    usuarioValidador.validate(usuario);
    return usuarioRepositorio.save(usuario);
  }

  @Override
  public Usuario update(Usuario usuario) {
    usuarioValidador.validate(usuario);
    return usuarioRepositorio.save(usuario);
  }

  @Override
  public void deleteById(UUID id) {
    usuarioRepositorio.deleteById(id);
  }

  @Override
  public boolean existeCorreo(String correo) {
    return usuarioRepositorio.existsByCorreo(correo);
  }

  @Override
  public boolean existeUsuario(String nombreUsuario) {
    return usuarioRepositorio.existsByNombreUsuario(nombreUsuario);
  }
  public Usuario autenticar(String nombreUsuario, String contraseña) {
    return usuarioRepositorio.findByNombreUsuarioAndContraseña(nombreUsuario, contraseña).orElse(null);
  }
}

