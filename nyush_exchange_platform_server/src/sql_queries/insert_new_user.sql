INSERT INTO "users" (user_id, username, email, password, role)
VALUES (gen_random_uuid(), $1, $2, $3, $4);