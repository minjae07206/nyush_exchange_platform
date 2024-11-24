UPDATE posts
SET 
    price = $2, 
    currency = $3, 
    quantity = $4, 
    date_of_expiration = $5, 
    overall_or_per_unit = $6, 
    post_type = $7, 
    open_to_negotiate_flag = $8,
    category = $9,
    post_status = $10,
    date_of_last_edit = CURRENT_TIMESTAMP
WHERE post_id = $1;
