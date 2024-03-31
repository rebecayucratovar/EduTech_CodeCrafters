package org.edutech.servicioss.infraestructura.conexion;

import java.sql.Connection;
import java.sql.SQLException;

public interface BDconexion {
  Connection getConnection() throws SQLException;
}
