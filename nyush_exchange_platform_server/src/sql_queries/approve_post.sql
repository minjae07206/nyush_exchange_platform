UPDATE posts
SET post_status = 'Available'
WHERE post_id = $1;
