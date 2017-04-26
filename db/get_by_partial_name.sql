SELECT * FROM users JOIN vehicles
ON users.id = vehicles.ownerId
WHERE users.firstname LIKE $1;