DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS order_status;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS role;

-- Tabela de Papéis (Roles)
CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(255) UNIQUE NOT NULL
);

-- Tabela de Usuários
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    address VARCHAR(255),
    password VARCHAR(255) NOT NULL ,
    role_id INT DEFAULT 1,
    FOREIGN KEY (role_id) REFERENCES role(id)
);

-- Tabela de Categorias
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) UNIQUE NOT NULL
);

-- Tabela de Itens
CREATE TABLE items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    category_id INT,
    stock_quantity INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tabela de Status de Pedido
CREATE TABLE order_status (
    id INT PRIMARY KEY AUTO_INCREMENT,
    status VARCHAR(255) UNIQUE NOT NULL
);

-- Tabela de Pedidos
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_no VARCHAR(255) UNIQUE NOT NULL,
    date_ordered DATE,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_status_id INT,
    customer_id INT,
    FOREIGN KEY (order_status_id) REFERENCES order_status(id),
    FOREIGN KEY (customer_id) REFERENCES user(id)
);

-- Tabela de Itens do Pedido
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    item_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);