CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(19,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO orders (user_id, product, quantity, price, status) VALUES (1, 'Laptop', 1, 1200.00, 'CREATED');
INSERT INTO orders (user_id, product, quantity, price, status) VALUES (2, 'Mouse', 2, 50.00, 'CREATED');
