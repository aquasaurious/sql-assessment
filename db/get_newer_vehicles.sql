SELECT * FROM vehicles JOIN users
ON vehicles.ownerId = users.id
WHERE year > 2000
ORDER BY year DESC;