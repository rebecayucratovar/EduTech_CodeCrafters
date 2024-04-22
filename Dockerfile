# Utiliza la imagen de OpenJDK 17 con Alpine (ligera)
FROM openjdk:17-jdk-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos JAR de tu aplicación al contenedor
COPY ./target/*.jar app.jar

# Define el punto de entrada para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
