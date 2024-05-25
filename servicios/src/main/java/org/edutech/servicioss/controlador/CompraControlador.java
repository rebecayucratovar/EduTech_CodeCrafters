package org.edutech.servicioss.controlador;

import lombok.RequiredArgsConstructor;
import org.edutech.servicioss.infraestructura.tablas.Compra;
import org.edutech.servicioss.infraestructura.tablas.Curso;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.edutech.servicioss.servicios.CompraServicio;

import java.util.List;
import java.util.UUID;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "https://edutech-codecrafters.netlify.app"})
@RequestMapping("/compras")
@RequiredArgsConstructor
public class CompraControlador {
    private final CompraServicio compraServicio;
    @PostMapping("/registrar")
    public ResponseEntity<Void> registrarCompras(@RequestParam String usuarioId,@RequestBody List<UUID> cursosIds) {
        try{
        UUID usuarioUUID = UUID.fromString(usuarioId);
        //List<UUID> cursosUUID = cursosIds.stream().map(UUID::fromString).collect(Collectors.toList());
        compraServicio.registrarCompras(usuarioUUID, cursosIds);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }catch (IllegalArgumentException e) {
        // Manejar el error si el usuarioId no es un UUID válido
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    } catch (Exception e) {
        // Manejar otros errores
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }}

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Curso>> obtenerCursosCompradosPorUsuario(@PathVariable String usuarioId) {
        try {
            UUID usuarioUUID = UUID.fromString(usuarioId);
            List<Curso> cursosComprados = compraServicio.obtenerCursosCompradosConNombresCompletos(usuarioUUID);
            return ResponseEntity.ok(cursosComprados);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
