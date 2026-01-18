# Build stage
FROM gradle:8.5-jdk17 AS build
WORKDIR /home/gradle/src
COPY --chown=gradle:gradle . .
# Build the specific service and its dependencies (common-lib)
RUN gradle :user-service:build -x test --no-daemon

# Run stage
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /home/gradle/src/user-service/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
