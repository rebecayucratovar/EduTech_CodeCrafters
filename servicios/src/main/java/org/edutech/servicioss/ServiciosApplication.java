package org.edutech.servicioss;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class ServiciosApplication extends SpringBootServletInitializer {

  public static void main(String[] args) {
    SpringApplication.run(ServiciosApplication.class, args);
  }
  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder application){
    return application.sources(ServiciosApplication.class);
  }
}
