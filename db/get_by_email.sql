SELECT * FROM users JOIN vehicles
ON users.id = vehicles.ownerId
WHERE email = $1;