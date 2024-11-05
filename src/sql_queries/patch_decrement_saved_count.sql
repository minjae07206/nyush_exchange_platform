UPDATE posts
SET saved_count = saved_count - 1
WHERE post_id = $1;