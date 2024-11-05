INSERT INTO saved (save_id, post_id, user_id, saved_date) 
VALUES (gen_random_uuid(), $1, $2, NOW());