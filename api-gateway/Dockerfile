# Build stage
FROM gradle:8.5-jdk17 AS build
WORKDIR /home/gradle/src
COPY --chown=gradle:gradle . .
RUN gradle :api-gateway:build -x test --no-daemon

# Run stage
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /home/gradle/src/api-gateway/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
