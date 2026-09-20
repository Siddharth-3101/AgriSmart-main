# Multi-stage build for ai-service-fertilizer
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

# Copy source code for ai-service-fertilizer
COPY ai-service-fertilizer/src ./ai-service-fertilizer/src

# Package ai-service
RUN mvn clean package -pl ai-service-fertilizer -am -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy built jar
COPY --from=build /app/ai-service-fertilizer/target/ai-service-*.jar app.jar

ENV PORT=8086
EXPOSE 8086

ENTRYPOINT ["java", "-jar", "app.jar"]
