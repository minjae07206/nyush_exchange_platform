INSERT INTO "users" (user_id, username, email, password)
VALUES (gen_random_uuid(), $1, $2, $3);