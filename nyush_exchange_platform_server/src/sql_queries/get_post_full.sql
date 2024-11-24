SELECT 
    p.*,  -- Select all columns from the posts table
    pi.image_url,  -- Select the image URL from post_images table
    u.username,  -- Get the author's username from the users table
    u.email,  -- Get the author's email from the users table
    u.profile_image,  -- Get the author's profile image from the users table
    u.wechat_qr_code_image,  -- Get the author's WeChat QR code image from the users table
    CASE 
        WHEN s.save_id IS NOT NULL THEN TRUE 
        ELSE FALSE 
    END AS is_saved  -- Check if the post is saved by the current user
FROM 
    posts p 
LEFT JOIN 
    post_images pi ON pi.post_id = p.post_id 
LEFT JOIN 
    saved s ON s.post_id = p.post_id AND s.user_id = $1
LEFT JOIN 
    users u ON u.user_id = p.author_id  -- Join with users table to get author details
WHERE 
    p.post_id = $2; -- Get post details based on post_id

