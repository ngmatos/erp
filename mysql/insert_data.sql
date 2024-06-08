
-- Inserção de alguns papéis (roles)
INSERT INTO role (role_name) VALUES ('USER');
INSERT INTO role (role_name) VALUES ('ADMIN');
INSERT INTO role (role_name) VALUES ('EMPLOYER');
INSERT INTO role (role_name) VALUES ('CLIENT');

-- Inserção de alguns usuários
INSERT INTO user (name, email, address, password, role_id) VALUES ('Admin', 'admin@example.com', 'Admin Address', '1234', 2); -- ADMIN
INSERT INTO user (name, email, address, password, role_id) VALUES ('Employee 1', 'employee1@example.com', 'Employee 1 Address', 'senha_emp1', 3); -- EMPLOYEE
INSERT INTO user (name, email, address, password, role_id) VALUES ('Employee 2', 'employee2@example.com', 'Employee 2 Address', 'senha_emp2', 3); -- EMPLOYEE
INSERT INTO user (name, email, address, password, role_id) VALUES ('Customer 1', 'customer1@example.com', 'Customer 1 Address', 'senha_cus1', 4); -- CUSTOMER

-- Inserção de algumas categorias
INSERT INTO categories (category_name) VALUES ('Electronics');
INSERT INTO categories (category_name) VALUES ('Clothing');
INSERT INTO categories (category_name) VALUES ('Books');

-- Inserção de alguns itens
INSERT INTO items (name, category_id, stock_quantity) VALUES ('Smartphone', 1, 100);
INSERT INTO items (name, category_id, stock_quantity) VALUES ('T-shirt', 2, 200);
INSERT INTO items (name, category_id, stock_quantity) VALUES ('Novel', 3, 50);

-- Inserção de alguns status de pedido
INSERT INTO order_status (status) VALUES ('Pending');
INSERT INTO order_status (status) VALUES ('Shipped');
INSERT INTO order_status (status) VALUES ('Delivered');

-- Inserção de alguns pedidos
INSERT INTO orders (order_no, date_ordered, order_status_id, customer_id) VALUES ('ORD001', '2024-06-06', 1, 2); -- Pedido pendente do Employee 1
INSERT INTO orders (order_no, date_ordered, order_status_id, customer_id) VALUES ('ORD002', '2024-06-07', 1, 3); -- Pedido pendente do Employee 2
INSERT INTO orders (order_no, date_ordered, order_status_id, customer_id) VALUES ('ORD003', '2024-06-08', 2, 2); -- Pedido enviado do Employee 1

-- Inserção de alguns itens do pedido
INSERT INTO order_items (order_id, item_id, quantity) VALUES (1, 1, 2); -- 2 smartphones no primeiro pedido
INSERT INTO order_items (order_id, item_id, quantity) VALUES (2, 2, 3); -- 3 t-shirts no segundo pedido
INSERT INTO order_items (order_id, item_id, quantity) VALUES (3, 3, 1); -- 1 romance no terceiro pedido
