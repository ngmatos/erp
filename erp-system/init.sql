CREATE TABLE `Role` (
  id INT PRIMARY KEY,
  role_name VARCHAR(255)
);

CREATE TABLE `User` (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  address VARCHAR(255),
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES `Role`(id)
);

CREATE TABLE `Category` (
  id INT PRIMARY KEY,
  category_name VARCHAR(255)
);

CREATE TABLE `Items` (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  category_id INT,
  stockQuantity INT,
  FOREIGN KEY (category_id) REFERENCES `Category`(id)
);

CREATE TABLE `OrderStatus` (
  id INT PRIMARY KEY,
  status VARCHAR(255)
);

CREATE TABLE `Order` (
  id INT PRIMARY KEY,
  orderNo VARCHAR(255),
  dateOrdered DATE,
  dateCreated DATE,
  orderStatus_id INT,
  customer_id INT,
  FOREIGN KEY (orderStatus_id) REFERENCES `OrderStatus`(id),
  FOREIGN KEY (customer_id) REFERENCES `User`(id)
);

CREATE TABLE `OrderItem` (
  id INT PRIMARY KEY,
  order_id INT,
  item_id INT,
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES `Order`(id),
  FOREIGN KEY (item_id) REFERENCES `Items`(id)
);
