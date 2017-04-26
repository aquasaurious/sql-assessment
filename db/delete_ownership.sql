UPDATE vehicles
SET ownerId = NULL
WHERE id = $2
AND ownerId = $1;