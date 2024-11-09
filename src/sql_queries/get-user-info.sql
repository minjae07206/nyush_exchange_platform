SELECT username, email, profile_image, wechat_qr_code_image, pending_update, update_denied_reason, update_result
FROM users
WHERE user_id = $1;