import PostList from "components/post/PostList"
import {useState, useEffect} from 'react';
import axios from "axios";
import Button from "components/Button";
import NotFoundPage from "./NotFoundPage";
import LoadingPage from "components/LoadingPage";
import ZeroPostsPage from "./ZeroPostsPage";
interface Post {

}
export default function SavedPage() {
        const [postList, setPostList] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [serverError, setServerError] = useState<boolean>(false);
    const [extraPostLoading, setExtraPostLoading] = useState<boolean>(false);

    const loadPosts = (newPage = 1) => {
        axios.get(`${process.env.HOST_NAME}/api/post/my-saved-post?page=${newPage}`, {
            withCredentials: true,
        }).then((response) => {
            const responseData = JSON.parse(response.data);
            setPostList((prevPosts) => [...prevPosts, ...responseData]); // Append new posts to existing list
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

    if (postList.length === 0) {
        return <ZeroPostsPage></ZeroPostsPage>
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