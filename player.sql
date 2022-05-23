
--CREATE DATABASE playerlist;
CREATE TYPE STATUS AS ENUM('red', 'green', 'inactive');
CREATE TABLE productinfo(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    quantity VARCHAR(100),
    price VARCHAR(100),
    warehouse VARCHAR(100),
    locationCity VARCHAR(100),
    status STATUS DEFAULT 'inactive'
);

CREATE TABLE warehouselocation(

warehouse VARCHAR(100),
locationCity VARCHAR(100)

);
