SELECT 
    p.post_id,
    p.author_id,
    p.post_status, 
    p.post_title, 
    p.price, 
    p.saved_count, 
    p.currency, 
    p.date_of_creation,
    pi.image_url,
    TRUE AS is_saved  -- Since we are fetching from the saved table, these posts are always saved
FROM 
    posts p 
JOIN 
    saved s ON s.post_id = p.post_id 
LEFT JOIN 
    LATERAL (SELECT image_url FROM post_images WHERE post_id = p.post_id LIMIT 1) pi ON true 
WHERE 
    s.user_id = $1  -- Use the provided user_id
ORDER BY 
    p.date_of_creation DESC 
LIMIT 
    $2  -- Limit for pagination
OFFSET 
    $3;  -- Offset for pagination
