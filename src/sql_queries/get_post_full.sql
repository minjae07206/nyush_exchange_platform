SELECT 
    p.*,
    pi.image_url,
    u.username,  -- Assuming the column name for username is 'username'
    CASE 
        WHEN s.save_id IS NOT NULL THEN TRUE 
        ELSE FALSE 
    END AS is_saved
FROM 
    posts p 
LEFT JOIN 
    post_images pi ON pi.post_id = p.post_id 
LEFT JOIN 
    saved s ON s.post_id = p.post_id AND s.user_id = $1
LEFT JOIN 
    users u ON u.user_id = p.author_id  -- Join with users table to get the username
WHERE 
    p.post_id = $2; -- Get post details based on post_id

