UPDATE users
SET 
    pending_update = FALSE,
    update_denied_reason = $1,  -- Set the deny reason
    update_result = 'Denied'
WHERE user_id = $2