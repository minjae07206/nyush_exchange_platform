UPDATE users
SET 
    update_result = NULL,
    update_denied_reason = NULL
WHERE user_id = $1;