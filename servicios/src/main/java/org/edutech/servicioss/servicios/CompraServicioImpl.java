package org.edutech.servicioss.servicios;

import lombok.RequiredArgsConstructor;
import org.edutech.servicioss.infraestructura.repositorios.CompraRepositorio;
import org.edutech.servicioss.infraestructura.repositorios.CursoRepositorio;
import org.edutech.servicioss.infraestructura.repositorios.UsuarioRepositorio;
import org.edutech.servicioss.infraestructura.tablas.Compra;
import org.edutech.servicioss.infraestructura.tablas.Curso;
import org.edutech.servicioss.infraestructura.tablas.Usuario;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompraServicioImpl implements CompraServicio {

    private final CompraRepositorio compraRepositorio;
    private final UsuarioRepositorio usuarioRepositorio;
    private final CursoRepositorio cursoRepositorio;

    @Override
    public void registrarCompras(UUID usuarioId, List<UUID> cursosIds) {
        Usuario usuario = usuarioRepositorio.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        for (UUID cursoId : cursosIds) {
            Curso curso = cursoRepositorio.findById(cursoId)
                    .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

            Compra compra = new Compra();
            compra.setUsuario(usuario);
            compra.setCurso(curso);
            compraRepositorio.save(compra);
        }
    }
    @Override
    public List<Curso> obtenerCursosCompradosPorUsuario(UUID usuarioId) {
        List<Compra> compras = compraRepositorio.findAllByUsuarioUsuarioId(usuarioId);
        List<Curso> cursosComprados = new ArrayList<>();
        for (Compra compra : compras) {
            cursosComprados.add(compra.getCurso());
        }
        return cursosComprados;
    }
}

