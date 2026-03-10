# 第一階段：使用 Maven 打包程式 (改用 Amazon Corretto 提供的 JDK，非常穩定)
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# 第二階段：執行程式 (改用更廣泛支援的 eclipse-temurin)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
