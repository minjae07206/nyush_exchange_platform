SELECT 
    p.*, 
    pi.image_url 
FROM 
    posts p 
LEFT JOIN 
    LATERAL (SELECT image_url FROM post_images WHERE post_id = p.post_id LIMIT 1) pi ON true 
WHERE 
    p.author_id = $1 AND 
    (p.post_status = $2 OR p.post_status = $3) 
ORDER BY 
    p.date_of_creation DESC 
LIMIT $4 OFFSET $5;