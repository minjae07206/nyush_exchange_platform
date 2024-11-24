DELETE FROM posts
    WHERE date_of_expiration < NOW() AND state != 'Archived';