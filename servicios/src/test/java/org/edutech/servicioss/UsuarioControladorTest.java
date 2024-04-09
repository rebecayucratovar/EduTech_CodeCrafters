package org.edutech.servicioss;

import static org.mockito.Mockito.*;

import org.edutech.servicioss.infraestructura.tablas.Usuario;
import org.edutech.servicioss.servicios.UsuarioServicio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.edutech.servicioss.controlador.UsuarioControlador;
import org.edutech.servicioss.infraestructura.enums.TipoUsuario;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class UsuarioControladorTest {

    private UsuarioControlador usuarioControlador;
    private UsuarioServicio usuarioServicioMock;

    @BeforeEach
    void setUp() {
        usuarioServicioMock = mock(UsuarioServicio.class);
        usuarioControlador = new UsuarioControlador(usuarioServicioMock);
    }

    @Test
    void saveUsuario_ValidUser_ReturnsOkResponse() {
        Usuario usuario = new Usuario(); // Crear un usuario válido para la prueba
        usuario.setNombreCompleto("John Doe");
        usuario.setNombreUsuario("johndoe");
        usuario.setCorreoElectronico("johndoe@example.com");
        usuario.setContrasenia("password");
        usuario.setConfirmarContrasenia("password");
        usuario.setTipoUsuario(TipoUsuario.ESTUDIANTE); // Establecer tipo de usuario como ESTUDIANTE
        usuario.setFechaNacimiento(LocalDate.of(1990, 1, 1)); // Establecer fecha de nacimiento

        when(usuarioServicioMock.save(usuario)).thenReturn(usuario); // Mockear el servicio para devolver el usuario guardado

        // Act
        ResponseEntity<Usuario> response = usuarioControlador.saveUsuario(usuario);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode()); // Verificar que la respuesta es OK
        assertNotNull(response.getBody()); // Verificar que la respuesta contiene un usuario
        assertEquals(usuario, response.getBody()); // Verificar que el usuario devuelto es el mismo que se guardó
    }
}
