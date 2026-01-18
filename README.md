# Spring Boot Microservices Monorepo

A complete, production-quality Java Gradle monorepo project demonstrating a modern microservices architecture with Spring Boot 3, Kafka, Redis, MySQL, PostgreSQL, Apache Camel, and SOAP.

## 🏗 Architecture Overview

```text
                     +-------------------+
                     |   Postman / UI    |
                     +---------+---------+
                               |
                               v (Port 8080)
                     +---------+---------+
                     |    API Gateway    |
                     +----+----+----+----+
                          |    |    |
          +---------------+    |    +-----------------+
          |                    |                      |
          v (Port 8081)        v (Port 8082)          v (Port 8083)
    +-----+------+       +-----+------+        +------+-------+
    | User Svc   |       | Order Svc  |        | Notif Svc    |
    | (MySQL)    |       | (PostgreSQL)|        | (Camel)      |
    | (Redis)    <---+   | (Kafka Pub)+------->| (Kafka Sub)  |
    | (SOAP)     |   |   +------------+        +--------------+
    +------------+   |
                     |
               +-----+-----+
               |   Redis   |
               +-----------+
```

## 🚀 Tech Stack

- **Java 17** (compatible with Java 8/11 syntax where possible)
- **Gradle** (Monorepo with Version Catalog)
- **Spring Boot 3.2.1**
- **Spring Cloud Gateway** (API Gateway pattern)
- **Spring Data JPA** (Hibernate)
- **Kafka** (Asynchronous event-driven communication)
- **Redis** (Distributed caching for User lookups)
- **MySQL** (User database with Flyway)
- **PostgreSQL** (Order database with Flyway)
- **Apache Camel** (Enterprise Integration Patterns / Routing)
- **SOAP (JAX-WS)** (Legacy integration example in User Service)
- **OpenAPI / Swagger** (Interactive API documentation)
- **Docker & Docker Compose** (Container orchestration)

## 📁 Project Structure

- `common-lib/`: Shared DTOs and Kafka events.
- `user-service/`: Manages users (MySQL), provides Cache (Redis), and exposes SOAP.
- `order-service/`: Manages orders (PostgreSQL) and publishes events to Kafka.
- `notification-service/`: Consumes Kafka events and routes via Apache Camel.
- `api-gateway/`: Entry point for all external requests.

## 🛠 Prerequisites

- Docker and Docker Compose
- JDK 17 (to build locally, though Docker handles it)
- Gradle (optional, if using the included wrapper scripts)

## 🏃 Build and Run

You can build and start all services, including databases and brokers, with a single command:

```bash
docker-compose up --build
```

Wait for all services to start. The Gateway will be available on port **8080**.

## 📍 API Endpoints & Ports

| Service            | Internal Port | Gateway Route             | Description              |
|--------------------|---------------|---------------------------|--------------------------|
| **API Gateway**    | 8080          | `/`                       | Main Entry Point         |
| **User Service**   | 8081          | `/api/users/**`           | REST User CRUD           |
| **User Service**   | 8081          | `/ws/users.wsdl`          | SOAP Endpoint            |
| **Order Service**  | 8082          | `/api/orders/**`          | REST Order CRUD          |
| **Notification Svc**| 8083         | `/api/notifications/**`   | Notification History     |

## 📖 Accessing Swagger UI

Swagger UI is available for all services through the gateway:

- **User Service:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **Order Service:** [http://localhost:8080/swagger-ui.html?url=/api-docs/orders](http://localhost:8080/swagger-ui.html?url=/api-docs/orders)
- **Notification:** [http://localhost:8083/swagger-ui.html](http://localhost:8083/swagger-ui.html) (Direct access recommended)

## 🧪 Sample CURL Commands

### 1. Create a User
```bash
curl -X POST http://localhost:8080/api/users \
-H "Content-Type: application/json" \
-d '{"username": "antigravity", "email": "ai@example.com", "fullName": "Antigravity AI"}'
```

### 2. Create an Order (Triggers Kafka & Camel)
```bash
curl -X POST http://localhost:8080/api/orders \
-H "Content-Type: application/json" \
-d '{"userId": 1, "product": "Neural Link", "quantity": 1, "price": 999.99}'
```

### 3. Check Notifications (Verified via Camel route)
```bash
curl http://localhost:8080/api/notifications
```

### 4. SOAP Request (Get User via SOAP)
```bash
curl --header "Content-Type: text/xml;charset=UTF-8" \
--header "SOAPAction: http://example.com/userservice/soap/getUserRequest" \
--data '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://example.com/userservice/soap"><soapenv:Header/><soapenv:Body><soap:getUserRequest><soap:id>1</soap:id></soap:getUserRequest></soapenv:Body></soapenv:Envelope>' \
http://localhost:8080/ws
```

## 📦 Container Management

- **MySQL:** Port 3306 (user/root, password/rootpassword)
- **PostgreSQL:** Port 5432 (user/postgres, password/postgrespassword)
- **Redis:** Port 6379
- **Kafka:** Port 9092
