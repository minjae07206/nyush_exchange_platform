SELECT username, email, profile_image, wechat_qr_code_image
FROM users
WHERE user_id = $1;