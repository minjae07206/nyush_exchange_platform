UPDATE posts
SET 
    post_type = $2,
    post_status = $3,
    post_title = $4,
    price = $5,
    currency = $6,
    quantity = $7,
    overall_or_per_unit = $8,
    description = $9,
    open_to_negotiate_flag = $10,
    date_of_expiration = $11
WHERE post_id = $1
RETURNING post_id, post_title, post_type, post_status;