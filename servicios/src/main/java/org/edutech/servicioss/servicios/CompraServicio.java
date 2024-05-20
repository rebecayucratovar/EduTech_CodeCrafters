package org.edutech.servicioss.servicios;

import org.edutech.servicioss.infraestructura.tablas.Compra;

import java.util.List;
import java.util.UUID;

public interface CompraServicio {
    void registrarCompras(UUID usuarioId, List<UUID> cursosIds);
    List<Compra> obtenerComprasPorUsuario(UUID usuarioId);
}
