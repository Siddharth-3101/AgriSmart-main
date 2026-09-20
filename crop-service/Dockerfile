# Multi-stage build for crop-service
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy root pom and module poms
COPY pom.xml ./
COPY user-service/pom.xml ./user-service/
COPY farm-service/pom.xml ./farm-service/
COPY crop-service/pom.xml ./crop-service/
COPY weather-service/pom.xml ./weather-service/
COPY analytics-service/pom.xml ./analytics-service/
COPY ai-service(fertilizer)/pom.xml ./ai-service(fertilizer)/

# Copy source code for crop-service
COPY crop-service/src ./crop-service/src

# Package crop-service
RUN mvn clean package -pl crop-service -am -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy built jar
COPY --from=build /app/crop-service/target/crop-service-*.jar app.jar

ENV PORT=8083
EXPOSE 8083

ENTRYPOINT ["java", "-jar", "app.jar"]
