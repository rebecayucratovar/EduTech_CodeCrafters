package org.edutech.servicioss.infraestructura.repositorios;

import org.edutech.servicioss.infraestructura.tablas.Compra;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface CompraRepositorio extends JpaRepository<Compra, UUID> {
    List<Compra> findAllByUsuarioUsuarioId(UUID usuarioId);
    boolean existsByUsuarioUsuarioIdAndCursoId(UUID usuarioId, UUID cursoId);
    int countByCursoId(UUID cursoId);  // Añadir este método

}
