CREATE DATABASE uvp

CREATE TABLE client(
  id SERIAL PRIMARY KEY,
  dni INTEGER NOT NULL UNIQUE,
  names VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  adress VARCHAR(255) NOT NULL,
  phone VARCHAR(10),
  birthdate DATE,
  email VARCHAR(255) UNIQUE,
  restaurant_id INTEGER,
  FOREIGN KEY (restaurant_id) REFERENCES restaurant(id) ON UPDATE CASCADE ON DELETE RESTRICT

);

CREATE TABLE restaurant(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  description TEXT,
  rating FLOAT CHECK (rating >= 0 AND rating <= 5.0),
  is_open BOOLEAN DEFAULT FALSE,
  image_url VARCHAR(255),
  rating INTEGER CHECK  (rating >= 1 AND rating <= 5),
  FOREIGN KEY (id) REFERENCES client(id) ON UPDATE CASCADE ON DELETE SET NULL,
  
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  timeOfdeliver TEXT,
  rating DECIMAL(10,2) CHECK (rating >= 1 AND rating <= 5),
  restaurant_id INTEGER,
  FOREIGN KEY (restaurant_id) REFERENCES restaurant(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- orders representa la relación de muchos a muchos entre las tablas client y restaurant.
CREATE TABLE orders(
 id SERIAL PRIMARY KEY,
 client_id INTEGER NOT NULL,
 restaurant_id INTEGER NOT NULL,
 subtotal DECIMAL(8,2),
 total DECIMAL(8,2),
 FOREIGN KEY (client_id) REFERENCES client(id) ON UPDATE CASCADE ON DELETE SET NULL,
 FOREIGN KEY (restaurant_id) REFERENCES restaurant(id) ON UPDATE CASCADE ON DELETE SET NULL,
 UNIQUE (client_id, restaurant_id)
);

--  la tabla intermedia order_products representa la relación de muchos a muchos entre las tablas 
-- orders y products. Además, la columna quantity en la tabla order_products permite registrar la 
-- cantidad de cada producto en una orden específica.

CREATE TABLE order_products(
 id SERIAL PRIMARY KEY,
 order_id INTEGER NOT NULL,
 product_id INTEGER NOT NULL,
 quantity INTEGER NOT NULL CHECK (quantity > 0),
 comments TEXT,
 FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE SET NULL,
 FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE SET NULL,
 UNIQUE (order_id, product_id)
);

CREATE TABLE user_delivery(
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  contactNumber VARCHAR(20),
  password VARCHAR(64) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role = 'admin' OR role = 'user'),
  status BOOLEAN DEFAULT TRUE
);

INSERT INTO products (name, price, description, image_url, timeOfdeliver, rating)
    VALUES (
      'Lomo Saltado con Papas', 
      20.99,
      'comida criolla',
      'https://www.elolivar.com.pe/wp-content/uploads/2021/08/lomo-saltado.png',
       'La Olla Criolla',
       '30 min.',
       4.5,
       );