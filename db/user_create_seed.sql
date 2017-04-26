-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
-- DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(40),
    lastname VARCHAR(40),
    email VARCHAR(40)
);

INSERT INTO users
(firstname, lastname, email)
VALUES
( 'John', 'Smith', 'John@Smith.com'),
( 'Dave', 'Davis', 'Dave@Davis.com'),
( 'Jane', 'Janis', 'Jane@Janis.com');
