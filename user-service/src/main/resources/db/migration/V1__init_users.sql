CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, full_name) VALUES ('jdoe', 'john.doe@example.com', 'John Doe');
INSERT INTO users (username, email, full_name) VALUES ('asmith', 'alice.smith@example.com', 'Alice Smith');
