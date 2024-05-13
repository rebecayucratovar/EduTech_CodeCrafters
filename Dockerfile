FROM eclipse-temurin:17-jre-alpine
EXPOSE 3039
COPY ./servicios/target/*.jar /app/app.jar
CMD ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/app.jar"]

