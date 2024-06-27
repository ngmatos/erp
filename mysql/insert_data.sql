
-- Inserção de alguns papéis (roles)
INSERT INTO role (role_name) VALUES ('USER');
INSERT INTO role (role_name) VALUES ('ADMIN');
INSERT INTO role (role_name) VALUES ('EMPLOYER');
INSERT INTO role (role_name) VALUES ('CLIENT');

-- Inserção de alguns usuários
INSERT INTO user (name, email, address, password, role_id) VALUES ('Admin', 'admin@example.com', 'Admin Address', '12345678', 2); -- ADMIN
INSERT INTO user (name, email, address, password, role_id) VALUES ('Employee 1', 'employee1@example.com', 'Employee 1 Address', 'senha_emp1', 3); -- EMPLOYEE
INSERT INTO user (name, email, address, password, role_id) VALUES ('Employee 2', 'employee2@example.com', 'Employee 2 Address', 'senha_emp2', 3); -- EMPLOYEE
INSERT INTO user (name, email, address, password, role_id) VALUES ('Customer 1', 'customer1@example.com', 'Customer 1 Address', 'senha_cus1', 4); -- CUSTOMER
INSERT INTO user (name, email, address, password, role_id) VALUES ('Customer 2', 'customer2@example.com', 'Customer 2 Address', 'senha_cus2', 4); -- CUSTOMER
INSERT INTO user (name, email, address, password, role_id) VALUES ('Employee 3', 'employee3@example.com', 'Employee 3 Address', 'senha_emp3', 3); -- EMPLOYEE
INSERT INTO user (name, email, address, password, role_id) VALUES ('Employee 4', 'employee4@example.com', 'Employee 4 Address', 'senha_emp4', 3); -- EMPLOYEE
INSERT INTO user (name, email, address, password, role_id) VALUES ('Customer 3', 'customer3@example.com', 'Customer 3 Address', 'senha_cus3', 4); -- CUSTOMER
INSERT INTO user (name, email, address, password, role_id) VALUES ('Customer 4', 'customer4@example.com', 'Customer 4 Address', 'senha_cus4', 4); -- CUSTOMER
INSERT INTO user (name, email, address, password, role_id) VALUES ('Customer 5', 'customer5@example.com', 'Customer 5 Address', 'senha_cus5', 4); -- CUSTOMER
INSERT INTO user (name, email, address, password, role_id) VALUES ('Customer 6', 'customer6@example.com', 'Customer 6 Address', 'senha_cus6', 4); -- CUSTOMER
INSERT INTO user (name, email, address, password, role_id) VALUES ('Customer 7', 'customer7@example.com', 'Customer 7 Address', 'senha_cus7', 4); -- CUSTOMER
INSERT INTO user (name, email, address, password, role_id) VALUES ('Customer 8', 'customer8@example.com', 'Customer 8 Address', 'senha_cus8', 4); -- CUSTOMER
INSERT INTO user (name, email, address, password, role_id) VALUES ('Customer 9', 'customer9@example.com', 'Customer 9 Address', 'senha_cus9', 4); -- CUSTOMER
INSERT INTO user (name, email, address, password, role_id) VALUES ('Customer 10', 'customer10@example.com', 'Customer 10 Address', 'senha_cus10', 4); -- CUSTOMER


-- Inserção de algumas categorias
INSERT INTO categories (category_name) VALUES ('Books');
INSERT INTO categories (category_name) VALUES ('Clothing');
INSERT INTO categories (category_name) VALUES ('Electronics');
INSERT INTO categories (category_name) VALUES ('Toys');
INSERT INTO categories (category_name) VALUES ('Furniture');
INSERT INTO categories (category_name) VALUES ('Food');
INSERT INTO categories (category_name) VALUES ('Sports');
INSERT INTO categories (category_name) VALUES ('Beauty');
INSERT INTO categories (category_name) VALUES ('Tools');
INSERT INTO categories (category_name) VALUES ('Music');
INSERT INTO categories (category_name) VALUES ('Gardening');
INSERT INTO categories (category_name) VALUES ('Pets');
INSERT INTO categories (category_name) VALUES ('Art');


-- Inserção de alguns itens
INSERT INTO items (name, category_id, stock_quantity) VALUES ('Smartphone', 3, 100);
INSERT INTO items (name, category_id, stock_quantity) VALUES ('T-shirt', 2, 200);
INSERT INTO items (name, category_id, stock_quantity) VALUES ('BD', 1, 50);
INSERT INTO items (name, category_id, stock_quantity) VALUES ('Laptop', 3, 50);
INSERT INTO items (name, category_id, stock_quantity) VALUES ('Headphones', 6, 100);
INSERT INTO items (name, category_id, stock_quantity) VALUES ('Running Shoes', 7, 150);
INSERT INTO items (name, category_id, stock_quantity) VALUES ('Guitar', 10, 30);
INSERT INTO items (name, category_id, stock_quantity) VALUES ('Dog Food', 9, 200);
INSERT INTO items (name, category_id, stock_quantity) VALUES ('Painting Set', 10, 20);
INSERT INTO items (name, category_id, stock_quantity) VALUES ('Yoga Mat', 4, 80);
INSERT INTO items (name, category_id, stock_quantity) VALUES ('Sunscreen', 5, 300);
INSERT INTO items (name, category_id, stock_quantity) VALUES ('Screwdriver Set', 8, 75);
INSERT INTO items (name, category_id, stock_quantity) VALUES ('Video Game Console', 3, 40);


