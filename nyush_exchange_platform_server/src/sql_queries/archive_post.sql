UPDATE posts
SET post_status = 'Archived'
WHERE post_id = $1;
