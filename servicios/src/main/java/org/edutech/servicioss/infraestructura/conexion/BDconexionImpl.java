package org.edutech.servicioss.infraestructura.conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class BDconexionImpl implements BDconexion{
  private static final String PORT = "3306"; // environment variables
  private static final String USER = "uphlrap4jho52sxm"; // environment variables
  private static final String PASSWORD = "H6Ract7DiaK09oeYjmOI"; // environment variables
  private static final String HOST = "bpbrow7nzuvik4o584fx-mysql.services.clever-cloud.com"; // 127.0.0.1 // environment variables
  private static final String DB_NAME = "bpbrow7nzuvik4o584fx"; // environment variables

  public Connection getConnection() throws SQLException {
    return DriverManager.getConnection(createDBURL(), USER, PASSWORD);
  }

  private String createDBURL() {
    return "jdbc:mysql://%s:%s/%s".formatted(HOST, PORT, DB_NAME);
  }

}
