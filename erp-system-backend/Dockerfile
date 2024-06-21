FROM openjdk:17-slim

# Instalar o cliente MySQL
RUN apt-get update && apt-get install -y default-mysql-client && apt-get clean

# Instalação do dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN apt-get update && apt-get install -y wget && \
    wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz && \
    rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY target/erp-system-backend-0.0.1-SNAPSHOT.jar /app/erp-system-backend.jar

EXPOSE 8080

CMD ["dockerize", "-wait", "tcp://mysql-container:3306", "-timeout", "60s", "java", "-jar", "/app/erp-system-backend.jar"]
