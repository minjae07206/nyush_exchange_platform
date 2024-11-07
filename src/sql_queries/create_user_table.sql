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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
