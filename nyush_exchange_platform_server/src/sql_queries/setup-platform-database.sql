CREATE TABLE users (
    user_id UUID PRIMARY KEY NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    profile_image VARCHAR(255),           -- Column to store the profile image URL
    wechat_qr_code_image VARCHAR(255),    -- Column to store the WeChat QR code image URL
    pending_update BOOLEAN DEFAULT FALSE, -- Column to indicate if there is a pending update request
    last_username_updated TIMESTAMP,      -- Column to store the last time the username was updated
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_denied_reason TEXT,            -- Column to store the reason for denial if an update is denied
    update_result VARCHAR(10) DEFAULT NULL, -- Column to indicate the result of an update request (NULL, "Denied", or "Approved")
    role VARCHAR(20) DEFAULT 'user' --
);

CREATE TABLE posts (
    post_id UUID PRIMARY KEY NOT NULL,                 -- UUID of the post
    author_id UUID NOT NULL,                           -- ID of the author
    post_type VARCHAR(10) NOT NULL,                    -- Type of the post (e.g., "sell", "buy")
    post_status VARCHAR(20) NOT NULL,                  -- Status of the post (e.g., "active", "inactive")
    post_title VARCHAR(255) NOT NULL,                  -- Title of the post
    price DECIMAL(10, 2),                              -- Price of the item
    currency VARCHAR(3) NOT NULL,                      -- Currency code (e.g., "USD", "EUR")
    quantity INTEGER NOT NULL,                         -- Quantity of items
    overall_or_per_unit VARCHAR(20) NOT NULL,          -- Indicates if price is overall or per unit
    description TEXT,                                  -- Description of the post
    open_to_negotiate_flag BOOLEAN DEFAULT FALSE,      -- Flag for negotiation option
    date_of_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Creation date
    date_of_last_edit TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Last edit date
    date_of_expiration TIMESTAMP,                      -- Expiration date
    saved_count INT DEFAULT 0,                         -- Count of how many times the post has been saved
    category VARCHAR(100) DEFAULT 'Textbook',          -- Category of the post, default "Textbook"
    deny_reason TEXT DEFAULT NULL                      -- Reason for denial, if any
);

CREATE TABLE post_images (
    image_id UUID PRIMARY KEY NOT NULL,
    post_id UUID NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
);

CREATE TABLE saved (
    save_id UUID PRIMARY KEY NOT NULL,
    post_id UUID NOT NULL,
    user_id UUID NOT NULL,
    saved_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE user_update_requests (
    request_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique ID for each request
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- Reference to the users table
    new_username VARCHAR(50),       -- Optional new username
    new_profile_image VARCHAR(255), -- Optional new profile image URL
    new_wechat_qr_code_image VARCHAR(255), -- Optional new WeChat QR code URL
    request_status VARCHAR(20) DEFAULT 'pending', -- Status: 'pending', 'approved', 'denied'
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- When the request was created
);