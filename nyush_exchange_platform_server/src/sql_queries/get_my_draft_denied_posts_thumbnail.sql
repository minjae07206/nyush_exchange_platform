SELECT 
    p.post_id,
    p.author_id,
    p.post_status, 
    p.post_title, 
    p.price, 
    p.saved_count, 
    p.currency, 
    p.date_of_creation,
    p.category,
    p.date_of_expiration,
    p.open_to_negotiate_flag,
    pi.image_url,
    CASE 
        WHEN s.save_id IS NOT NULL THEN TRUE 
        ELSE FALSE 
    END AS is_saved
FROM 
    posts p 
LEFT JOIN 
    LATERAL (
        SELECT image_url 
        FROM post_images 
        WHERE post_id = p.post_id 
        LIMIT 1
    ) pi ON true 
LEFT JOIN 
    saved s ON s.post_id = p.post_id 
            AND s.user_id = $1
WHERE 
    p.author_id = $1 AND 
    (p.post_status = $2 OR
    p.post_status = $3)
ORDER BY 
    p.date_of_creation DESC 
LIMIT 
    $4 
OFFSET 
    $5;