-- Inserção de alguns status de pedido
INSERT INTO order_status (status) VALUES ('Pending');
INSERT INTO order_status (status) VALUES ('Shipped');
INSERT INTO order_status (status) VALUES ('Delivered');

-- Inserção de alguns pedidos
INSERT INTO orders (order_no, date_ordered, order_status_id, customer_id) VALUES ('ORD0001', '2024-06-06', 1, 4); -- Pedido pendente do Customer 4
INSERT INTO orders (order_no, date_ordered, order_status_id, customer_id) VALUES ('ORD0002', '2024-06-07', 1, 5); -- Pedido pendente do Customer 5
INSERT INTO orders (order_no, date_ordered, order_status_id, customer_id) VALUES ('ORD0003', '2024-06-08', 2, 4); -- Pedido enviado do Customer 4
INSERT INTO orders (order_no, date_ordered, order_status_id, customer_id) VALUES ('ORD0004', '2024-06-09', 1, 7); -- Pedido pendente do Customer 7
INSERT INTO orders (order_no, date_ordered, order_status_id, customer_id) VALUES ('ORD0005', '2024-06-10', 2, 8); -- Pedido enviado do Customer 8
INSERT INTO orders (order_no, date_ordered, order_status_id, customer_id) VALUES ('ORD0006', '2024-06-11', 3, 9); -- Pedido entregue do Customer 9
INSERT INTO orders (order_no, date_ordered, order_status_id, customer_id) VALUES ('ORD0007', '2024-06-12', 1, 10); -- Pedido pendente do Customer 10
INSERT INTO orders (order_no, date_ordered, order_status_id, customer_id) VALUES ('ORD0008', '2024-06-13', 1, 7); -- Pedido pendente do Customer 7
INSERT INTO orders (order_no, date_ordered, order_status_id, customer_id) VALUES ('ORD0009', '2024-06-14', 2, 8); -- Pedido enviado do Customer 8
INSERT INTO orders (order_no, date_ordered, order_status_id, customer_id) VALUES ('ORD0010', '2024-06-15', 3, 9); -- Pedido entregue do Customer 9
INSERT INTO orders (order_no, date_ordered, order_status_id, customer_id) VALUES ('ORD0011', '2024-06-16', 1, 10); -- Pedido pendente do Customer 10
INSERT INTO orders (order_no, date_ordered, order_status_id, customer_id) VALUES ('ORD0012', '2024-06-17', 1, 7); -- Pedido pendente do Customer 7
INSERT INTO orders (order_no, date_ordered, order_status_id, customer_id) VALUES ('ORD0013', '2024-06-18', 2, 8); -- Pedido enviado do Customer 8


-- Inserção de alguns itens do pedido
INSERT INTO order_items (order_id, item_id, quantity) VALUES (1, 1, 2); -- 2 smartphones no primeiro pedido
INSERT INTO order_items (order_id, item_id, quantity) VALUES (2, 2, 3); -- 3 t-shirts no segundo pedido
INSERT INTO order_items (order_id, item_id, quantity) VALUES (3, 3, 1); -- 1 romance no terceiro pedido
INSERT INTO order_items (order_id, item_id, quantity) VALUES (4, 4, 1);  -- 1 laptop no quarto pedido
INSERT INTO order_items (order_id, item_id, quantity) VALUES (5, 5, 2);  -- 2 headphones no quinto pedido
INSERT INTO order_items (order_id, item_id, quantity) VALUES (6, 6, 3);  -- 3 running shoes no sexto pedido
INSERT INTO order_items (order_id, item_id, quantity) VALUES (7, 7, 1);  -- 1 guitar no sétimo pedido
INSERT INTO order_items (order_id, item_id, quantity) VALUES (8, 8, 2);  -- 2 dog food no oitavo pedido
INSERT INTO order_items (order_id, item_id, quantity) VALUES (9, 9, 1);  -- 1 painting set no nono pedido
INSERT INTO order_items (order_id, item_id, quantity) VALUES (10, 10, 2);  -- 2 yoga mat no décimo pedido
INSERT INTO order_items (order_id, item_id, quantity) VALUES (11, 11, 3);  -- 3 sunscreen no décimo primeiro pedido
INSERT INTO order_items (order_id, item_id, quantity) VALUES (12, 12, 1);  -- 1 screwdriver set no décimo segundo pedido
INSERT INTO order_items (order_id, item_id, quantity) VALUES (13, 13, 2);  -- 2 video game console no décimo terceiro pedido
