CREATE TABLE post_images (
    image_id UUID PRIMARY KEY NOT NULL,
    post_id UUID NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
);