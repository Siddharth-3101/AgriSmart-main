# Multi-stage build for farm-service
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy root pom and module poms
COPY pom.xml ./
COPY user-service/pom.xml ./user-service/
COPY farm-service/pom.xml ./farm-service/
COPY crop-service/pom.xml ./crop-service/
COPY weather-service/pom.xml ./weather-service/
COPY analytics-service/pom.xml ./analytics-service/
COPY ai-service-fertilizer/pom.xml ./ai-service-fertilizer/

# Copy source code for farm-service
COPY farm-service/src ./farm-service/src

# Package farm-service
RUN mvn clean package -pl farm-service -am -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy built jar
COPY --from=build /app/farm-service/target/farm-service-*.jar app.jar

ENV PORT=8082
EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]
