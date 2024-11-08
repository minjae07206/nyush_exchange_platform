INSERT INTO user_update_requests (
    user_id,
    new_username,
    new_profile_image,
    new_wechat_qr_code_image
) 
VALUES (
    $1, -- user_id
    $2, -- new_username (can be NULL)
    $3, -- new_profile_image (can be NULL)
    $4  -- new_wechat_qr_code_image (can be NULL)
);