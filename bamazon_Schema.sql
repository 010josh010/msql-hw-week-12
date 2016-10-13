
CREATE DATABASE bamazon_db; 

USE bamazon_db; 

CREATE TABLE products(

	itemID INTEGER(10) NOT NULL AUTO_INCREMENT, 
	productName VARCHAR(30) NOT NULL, 
	departmentName VARCHAR(30), 
	price DECIMAL(10,2) NOT NULL, 
	stockQuantity INTEGER NOT NULL,  
    PRIMARY KEY (itemID)

); 


INSERT INTO products(
	productName, 
	departmentName, 
	price, 
	stockQuantity
)

VALUES(
	'Gummi Bears', 
	'Food', 
	4.99, 
	150
);

INSERT INTO products(
	productName, 
	departmentName, 
	price, 
	stockQuantity
)

VALUES(
	'Giant Robot', 
	'Electronics', 
	49.99, 
	2 
);