UPDATE posts
SET 
    user_id = $2,
    post_type = $3,
    post_status = $4,
    title = $5,
    price = $6,
    currency = $7,
    quantity = $8,
    total_or_per_item = $9,
    description = $10,
    open_to_negotiate = $11,
    sell_buy_by_date = $12
WHERE post_id = $1