package org.edutech.servicioss.controlador;

import lombok.RequiredArgsConstructor;
import org.edutech.servicioss.infraestructura.tablas.Compra;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.edutech.servicioss.servicios.CompraServicio;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "https://edutech-codecrafters.netlify.app"})
@RequestMapping("/compras")
@RequiredArgsConstructor
public class CompraControlador {
    private final CompraServicio compraServicio;
    @PostMapping("/registrar")
    public ResponseEntity<Void> registrarCompras(@RequestParam String usuarioId, @RequestBody List<String> cursosIds) {
        UUID usuarioUUID = UUID.fromString(usuarioId);
        List<UUID> cursosUUID = cursosIds.stream().map(UUID::fromString).collect(Collectors.toList());
        compraServicio.registrarCompras(usuarioUUID, cursosUUID);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Compra>> obtenerComprasPorUsuario(@PathVariable UUID usuarioId) {
        List<Compra> compras = compraServicio.obtenerComprasPorUsuario(usuarioId);
        return new ResponseEntity<>(compras, HttpStatus.OK);
    }
}
