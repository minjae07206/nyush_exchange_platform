import PostList from "components/post/PostList"
import axios from "axios"
import { useEffect, useState } from "react"
import LoadingPage from "components/LoadingPage";
import NotFoundPage from "./NotFoundPage";
import Button from "components/Button";

interface Post {
}
export default function MyAvailablePostsPage() {
    const [postList, setPostList] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [serverError, setServerError] = useState<boolean>(false);
    const [extraPostLoading, setExtraPostLoading] = useState<boolean>(false);

    const loadPosts = (newPage = 1) => {
        axios.get(`http://localhost:3001/api/post/my-available-post?page=${newPage}`, {
            withCredentials: true,
        }).then((response) => {
            const responseData = JSON.parse(response.data);
            setPostList((prevPosts) => [...prevPosts, ...responseData]); // Append new posts to existing list
            console.log(postList)
            setCurrentPage(newPage); // Update current page
            if (responseData.length < 10) {
                // If we get fewer than 10 posts, there are no more posts to load
                setHasMore(false);
            }
        }).catch((error) => {
            console.log(error);
            setServerError(true);
        }).finally(() => {
            setLoading(false);
            setExtraPostLoading(false);
        })
    }

    useEffect(() => {
        loadPosts();
    }, [])

    const handleShowMoreClick = () => {
        setExtraPostLoading(true);
        loadPosts(currentPage + 1);
    };
    if (loading) {
        return <LoadingPage></LoadingPage>
    }
    if (serverError) {
        // change to server error page.
        return <NotFoundPage></NotFoundPage>
    }
    return (
        <section>
            <PostList postList={postList}></PostList>
            <div className="flex justify-center">
            {hasMore && !loading && !extraPostLoading && (
                
                <Button customClass="p-2" buttonText="Show more" handleButtonClickProp={handleShowMoreClick}></Button>
                
            )}
            { extraPostLoading && (
                <i className="fa-solid fa-spin fa-rotate-right text-3xl m-2"></i>
            )}
            </div>
        </section>
    )
}