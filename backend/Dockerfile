FROM ubuntu:latest
LABEL authors="Ajneb"

ENTRYPOINT ["top", "-b"]

FROM amazoncorretto:23-alpine-jdk

COPY target/tech-challenge-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]