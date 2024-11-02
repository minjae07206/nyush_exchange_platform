CREATE TABLE posts (
    post_id UUID PRIMARY KEY NOT NULL,       --uuid
    author_id UUID NOT NULL,             -- ID of the author, assuming it's an INT
    post_type VARCHAR(10) NOT NULL,     -- Type of the post (e.g., "sell", "buy")
    post_status VARCHAR(20) NOT NULL,   -- Status of the post (e.g., "active", "inactive")
    post_title VARCHAR(255) NOT NULL,   -- Title of the post
    price DECIMAL(10, 2),      -- Price of the item
    currency VARCHAR(3) NOT NULL,       -- Currency code (e.g., "USD", "EUR")
    quantity INTEGER NOT NULL,
    overall_or_per_unit VARCHAR(20) NOT NULL, -- Indicates if price is overall or per unit
    description TEXT,           -- Description of the post
    open_to_negotiate_flag BOOLEAN DEFAULT FALSE, -- Flag for negotiation option
    date_of_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Creation date
    date_of_last_edit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_of_expiration TIMESTAMP,       -- Expiration date
    saved_count INT DEFAULT 0            -- Count of how many times the post has been saved
);