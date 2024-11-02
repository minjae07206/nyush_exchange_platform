SELECT *
FROM posts
WHERE author_id = $1
  AND (post_status = $2 OR post_status = $3);