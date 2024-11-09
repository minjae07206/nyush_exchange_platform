UPDATE posts
SET post_status = 'Denied',
    deny_reason = $1
WHERE post_id = $2;