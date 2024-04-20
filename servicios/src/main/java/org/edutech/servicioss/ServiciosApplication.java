package org.edutech.servicioss;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ServiciosApplication{

  public static void main(String[] args) {
    SpringApplication.run(ServiciosApplication.class, args);
  }
}
