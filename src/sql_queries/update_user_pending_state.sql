UPDATE users
SET pending_update = $1
WHERE user_id = $2;