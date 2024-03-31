package org.edutech.servicioss.infraestructura.conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class BDconexionImpl implements BDconexion{
  private static final String PORT = ""; // environment variables
  private static final String USER = ""; // environment variables
  private static final String PASSWORD = ""; // environment variables
  private static final String HOST = ""; // 127.0.0.1 // environment variables
  private static final String DB_NAME = ""; // environment variables

  public Connection getConnection() throws SQLException {
    return DriverManager.getConnection(createDBURL(), USER, PASSWORD);
  }

  private String createDBURL() {
    return "jdbc:mysql://%s:%s/%s".formatted(HOST, PORT, DB_NAME);
  }

}
