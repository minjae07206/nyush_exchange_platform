CREATE TABLE user_update_requests (
    request_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique ID for each request
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- Reference to the users table
    new_username VARCHAR(50),       -- Optional new username
    new_profile_image VARCHAR(255), -- Optional new profile image URL
    new_wechat_qr_code_image VARCHAR(255), -- Optional new WeChat QR code URL
    request_status VARCHAR(20) DEFAULT 'pending', -- Status: 'pending', 'approved', 'denied'
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the request was created
);