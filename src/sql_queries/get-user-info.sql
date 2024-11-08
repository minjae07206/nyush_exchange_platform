SELECT username, email, profile_image, wechat_qr_code_image, pending_update
FROM users
WHERE user_id = $1;