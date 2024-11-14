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
    ($2::text IS NULL OR p.post_title ILIKE '%' || $2 || '%') -- search keyword
    AND (
        -- If postStatusOption is NULL, exclude Draft and Pending posts
        ($3::text IS NULL AND p.post_status NOT IN ('Draft', 'Pending', 'Denied'))
        OR
        -- If postStatusOption is provided, match that specific status
        (p.post_status = $3)
    )

    AND ($4::text IS NULL OR p.category = $4) -- postCategoryOption
    AND ($5::boolean IS NULL OR p.open_to_negotiate_flag = $5) -- negotiabilityOption

