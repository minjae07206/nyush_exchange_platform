INSERT INTO posts (
    post_id,                     -- Generates a new UUID for post_id
    author_id,                   -- User ID of the author
    post_type,                   -- Type of the post (e.g., sell or buy)
    post_status,                 -- Status of the post (e.g., active, inactive)
    post_title,                  -- Title of the post
    price,                       -- Price of the item
    currency,                    -- Currency type (e.g., USD, EUR)
    quantity,                    -- Quantity of the item
    overall_or_per_unit,        -- Indicates if the price is total or per unit
    description,                 -- Description of the post
    open_to_negotiate_flag,      -- Indicates if the seller is open to negotiation
    date_of_creation,            -- Timestamp of when the post was created
    date_of_last_edit,          -- Timestamp of the last edit made to the post
    date_of_expiration,          -- Expiration date of the post
    saved_count                   -- Number of times the post has been saved
) VALUES (
    $1,           -- Generates a new UUID for post_id
    $2,                           -- Author ID
    $3,                           -- Post Type
    $4,                           -- Post Status
    $5,                           -- Title
    $6,                           -- Price
    $7,                           -- Currency
    $8,                           -- Quantity
    $9,                           -- Total or Per Item
    $10,                           -- Description
    $11,                          -- Open to Negotiate
    CURRENT_TIMESTAMP,           -- Date of Creation
    CURRENT_TIMESTAMP,           -- Date of Last Edit
    $12,                          -- Date of Expiration
    $13                           -- Saved Count
);
